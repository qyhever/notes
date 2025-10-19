
## 安装
### linux
#### docker-compose
1. 下载安装包
```shell
sudo curl -L https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-`uname -s`-`uname -m` -o usr/local/bin/docker-compose
```
下载完成之后，不需要解压，因为下载的本来就是文件夹。

2. 赋予文件夹权限
```shell
sudo chmod +x usr/local/bin/docker-compose
```

3. 验证安装
```shell
docker-compose version
```

4. 离线安装方式

docker-compose官方git地址：[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

下载linux版本的，直接传到/usr/local/bin目录下即可。

5. 配置别名
```bash
# 编辑.bashrc 或者 .zshrc
vim ~/.bashrc
# 配置 dc 别名
alias dc='docker-compose'
# 刷新生效
source ~/.bashrc
```
配置好后就可以使用 `dc` 命令替代 `docker-compose` 了

## docker
### 启动
```shell
# service 命令的用法
sudo service docker start

# systemctl 命令的用法
sudo systemctl start docker
```

### image 镜像
Docker 把应用程序及其依赖，打包在 image 文件里面。只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。
```shell
# 列出本机的所有 image 文件。
docker image ls

# 删除 image 文件
docker image rm [imageName]

# 构建镜像(基于当前目录下的Dockerfile)
docker build -t [imageName] .
```

### container 容器
image 文件生成的容器实例，本身也是一个文件，称为容器文件。
```shell
# 新建并运行容器
docker run -d -p 80:80 --name [containerName] [imageName]

# 列出本机正在运行的容器
docker container ls

# 列出本机所有容器，包括终止运行的容器
docker container ls --all

# 手动终止
docker container kill [containID]

# 删除容器
docker container rm [containerID]

# vue项目部署示例
docker build -t my-vue3-app .
docker run -d -p 80:80 --name vue3-app my-vue3-app
```

1. docker container start

前面的docker container run命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用docker container start命令，它用来启动已经生成、已经停止运行的容器文件。
```shell
docker container start [containerID]
```
2. docker container stop

docker container kill命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。

docker container stop命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。

这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。
```shell
docker container stop [containerID]
```
3. docker container logs
```shell
docker container logs [containerID]
```
4. docker container exec

docker container exec命令用于进入一个正在运行的 docker 容器。
```shell
docker container exec -it [containerID] /bin/bash
# 使用 Alpine Linux 基础镜像的容器中，因为 Alpine 使用的是 ash shell 而不是 bash
docker container exec -it [containerID] /bin/sh
```
5. docker container cp

docker container cp命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。
```shell
docker container cp [containID]:[/path/to/file] .

# example
docker cp [containName]:/etc/nginx/nginx.conf /data/docker/nginx/conf/
```

## docker-compose
常用命令：
```shell
# 启动服务(自动完成包括构建镜像、创建服务、启动服务并关联服务相关容器的一系列操作)
docker-compose up -d
# 停止服务(停止容器并删除由其创建的容器，网络，卷和图像up)
docker-compose down
# 列出所有运行
docker-compose ps
# 查看服务日志
docker-compose logs
# 查看某个服务日志
docker-compose logs service_name
# 查看某个服务日志(最新20条记录)
docker-compose logs service_name --tail=20
# 构建或重新构建服务
docker-compose build
# 启动已存在的服务
docker-compose start service_name
# 停止已存在的服务
docker-compose stop service_name
# 重启服务
docker-compose restart service_name
# 重新构建并运行某一个服务
docker-compose up --build service_name -d
# 进入容器
docker-compose exec service_name /bin/sh
# 重启nginx(如果service_name是nginx)
docker-compose exec nginx nginx -s reload
# 检查nginx.conf是否配置正确(如果service_name是nginx)
docker-compose exec nginx nginx -t
```

## docker 容器如何访问宿主机网络
### 方案一
使用 host 模式启动服务。

默认情况下，docker 使用的是桥接模式启动服务，即 Docker 容器将使用 Docker 自己创建的虚拟网络，Docker 容器之间可以相互通信，但是它们无法直接访问宿主机上的网络服务。Docker 容器需要通过端口映射来暴露自己的服务，以便宿主机或其他网络主机访问。

而使用 host 模式启动，Docker 容器与宿主机共享同一个网络命名空间，即 Docker 容器将直接使用宿主机的网络。这意味着 Docker 容器可以使用宿主机的 IP 地址和端口，可以直接访问宿主机上的网络服务。然而，host 模式也存在一些限制，例如 Docker 容器之间无法直接通信，Docker 容器的网络性能可能会受到影响。

但是因为这种模式的局限性，因此实际生产当中几乎没有人会用这种方式，所以不推荐使用方案一，推荐方案二。
### 方案二
docker 官方提供了一种支持方案，可通过指向 host.docker.internal 来指向宿主机的 IP。[传送门](https://docs.docker.com/desktop/features/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-hostv)

但注意，这个方案存在一个问题，那就是只支持 Mac 与 Windows 中 desktop 这种环境，并不支持在 Linux 中使用，所以不能直接使用。

于是，有人在官方提交了这个 [issue](https://github.com/docker/for-linux/issues/264)。

需要注意的是，这个功能在 docker 版本过低的时候，可能支持的有问题，所以你的 docker 版本最好不低于 20。

如果使用的是 docker-compose，则通过添加如下内容进行配置：
```shell
extra_hosts:
  - 'host.docker.internal:host-gateway'
```

## Alpine Linux 与传统Linux的区别
- 包管理器: 使用 apk 而不是 apt 或 yum
- Shell: 默认使用 ash/sh 而不是 bash
- 体积: 更小巧轻量
如果确实需要在Alpine容器中使用bash，可以安装它：
```shell
# 在容器内执行
apk add bash
# 然后就可以使用 bash 了
```

进入容器后，您可以执行以下常用操作：
```shell
# 查看当前目录
pwd

# 列出文件
ls -la

# 查看nginx配置
cat /etc/nginx/conf.d/default.conf

# 查看nginx进程
ps aux | grep nginx

# 检查端口监听
netstat -tulpn

# 查看环境变量
env

# 退出容器
exit
```

## 相关文档
- [Docker 入门教程-阮一峰](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
- []()
- []()
- []()
- []()
