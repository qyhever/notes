# Docker多项目部署指南

本文档提供了使用Docker部署多个项目的详细说明，包括qyhever博客、r3-admin-front前端和r3-admin-server后端服务。

## 项目结构

- **nginx**: 主 nginx，统一处理所有路由和 API 代理，访问路径为根目录 `http://localhost/`
- **qyhever**: 博客项目，访问路径为 `http://localhost/blog/`
- **r3-admin-front**: 管理前端项目，访问路径为 `http://localhost/r3-admin/`
- **r3-admin-server**: 管理后端API服务，为r3-admin-front提供API支持

## 文件说明

- `docker-compose.yml`: 定义了所有服务的Docker配置
- `nginx`: Nginx配置文件，静态目录，日志目录
- 各项目目录下的Dockerfile: 定义了各个项目的构建和运行环境
- 各项目目录下的.dockerignore: 忽略某些文件或目录

## 部署步骤

### 1. 安装Docker和Docker Compose

确保您的系统已安装Docker和Docker Compose。

### 2. 构建和启动容器

在项目根目录（包含docker-compose.yml的目录）下运行以下命令：

```bash
# 构建并启动所有容器
docker-compose up -d

# 查看容器状态
docker-compose ps

# 查看容器日志
docker-compose logs -f

# 进入 nginx
docker-compose exec nginx /bin/sh

# 查看 r3-admin-server 服务日志(最新20条记录)
docker-compose logs r3-admin-server --tail=20

# 重启nginx
docker-compose exec nginx nginx -s reload

# 检查nginx.conf是否配置正确
docker-compose exec nginx nginx -t

# 重启 r3-admin-server 服务
docker-compose up --build r3-admin-server -d
```

### 3. 访问应用

- 首页: http://localhost/
- 博客: http://localhost/blog/
- 管理前端: http://localhost/r3-admin/
- 管理后端API: http://localhost/r3/api/

## 配置说明

### Nginx配置

`nginx/nginx.conf`文件配置了：

- 将根路径请求配置./nginx/html为静态目录
- 将/blog/路径请求转发到qyhever博客服务
- 将/r3-admin/路径请求转发到r3-admin-front服务
- 将/r3/api/路径请求转发到r3-admin-server服务

### 各项目配置

- **qyhever**: 使用VuePress构建静态博客，并使用Nginx提供服务
- **r3-admin-front**: Vue3项目，构建后使用Nginx提供服务
- **r3-admin-server**: nest后端服务

## 自定义配置

### 修改端口

如需修改对外暴露的端口，请编辑`docker-compose.yml`文件中nginx服务的`ports`部分：

```yaml
ports:
  - "新端口:80"
```

### 修改项目路径

如需修改项目访问路径，需要：

1. 修改`nginx/nginx.conf`中的location配置
2. 对于前端项目，可能还需要修改其构建配置（如vite.config.ts中的base配置）

## 故障排除

### /r3/api/ 路径请求失败问题排查
查看主 nginx 配置中的 /r3/api/ 路径配置，确保该路径被正确转发到 r3-admin-server 后端服务。
```shell
# r3-admin-server API - 代理/r3/api到后端服务
location /r3/api/ {
  proxy_pass http://r3-admin-server:9506/;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

如果配置正确或已修改正确，检查 r3-admin-server 后端服务是否可以直接访问：
```shell
docker-compose exec r3-admin-server curl -X POST -H "Content-Type: application/json" -d '{"mobile":"test","password":"test"}' http://localhost:9506/auth/login

# output
# OCI runtime exec failed: exec failed: unable to start container process: exec: "curl": executable file not found in $PATH: unknown
```

curl 不可用，因为 Alpine 容器没有 curl。用 nginx 容器来测试后端连接：
```shell
docker-compose exec nginx wget -qO- --post-data='{"mobile":"test","password":"test"}' --header='Content-Type: application/json' http://r3-admin-server:9506/auth/login

# output
# wget: can't connect to remote host (172.18.0.4): Connection refused
```

有连接问题！检查后端服务状态：
```shell
docker-compose logs r3-admin-server --tail=10
```

后端服务启动正常。检查网络连接：
```shell
docker-compose exec nginx nslookup r3-admin-server
```

```shell
# output
Server:		127.0.0.11
Address:	127.0.0.11:53

Non-authoritative answer:
Name:	r3-admin-server
Address: 172.18.0.4

Non-authoritative answer:
```

网络解析正常。检查端口是否监听：
```shell
docker-compose exec nginx nc -zv r3-admin-server 9506
```
没有输出`r3-admin-server (172.18.0.4:9506) open`，open关键词，发现问题。

r3-admin-server nest.js项目 main.ts 中，应用监听的端口是 process.env.PORT ?? 3000，而不是固定的 9506。但是 docker-compose 和 Dockerfile 中期望的是 9506 端口。

缺少 PORT 环境变量！在 docker-compose.yml 中添加 PORT 环境变量：
```shell
environment:
  - NODE_ENV=production
  - PORT=9506
```

重新启动 r3-admin-server 服务：
```shell
docker-compose up --build r3-admin-server -d
```

检查 r3-admin-server 的日志，确认它正在正确的端口监听：
```shell
docker-compose logs r3-admin-server --tail=10
```

服务已经重新启动了。现在测试 /r3/api/auth/login 接口：
```shell
curl -X POST -H "Content-Type: application/json" -d '{"mobile":"test","password":"test"}' http://localhost/r3/api/auth/login

# output
# {"data":null,"success":false,"msg":"手机号不正确"}
```

🎉 成功!

问题根源
1. 路径不匹配：前端期望 /r3/api/auth/login，但 nginx 只配置了 /r3-admin/api/ 路径
2. 端口配置错误：后端应用监听 process.env.PORT ?? 3000，但 docker-compose 没有设置 PORT 环境变量，导致应用监听 3000 端口而不是期望的 9506 端口
