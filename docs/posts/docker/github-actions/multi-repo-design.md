- [项目结构](#项目结构)
  - [方案概述](#方案概述)
  - [详细步骤](#详细步骤)
    - [1. 创建个人访问令牌 (PAT)](#1-创建个人访问令牌-pat)
    - [2. 准备中央部署仓库](#2-准备中央部署仓库)
    - [3. 在每个服务仓库中配置触发工作流](#3-在每个服务仓库中配置触发工作流)
  - [总结](#总结)
- [环境变量配置](#环境变量配置)
  - [方案一：在服务器上使用 `.env` 文件，推荐使用](#方案一在服务器上使用-env-文件推荐使用)
    - [1. 登录到生产服务器](#1-登录到生产服务器)
    - [2. 创建 `.env` 文件](#2-创建-env-文件)
    - [3. 编辑并填充环境变量](#3-编辑并填充环境变量)
    - [工作原理](#工作原理)
  - [方案二：使用 GitHub Secrets (不推荐)](#方案二使用-github-secrets-不推荐)
  - [总结](#总结-1)


## 项目结构
- **app-deployment**: 中央部署仓库，包含 主 Nginx 入口，统一处理所有路由和 API 代理
- **pinco**: 博客项目，访问路径为 `/` 根路径
- **r3-admin-front**: 管理前端项目，访问路径为 `/r3-admin`
- **r3-admin-server**: 管理后端API服务，为r3-admin-front提供API支持，访问路径为 `/r3/api`

### 方案概述
多仓库（multi-repo）协同工作，通过一个统一的 GitHub Actions 工作流进行部署。

利用 GitHub Actions 的 `repository_dispatch` 事件来触发部署。当任何一个服务仓库有更新时，它会向这个中央仓库发送一个“信号”，触发统一的部署流程。

1.  **app-deployment**：这个仓库作为部署的中枢，存放 `docker-compose.yml`、主 `nginx` 配置以及核心的部署工作流 `.github/workflows/deploy.yml`。
2.  **在服务仓库中配置触发器**：在 `pinco`、`r3-admin-front` 和 `r3-admin-server` 各自的仓库中，创建一个简单的工作流。当代码推送到主分支时，这个工作流会使用 `repository_dispatch` API 通知部署仓库。
3.  **使用 Personal Access Token (PAT)**：为了让服务仓库有权限触发部署仓库的工作流，需要创建一个 PAT 并将其存储在服务仓库的 Secrets 中。

> **主 Nginx 仓库**：主 Nginx 配置也可以在一个独立的仓库，它的逻辑与服务仓库类似。部署时，中央仓库会拉取最新的 Nginx 配置。

### 详细步骤

#### 1. 创建个人访问令牌 (PAT)

这是实现跨仓库通信的关键。

1.  前往您的 GitHub **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**。
2.  点击 **Generate new token**。
3.  **Note**: 命名为 `DEPLOY_DISPATCH_TOKEN` 或类似名称。
4.  **Expiration**: 根据您的安全策略选择过期时间。
5.  **Select scopes**: 勾选 **`repo`** 范围。这提供了对仓库的完全控制，包括触发工作流。
6.  点击 **Generate token** 并**立即复制生成的令牌**，因为离开页面后将无法再次看到。

#### 2. 准备中央部署仓库

假设您创建了一个新的仓库，例如 `my-app-deployment`。

1.  文件：
    *   `docker-compose.yml`
    *   `docker-compose.prod.yml`
    *   `nginx/` (存放主 Nginx 配置的目录)
    *   `.github/workflows/deploy.yml` (我们将修改这个文件)

2.  **`deploy.yml` 工作流**：
    这个文件现在只响应 `repository_dispatch` 事件。它需要被更新以拉取正确的镜像。

    这是修改后的 `.github/workflows/deploy.yml` 示例：

    ```yaml
    name: Unified Deployment from Services

    on:
      repository_dispatch:
        types: [deploy-pinco, deploy-r3-admin-front, deploy-r3-admin-server, deploy-nginx]

    env:
      SERVER_HOST: ${{ secrets.SERVER_HOST }}
      SERVER_USER: ${{ secrets.SERVER_USER }}
      SERVER_SSH_KEY: ${{ secrets.SERVER_SSH_KEY }}
      REGISTRY: ghcr.io
      # 注意：IMAGE_OWNER 应该是您的 GitHub 用户名或组织名
      IMAGE_OWNER: ${{ github.repository_owner }}

    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout deployment configuration
          uses: actions/checkout@v4

        # 如果 Nginx 配置在另一个仓库，部署时需要拉取
        - name: Checkout nginx configuration
          if: github.event.action == 'deploy-nginx'
          uses: actions/checkout@v4
          with:
            repository: YOUR_USERNAME/nginx-config-repo # 替换为您的 Nginx 配置仓库
            path: ./nginx # 将配置拉取到 nginx 目录

        - name: Setup SSH
          uses: webfactory/ssh-agent@v0.9.0
          with:
            ssh-private-key: ${{ secrets.SERVER_SSH_KEY }}

        - name: Add server to known hosts
          run: ssh-keyscan -H ${{ secrets.SERVER_HOST }} >> ~/.ssh/known_hosts

        - name: Create deployment directory on server
          run: ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} "mkdir -p /opt/pros"

        - name: Copy deployment files to server
          run: |
            scp docker-compose.yml ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }}:/opt/pros/
            scp docker-compose.prod.yml ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }}:/opt/pros/
            scp -r nginx/ ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }}:/opt/pros/

        - name: Login to registry on server
          run: |
            ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} "echo ${{ secrets.GITHUB_TOKEN }} | docker login ${{ env.REGISTRY }} -u ${{ github.actor }} --password-stdin"

        - name: Deploy application
          run: |
            ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} << 'EOF'
              cd /opt/pros
              
              # 从 dispatch 事件中获取服务名
              SERVICE_NAME="${{ github.event.client_payload.service }}"
              
              # 如果有服务名，只拉取该服务的最新镜像，否则拉取所有
              if [ -n "$SERVICE_NAME" ]; then
                docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull $SERVICE_NAME
              else
                docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
              fi
              
              docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans
              docker image prune -f
              docker-compose ps
            EOF
    ```

    **注意**：您还需要修改 `docker-compose.prod.yml`，使其使用正确的镜像名称，因为 `${{ github.repository }}` 的上下文已经改变。您需要硬编码或通过 `client_payload` 传递镜像名。

#### 3. 在每个服务仓库中配置触发工作流

在 `pinco`、`r3-admin-front` 和 `r3-admin-server` 这三个仓库中，分别执行以下操作：

1.  **添加 Secret**：
    *   进入仓库的 **Settings** > **Secrets and variables** > **Actions**。
    *   创建一个新的仓库 Secret，命名为 `CROSS_REPO_PAT`，值为您在第一步创建的个人访问令牌。

2.  **创建触发工作流**：
    在每个服务仓库中，创建文件 `.github/workflows/trigger-deploy.yml`。

    **示例：`r3-admin-front` 仓库中的 `trigger-deploy.yml`**

    ```yaml
    name: Build and Trigger Deployment

    on:
      push:
        branches: [ main, master ]

    jobs:
      build-and-dispatch:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout code
            uses: actions/checkout@v4

          # ... 这里是您原来的 lint, test, build, and push Docker image 的步骤 ...
          # 您需要确保每个服务仓库都能独立构建和推送自己的 Docker 镜像
          # 例如：
          - name: Log in to Container Registry
            uses: docker/login-action@v3
            with:
              registry: ghcr.io
              username: ${{ github.actor }}
              password: ${{ secrets.GITHUB_TOKEN }}

          - name: Build and push Docker image
            uses: docker/build-push-action@v5
            with:
              context: .
              push: true
              tags: ghcr.io/${{ github.repository_owner }}/r3-admin-front:latest # 确保镜像是唯一的
              labels: "service=r3-admin-front"

          # 构建成功后，触发中央部署仓库的工作流
          - name: Trigger deployment
            if: success()
            run: |
              curl -L \
                -X POST \
                -H "Accept: application/vnd.github+json" \
                -H "Authorization: Bearer ${{ secrets.CROSS_REPO_PAT }}" \
                -H "X-GitHub-Api-Version: 2022-11-28" \
                https://api.github.com/repos/YOUR_USERNAME/my-app-deployment/dispatches \
                -d '{"event_type":"deploy-r3-admin-front", "client_payload": {"service": "r3-admin-front"}}'
    ```

    **重要提示**：
    *   您需要为每个服务仓库（`pinco`、`r3-admin-server`）创建类似的 `trigger-deploy.yml` 文件。
    *   **修改 `curl` 命令**：
        *   将 `YOUR_USERNAME/my-app-deployment` 替换为您的中央部署仓库的实际路径。
        *   将 `event_type` 更改为对应的值（例如，`deploy-pinco`）。
        *   将 `client_payload` 中的 `service` 值更改为对应的服务名（例如，`pinco`）。

### 总结

部署流程为：

1.  当您向 `r3-admin-front` 的 `main` 分支推送代码时。
2.  `r3-admin-front` 仓库中的 `trigger-deploy.yml` 工作流被触发。
3.  它会运行测试、构建新的 `r3-admin-front:latest` Docker 镜像并推送到 `ghcr.io`。
4.  构建成功后，它会向 `app-deployment` 仓库发送一个 `repository_dispatch` 事件。
5.  `app-deployment` 仓库中的 `deploy.yml` 工作流被唤醒，它拉取最新的部署配置，然后登录到您的服务器。
6.  在服务器上，它只拉取刚刚更新的 `r3-admin-front` 镜像，并使用 `docker-compose up -d` 重启服务。

这个方案实现了关注点分离，每个服务仓库只负责构建自己，而部署逻辑则集中在中央仓库，使得整个系统更加清晰和易于维护。

## 环境变量配置
环境变量关系到如何安全地管理生产环境的敏感配置（如数据库密码）。

在 `app-deployment/docker-compose.prod.yml` 文件中，`DB_HOST=${DB_HOST}` 这样的语法意味着 Docker Compose 会在执行时，从其运行环境（Shell）中查找名为 `DB_HOST` 的环境变量，并将其值注入到容器中。

在 GitHub Actions 部署流程中，`docker-compose` 命令是在生产服务器上通过 SSH 执行的。因此，这些环境变量需要在**生产服务器上**进行配置。

### 方案一：在服务器上使用 `.env` 文件，推荐使用

这是最安全、最标准的做法，可以实现配置与代码的分离。敏感信息将只存在于服务器上，不会暴露在 GitHub 仓库或 Actions 日志中。

**操作步骤如下：**

#### 1. 登录到生产服务器
通过 SSH 登录到您部署应用的服务器。
```bash
ssh your_user@your_server_host
```

#### 2. 创建 `.env` 文件
在部署目录 `/opt/pros` 中，创建一个名为 `.env` 的文件。这个目录就是在 GitHub Actions 中指定的部署路径。
```bash
touch /opt/pros/.env
```

#### 3. 编辑并填充环境变量
使用 `vim` 或 `nano` 编辑这个文件，并填入所有需要的环境变量。格式为 `KEY=VALUE`。

**示例 `/opt/pros/.env` 文件内容：**
```bash
# /opt/pros/.env

# 数据库配置
DB_HOST=localhost  # 或数据库服务器IP/容器名
DB_PORT=3306
DB_DATABASE=r3
DB_USERNAME=your_db_user
DB_PASSWORD=your_super_secret_password

# JWT 配置
JWT_SECRET=a_very_long_and_random_secret_string
JWT_EXPIRE=4h
```

也可以在本地编写好 `.env` 文件，直接上传到生产服务器 `/opt/pros` 下。

**重要提示**：
*   **`DB_HOST` 的值**：
    *   如果数据库也运行在同一台服务器的 Docker 容器中，您应该使用数据库服务的容器名（例如 `mysql_db`）。
    *   如果数据库在宿主机上运行（非 Docker），您可能需要使用 `host.docker.internal` (需要 `extra_hosts` 配置) 或宿主机的局域网 IP。
    *   如果数据库在另一台服务器上，则填写其 IP 地址。
*   务必为 `DB_PASSWORD` 和 `JWT_SECRET` 设置强随机值。

#### 工作原理
当 GitHub Actions 工作流在服务器的 `/opt/pros` 目录下执行 `docker-compose ... up -d` 命令时，Docker Compose 会**自动检测**并加载同目录下的 `.env` 文件，然后将这些变量的值替换到 `app-deployment/docker-compose.prod.yml` 中。**无需修改任何 `.yml` 文件**，这个机制是 Docker Compose 内建的。

### 方案二：使用 GitHub Secrets (不推荐)

也可以将这些变量存储在 `app-deployment` 仓库的 GitHub Secrets 中，并在运行时传递给服务器。

这种方法的缺点是配置和部署逻辑耦合在一起，且在复杂的脚本中存在意外泄露敏感信息的风险。它更适合非敏感的配置。

如果仍希望这样做，需要修改 `app-deployment` 的 `deploy.yml` 文件，在 `Deploy application` 步骤中注入环境变量，如下所示：

```yaml
# ... (在 deploy.yml 中)
    - name: Deploy application
      run: |
        ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} " \
        export DB_HOST=${{ secrets.DB_HOST }} && \
        export DB_PORT=${{ secrets.DB_PORT }} && \
        export DB_DATABASE=${{ secrets.DB_DATABASE }} && \
        export DB_USERNAME=${{ secrets.DB_USERNAME }} && \
        export DB_PASSWORD=${{ secrets.DB_PASSWORD }} && \
        export JWT_SECRET=${{ secrets.JWT_SECRET }} && \
        export JWT_EXPIRE=${{ secrets.JWT_EXPIRE }} && \
        cd /opt/pros && \
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
```
然后需要在 `app-deployment` 仓库的 `Settings > Secrets and variables > Actions` 中创建所有对应的 Secrets (`DB_HOST`, `DB_PASSWORD` 等)。

### 总结
建议采用第一种方法，在服务器上创建并管理 `.env` 文件。这是管理生产环境敏感数据的行业标准。
