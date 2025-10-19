# GitHub Actions 部署配置说明

## 必需的 GitHub Secrets

在你的 GitHub 仓库中，需要设置以下 Secrets（设置路径：仓库 -> Settings -> Secrets and variables -> Actions）：

### 服务器连接配置
- `SERVER_HOST`: 服务器IP地址或域名（例如：192.168.1.100 或 example.com）
- `SERVER_USER`: 服务器SSH用户名（例如：root 或 ubuntu）
- `SERVER_SSH_RSA`: 服务器SSH私钥（完整的私钥内容，包括 -----BEGIN 和 -----END 行）

### 数据库配置（用于生产环境）
- `DB_HOST`: 数据库主机地址（默认：host.docker.internal）
- `DB_PORT`: 数据库端口（默认：3306）
- `DB_DATABASE`: 数据库名称（默认：r3）
- `DB_USERNAME`: 数据库用户名
- `DB_PASSWORD`: 数据库密码

### 应用配置
- `JWT_SECRET`: JWT密钥（用于token签名，请使用强密码）
- `JWT_EXPIRE`: JWT过期时间（默认：4h）

### 可选配置
- `SERVER_PROJECT_PATH`: 服务器上的项目路径（默认：/opt/pros）

## 部署工作流说明

项目提供了两个 GitHub Actions 工作流：

### 1. deploy.yml - 完整版（推荐用于生产环境）
- **特点**: 
  - 构建Docker镜像并推送到GitHub Container Registry
  - 支持多环境部署
  - 包含代码质量检查和测试
  - 镜像缓存优化，构建速度快
  - 完整的健康检查和通知

- **适用场景**: 
  - 生产环境部署
  - 需要镜像版本管理
  - 多个部署环境

### 2. deploy-simple.yml - 简化版（适合快速部署）
- **特点**: 
  - 直接在服务器上构建
  - 配置简单，快速上手
  - 适合小团队或个人项目

- **适用场景**: 
  - 开发/测试环境
  - 小型项目
  - 服务器资源充足

## 服务器环境要求

### 基础环境
- Docker 20.10+
- Docker Compose 2.0+
- Git
- SSH 服务

### 端口要求
- 80: Nginx（Web服务）
- 3306: MySQL（如果使用本地数据库）

### 系统要求
- 内存: 建议4GB+
- 存储: 建议20GB+
- 系统: Ubuntu 20.04+ / CentOS 8+ / Debian 11+

## 部署前准备

### 1. 服务器准备
```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 创建项目目录
sudo mkdir -p /opt/pros
sudo chown $USER:$USER /opt/pros
```

### 2. 数据库准备
如果使用外部MySQL数据库，请确保：
- 数据库已创建
- 用户权限已配置
- 网络连接正常

### 3. SSH密钥配置
```bash
# 在本地生成密钥对（如果没有）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 将公钥添加到服务器
ssh-copy-id user@server_ip

# 将私钥内容复制到 GitHub Secrets 中的 SERVER_SSH_RSA
cat ~/.ssh/id_rsa
```

## 使用方法

### 启用自动部署
1. 选择要使用的工作流文件（deploy.yml 或 deploy-simple.yml）
2. 在 GitHub 仓库中配置所需的 Secrets
3. 推送代码到 main 或 master 分支
4. 查看 GitHub Actions 页面监控部署进度

### 手动触发部署
在 GitHub 仓库的 Actions 页面，可以手动触发工作流运行。

### 监控部署状态
- GitHub Actions 页面查看详细日志
- 服务器上使用 `docker-compose logs -f` 查看服务日志
- 访问 `http://your-server-ip` 验证部署结果

## 故障排除

### 常见问题
1. **SSH连接失败**: 检查服务器IP、用户名和SSH密钥是否正确
2. **Docker构建失败**: 检查服务器Docker环境和资源是否充足
3. **数据库连接失败**: 检查数据库配置和网络连接
4. **端口冲突**: 确保80端口没有被其他服务占用

### 调试命令
```bash
# 查看容器状态
docker-compose ps

# 查看服务日志
docker-compose logs -f [service_name]

# 进入容器调试
docker-compose exec [service_name] /bin/sh

# 检查网络连接
docker-compose exec nginx ping r3-admin-server
```

## 安全建议

1. **定期更新**: 保持服务器系统和Docker镜像更新
2. **防火墙配置**: 只开放必要端口（80, 443, 22）
3. **密钥管理**: 定期轮换SSH密钥和JWT密钥
4. **日志监控**: 设置日志监控和告警
5. **备份策略**: 定期备份数据库和重要文件

## 扩展配置

### 添加HTTPS支持
可以集成 Let's Encrypt 或使用现有SSL证书，修改 nginx.conf 配置。

### 添加监控
可以集成 Prometheus + Grafana 或其他监控方案。

### 多环境部署
通过分支策略和环境变量，支持 dev/staging/prod 多环境部署。