- [🚀 部署检查清单](#-部署检查清单)
  - [部署前准备](#部署前准备)
    - [✅ 代码准备](#-代码准备)
    - [✅ 服务器环境](#-服务器环境)
    - [✅ GitHub 配置](#-github-配置)
    - [✅ 数据库准备](#-数据库准备)
  - [部署过程](#部署过程)
    - [🔄 自动部署 (GitHub Actions)](#-自动部署-github-actions)
    - [🔧 手动部署 (备用方案)](#-手动部署-备用方案)
  - [部署后验证](#部署后验证)
    - [✅ 服务状态检查](#-服务状态检查)
    - [✅ 功能测试](#-功能测试)
    - [✅ 性能检查](#-性能检查)
    - [✅ 安全检查](#-安全检查)
  - [常见问题排除](#常见问题排除)
    - [🔧 容器启动失败](#-容器启动失败)
    - [🔧 网络连接问题](#-网络连接问题)
    - [🔧 数据库连接失败](#-数据库连接失败)
    - [🔧 权限问题](#-权限问题)
  - [回滚方案](#回滚方案)
    - [🔄 代码回滚](#-代码回滚)
    - [🔄 容器回滚](#-容器回滚)
    - [🔄 数据库回滚](#-数据库回滚)
  - [监控和维护](#监控和维护)
    - [📊 日常监控](#-日常监控)
    - [🧹 定期维护](#-定期维护)
    - [📈 性能优化](#-性能优化)


# 🚀 部署检查清单

## 部署前准备

### ✅ 代码准备
- [ ] 代码已提交到 Git 仓库
- [ ] 分支为 main 或 master
- [ ] 代码通过本地测试
- [ ] Docker 配置文件无语法错误

### ✅ 服务器环境
- [ ] Docker 已安装 (版本 20.10+)
- [ ] Docker Compose 已安装 (版本 2.0+)
- [ ] 新建项目目录 `/opt/pros`，以及环境变量文件 `.env`
- [ ] SSH 服务正常运行
- [ ] 端口 80 和 443 可用
- [ ] 服务器磁盘空间充足 (建议 20GB+)
- [ ] 服务器内存充足 (建议 4GB+)

### ✅ GitHub 配置
- [ ] GitHub Secrets 已配置完成
  - [ ] `SERVER_HOST` - 服务器IP或域名
  - [ ] `SERVER_USER` - SSH用户名
  - [ ] `SERVER_SSH_RSA` - SSH私钥
- [ ] GitHub Actions 权限已启用
- [ ] Container Registry 权限已配置

### ✅ 数据库准备
- [ ] MySQL 数据库已创建
- [ ] 数据库用户权限已配置
- [ ] 数据库连接测试通过
- [ ] 数据库备份已完成 (如果是更新部署)

## 部署过程

### 🔄 自动部署 (GitHub Actions)
1. [ ] 推送代码到 main/master 分支
2. [ ] 在 GitHub Actions 页面监控部署进度
3. [ ] 等待所有工作流完成

### 🔧 手动部署 (备用方案)
1. [ ] 登录服务器: `ssh user@server`
2. [ ] 进入项目目录: `cd /opt/pros`
3. [ ] 拉取最新代码: `git pull origin main`
4. [ ] 运行部署脚本: `./deploy.sh prod deploy`

## 部署后验证

### ✅ 服务状态检查
- [ ] 所有容器运行正常: `docker-compose ps`
- [ ] 容器日志无错误: `docker-compose logs`
- [ ] 服务端口监听正常: `netstat -tlnp | grep :80`

### ✅ 功能测试
- [ ] 主页访问正常: `http://server-ip/`
- [ ] 博客页面正常: `http://server-ip/`
- [ ] 管理后台登录: `http://server-ip/r3-admin/`
- [ ] API接口响应: `http://server-ip/r3/api/health`
- [ ] 数据库连接正常

### ✅ 性能检查
- [ ] 页面加载速度正常 (< 3秒)
- [ ] API 响应时间正常 (< 1秒)
- [ ] 系统资源使用合理
  - [ ] CPU 使用率 < 80%
  - [ ] 内存使用率 < 80%
  - [ ] 磁盘使用率 < 80%

### ✅ 安全检查
- [ ] SSH 端口配置正确
- [ ] 防火墙规则配置
- [ ] 数据库访问限制
- [ ] 敏感信息环境变量化

## 常见问题排除

### 🔧 容器启动失败
```bash
# 查看容器状态
docker-compose ps

# 查看容器日志
docker-compose logs [service-name]

# 重启服务
docker-compose restart [service-name]
```

### 🔧 网络连接问题
```bash
# 检查容器网络
docker network ls
docker inspect [network-name]

# 测试服务间连接
docker-compose exec nginx ping r3-admin-server
```

### 🔧 数据库连接失败
```bash
# 检查数据库连接
docker-compose exec r3-admin-server nc -zv [db-host] 3306

# 查看数据库相关日志
docker-compose logs r3-admin-server | grep -i db
```

### 🔧 权限问题
```bash
# 检查文件权限
ls -la /opt/pros

# 修复权限
sudo chown -R $USER:$USER /opt/pros
```

## 回滚方案

### 🔄 代码回滚
```bash
# 回滚到上一个版本
git reset --hard HEAD~1
./deploy.sh prod deploy
```

### 🔄 容器回滚
```bash
# 使用之前的镜像版本
docker tag [backup-image] [current-image]
docker-compose up -d
```

### 🔄 数据库回滚
```bash
# 恢复数据库备份
mysql -u [user] -p [database] < backup.sql
```

## 监控和维护

### 📊 日常监控
- [ ] 定期检查服务状态
- [ ] 监控系统资源使用
- [ ] 查看应用日志
- [ ] 检查磁盘空间

### 🧹 定期维护
- [ ] 清理 Docker 镜像: `docker image prune -f`
- [ ] 更新系统包: `sudo apt update && sudo apt upgrade`
- [ ] 备份重要数据
- [ ] 更新 SSL 证书

### 📈 性能优化
- [ ] 优化数据库查询
- [ ] 配置 Nginx 缓存
- [ ] 启用 Gzip 压缩
- [ ] 配置 CDN (如需要)

**注意**: 
- 每次部署前请完整阅读此检查清单
- 生产环境部署建议在低峰期进行
- 重要更新前请先在测试环境验证