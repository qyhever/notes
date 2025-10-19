- [Docker多项目部署指南](#docker多项目部署指南)
  - [部署步骤](#部署步骤)
    - [1. 安装Docker和Docker Compose](#1-安装docker和docker-compose)
    - [2. 构建和启动容器](#2-构建和启动容器)
    - [3. 访问应用](#3-访问应用)
  - [故障排除](#故障排除)
    - [/r3/api/ 路径请求失败问题排查](#r3api-路径请求失败问题排查)
    - [修改 服务名 和 容器名 后启动报端口冲突异常](#修改-服务名-和-容器名-后启动报端口冲突异常)
    - [connect() failed (111: Connection refused) while connecting to upstream,](#connect-failed-111-connection-refused-while-connecting-to-upstream)


# Docker多项目部署指南

## 部署步骤

### 1. 安装Docker和Docker Compose
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
确保您的系统已安装Docker和Docker Compose。

### 2. 构建和启动容器

常用命令，在项目根目录（包含docker-compose.yml的目录）下运行：

```bash
# 构建前，测试 nginx 配置是否正确
docker run -it --rm nginx nginx -t -c /etc/nginx/nginx.conf

# 构建前，测试 openresty 配置是否正确
docker run -it --rm openresty/openresty nginx -t -c /usr/local/openresty/nginx/conf/nginx.conf

# 构建并启动所有容器
docker-compose up -d

# 查看容器状态
docker-compose ps

# 查看容器日志
docker-compose logs -f

# 查看容器日志
docker-compose logs app -f

# 进入 app 服务
docker-compose exec app /bin/sh

# 查看 r3-admin-server 服务日志(最新20条记录)
docker-compose logs r3-admin-server --tail=20

# 重启 app 服务的 nginx
docker-compose exec app nginx -s reload

# 检查 app 服务nginx.conf是否配置正确
docker-compose exec app nginx -t

# 重新构建并启动 r3-admin-server 服务
docker-compose up --build r3-admin-server -d

# 重新构建并启动 pinco 服务
docker-compose up --build pinco -d

# 访问 pinco 服务内部文件
docker exec pinco curl -v http://localhost:8080/pages/js/throttle-and-debounce.html

# 确认 pinco 容器的新 IP 地址
docker inspect pinco -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'

# 尝试直接访问 pinco 容器，如果访问成功但是 http://localhost/blog 404 那就是 app 服务 nginx 配置问题
curl -v http://172.18.0.3:8080/

# 重启服务
cd /opt/pros
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 3. 访问应用

- 博客: http://localhost/
- 管理前端: http://localhost/r3-admin/
- 管理后端API: http://localhost/r3/api/

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

问题根源
1. 路径不匹配：前端期望 /r3/api/auth/login，但 nginx 只配置了 /r3-admin/api/ 路径
2. 端口配置错误：后端应用监听 process.env.PORT ?? 3000，但 docker-compose 没有设置 PORT 环境变量，导致应用监听 3000 端口而不是期望的 9506 端口

### 修改 服务名 和 容器名 后启动报端口冲突异常
操作:  
修改服务名 nginx -> app  
修改容器名 nginx-proxy -> app

主要有两个问题：
1. 端口占用错误 ： Bind for 0.0.0.0:80 failed: port is already allocated 。这意味着您主机上的 80 端口已经被其他程序占用，导致 app 容器无法启动。
2. 孤儿容器警告 ： Found orphan containers ([nginx-proxy]) for this project. 这是因为我们之前将 Nginx 服务的名称从 nginx 改为 app ，并且容器名称从 nginx-proxy 改为 app ，导致旧的 nginx-proxy 容器变成了"孤儿"。


解决：
1. 停止并删除旧的 nginx-proxy 容器，以释放 80 端口。
2. 使用 --remove-orphans 标志重新运行 docker-compose up -d ，以便启动新的 app 容器并清理掉旧的孤儿容器。

首先停止并删除 nginx-proxy 容器
```bash
docker rm -f nginx-proxy
```

重新启动服务，以确保新的 app 容器能够正常启动，并且清理掉所有孤儿容器
```bash
docker-compose up -d --remove-orphans
```

### connect() failed (111: Connection refused) while connecting to upstream,
```bash
# 检查内部的 nginx 配置
docker exec pinco nginx -T
# 检查 pinco 容器的状态
docker ps | grep pinco
# 检查容器日志
docker logs pinco
# 检查一下 pinco 容器内的网络监听状态
docker exec pinco netstat -tlnp
# 检查一下网络连通性
docker network inspect app-deployment_app-network
# 确认 pinco 容器的新 IP 地址
docker inspect pinco -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
# 尝试直接访问 pinco 容器
curl -v http://172.18.0.3:8080/
# 重新启动 app 服务
docker restart app
```
