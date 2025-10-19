- [安装](#安装)
  - [yum 安装](#yum-安装)
  - [源码包 安装](#源码包-安装)
  - [yum 和 源码包 安装的区别](#yum-和-源码包-安装的区别)
    - [安装路径不同](#安装路径不同)
    - [启动方式不同](#启动方式不同)
  - [Reference](#reference)


## 安装
### yum 安装
```shell
yum -y install nginx
service nginx start
service nginx stop
service nginx restart
```
### 源码包 安装
1. 安装编译
系统 centos 6.7 32位，首先安装缺少的依赖包：
```shell
yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel
```
从 [官网](https://nginx.org/en/download.html) 下载稳定版 nginx-1.12.2.tar.gz ，下载的压缩文件 放在任意地方都可以，但是建议放在 /usr/local/src 或者 /root/ 下，/usr/local/src 就是系统专门给用户分配的放 源码的目录，/root/ 是我们默认操作的目录，也可以放在这里。

```shell
# 通过wget下载
wget http://nginx.org/download/nginx-1.12.2.tar.gz
# 解压
tar -zxvf nginx-1.12.2.tar.gz
# 进入
cd nginx-1.12.2
# nginx-1.12.2 目录下执行 配置 和 make 命令
nginx-1.10.1 ./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre
nginx-1.10.1 make && make install
```

2. 启动 停止 nginx
```shell
/usr/local/webserver/nginx/sbin/nginx
/usr/local/webserver/nginx/sbin/nginx -s stop
```
启动 nginx 服务后，可以通过 ps -aux | grep nginx 查看进程

3. 其它
常用编译选项说明：[来自](https://segmentfault.com/a/1190000002797601)
- --prefix=PATH ： 指定 nginx 的安装目录。默认 /usr/local/nginx，我的是 /usr/local/webserver/nginx

- --conf-path=PATH ： 设置nginx.conf配置文件的路径。nginx允许使用不同的配置文件启动，通过命令行中的-c选项。默认为conf/nginx.conf

- --user=name ： 设置nginx工作进程的用户。安装完成后，可以随时在nginx.conf配置文件更改user指令。默认的用户名是nobody。--group=name类似

- --with-pcre ： 设置PCRE库的源码路径，如果已通过yum方式安装，使用--with-pcre自动找到库文件。使用--with-pcre=PATH时，需要从PCRE网站下载pcre库的源码（8.39）并解压，指定 pcre 的源码路径 ，比如：--with-pcre=/root/pcre-8.39/。perl正则表达式使用在location指令和 ngx_http_rewrite_module模块中。

- --with-zlib=PATH ： 指定 zlib（版本1.1.3 - 1.2.5）的源码解压目录。在默认就启用的网络传输压缩模块ngx_http_gzip_module时需要使用zlib 。

- --with-http_ssl_module ： 使用https协议模块。默认情况下，该模块没有被构建。前提是openssl与openssl-devel已安装

- --with-http_stub_status_module ： 用来监控 Nginx 的当前状态

- --with-http_realip_module ： 通过这个模块允许我们改变客户端请求头中客户端IP地址值(例如X-Real-IP 或 X-Forwarded-For)，意义在于能够使得后台服务器记录原始客户端的IP地址

- --add-module=PATH ： 添加第三方外部模块，如nginx-sticky-module-ng或缓存模块。每次添加新的模块都要重新编译（Tengine可以在新加入module时无需重新编译）

### yum 和 源码包 安装的区别
yum 安装是在线安装，好处是：安装方式简单，不易出错；  
源码包 安装是先将 nginx 的源码下载下来，在自己的系统里编译生成可执行文件，然后执行，好处是：因为是在自己的系统上编译的，更符合自己系统的性能，也就是说在自己的系统上执行 nginx 服务性能效率更好。

#### 安装路径不同
他们之间最大的区别是 ：安装位置不同。  
yum 在线安装会将 nginx 的安装文件放在系统的不同位置，可以通过命令 rpm -ql nginx 来查看安装路径，如下所示：
```shell
/etc/logrotate.d/nginx
/etc/nginx
/etc/nginx/conf.d
/etc/nginx/conf.d/default.conf
/etc/nginx/conf.d/ssl.conf
/etc/nginx/conf.d/virtual.conf
/etc/nginx/fastcgi.conf
/etc/nginx/fastcgi.conf.default
/etc/nginx/fastcgi_params
/etc/nginx/fastcgi_params.default
/etc/nginx/koi-utf
/etc/nginx/koi-win
/etc/nginx/mime.types
/etc/nginx/mime.types.default
/etc/nginx/nginx.conf
/etc/nginx/nginx.conf.default
/etc/nginx/scgi_params
/etc/nginx/scgi_params.default
/etc/nginx/uwsgi_params
/etc/nginx/uwsgi_params.default
/etc/nginx/win-utf
/etc/rc.d/init.d/nginx
/etc/sysconfig/nginx
/usr/lib/perl5/vendor_perl/auto/nginx
/usr/lib/perl5/vendor_perl/auto/nginx/nginx.so
/usr/lib/perl5/vendor_perl/nginx.pm
/usr/sbin/nginx
/usr/share/doc/nginx-1.0.15
/usr/share/doc/nginx-1.0.15/CHANGES
/usr/share/doc/nginx-1.0.15/LICENSE
/usr/share/doc/nginx-1.0.15/README
/usr/share/man/man3/nginx.3pm.gz
/usr/share/man/man8/nginx.8.gz
/usr/share/nginx/html/404.html
/usr/share/nginx/html/50x.html
/usr/share/nginx/html/index.html
/usr/share/nginx/html/nginx-logo.png
/usr/share/nginx/html/poweredby.png
/usr/share/vim/vimfiles/ftdetect/nginx.vim
/usr/share/vim/vimfiles/indent/nginx.vim
/usr/share/vim/vimfiles/syntax/nginx.vim
/var/lib/nginx
/var/lib/nginx/tmp
/var/log/nginx
```
卸载的时候，只能通过 命令来卸载，因为我们不可能 将这些文件自己手动删除，可以通过命令 rpm -e nginx 来卸载，这个命令一般不会报错，因为 nginx 不与其他的包有依赖关系，如果提示关于 依赖包的问题 ，可以尝试 rpm -e --nodeps nginx 来卸载，这个命令相当于强制卸载，不考虑依赖问题。

源码包 安装他的所有文件（包括配置文件，库文件，资源文件等）都在同一个目录下，我们想卸载的时候，直接将这个文件删除就可以，不会有任何垃圾文件存在。
通过源码包编译安装的软件，通常都放在 /usr/local/包名 路径下。

#### 启动方式不同
yum 安装 nginx，可以通过 系统服务命令 service 来启动或停止(或者是systemctl)
```shell
service nginx start #启动 nginx 服务

service nginx stop #停止 nginx 服务

service nginx restart #重启 nginx 服务
```
源码包 安装 nginx 启动的时候不能使用 service 来启动，需要执行 nginx 安装目录下的 sbin 目录下的 nginx 可执行程序才行，如下（我的 nginx 安装在 /usr/local/webserver/ 目录下）
```shell
/usr/local/webserver/nginx/sbin/nginx           #启动 nginx 服务
/usr/local/webserver/nginx/sbin/nginx -s stop   #停止 nginx 服务

# 或者 直接进入安装目录 ，执行 ./nginx 也可以，这两种方式其实是一样的，. 表示当前目录
cd /usr/local/webserver/nginx/sbin
sbin ./nginx
sbin ./nginx -s stop
```
> 注意：在自己的系统中只用选择一种安装方式即可，yum 安装的 nginx 版本可能不是最新的，可以通过 源码包 安装最新的，但系统中只要一种就可以，如果你想安装两个安装也可以，但是他们监听的端口都是 80 端口，每次只能启动一个

### Reference
- [agentzh 的 Nginx 教程（版本 2016.07.21](https://blog.csdn.net/huangyimo/article/details/80762878)
- []()