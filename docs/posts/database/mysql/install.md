- [安装](#安装)
  - [安装 MySQL rpm 源信息](#安装-mysql-rpm-源信息)
  - [yum安装](#yum安装)
  - [验证 MySQL 安装](#验证-mysql-安装)
  - [mac 下安装](#mac-下安装)
  - [设置密码](#设置密码)
  - [常用命令](#常用命令)
  - [查看MySQL 配置文件](#查看mysql-配置文件)
  - [导出 sql 文件](#导出-sql-文件)
- [Reference](#reference)


## 安装
首先，尝试一下直接使用 yum 安装 MySQL
```shell
yum install mysql-community-server
```
如果成功，表示不需要配置MySQL rpm 源信息，直接就安装完成了

但是，如果出现以下错误：
```
Loading mirror speeds from cached hostfile
没有可用软件包 mysql-community-server。
错误：无须任何处理
```
表示我们没有添加安装包的源信息，需要安装 MySQL rpm 源信息

### 安装 MySQL rpm 源信息
打开[MySQL Yum Repository](https://dev.mysql.com/downloads/repo/yum/)

根据系统版本，选择对应的安装包，例如CentOS 7.9，这个系统的Linux内核是 Linux 7，那么就选择Linux 7的版本。

根据版本拼接下载地址，使用wget命令下载：
```shell
wget  http://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm
```

rpm 安装源信息
```shell
rpm -ivh mysql80-community-release-el7-7.noarch.rpm
```

### yum安装
再次尝试 yum 安装
```shell
yum install mysql-community-server
```
安装过程中，会提示让我们确认，一律输入 y 按回车即可

安装完成后，yum会自动覆盖自带的mariaDB，所以不需要我们手动卸载它

如果出现 gpg 验证失败，可以使用以下命令忽略 gpg 验证：
```shell
yum install -y mysql-community-server --nogpgcheck --disablerepo=ius
```

### 验证 MySQL 安装
可以使用 mysqladmin 工具来获取服务器状态：
```shell
mysqladmin --version
```
输出版本信息，则安装成功。

也可以使用 rpm -qa 命令来查看 MySQL 是否安装成功：
```shell
rpm -qa | grep mysql
```
输出结果如下：
```shell
mysql-community-libs-compat-8.0.33-1.el7.x86_64
mysql-community-icu-data-files-8.0.33-1.el7.x86_64
mysql80-community-release-el7-7.noarch
mysql-community-common-8.0.33-1.el7.x86_64
mysql-community-libs-8.0.33-1.el7.x86_64
mysql-community-server-8.0.33-1.el7.x86_64
mysql-community-client-8.0.33-1.el7.x86_64
mysql-community-client-plugins-8.0.33-1.el7.x86_64
```
输出类似以上内容，表示安装完成

检查mariaDB是否被覆盖
```shell
rpm -qa | grep mariadb
```
输出空，表示 mariaDB 已经被成功覆盖。

### mac 下安装
```bash
# 检查服务列表
brew services list
# 检查是否有任何 mysqld 进程正在运行
ps aux | grep mysqld
# 检查 Homebrew 是否已安装 MySQL
brew list | grep mysql
# Homebrew 安装 MySQL
brew install mysql
# 启动 MySQL 服务
brew services start mysql
# 以 root 用户身份登录（默认无密码）
mysql -u root
# 设置密码
mysqladmin -u root password 'new_password'
# 重启 MySQL 服务
brew services restart mysql
```
日志文件通常位于 /opt/homebrew/var/mysql/ 或 /usr/local/var/mysql/ 目录下，文件名通常是 `<hostname>.err` 。

### 设置密码
Mysql安装成功后，默认的root用户密码为空，可以使用以下命令来创建root用户的密码：
```shell
mysqladmin -u root password 'new_password'
```

然后连接到Mysql服务器：
```shell
systemctl start mysqld
mysql -u root -p
```
输入密码回车确认，然后就可以进入mysql了

### 常用命令
```shell
# 开启自启
systemctl enable mysqld
systemctl start mysqld
systemctl stop mysqld
systemctl restart mysqld
systemctl status mysqld

# 查找所有与MySQL 相关的安装路径
# 也可以直接查看MySQL 的配置文件 my.cnf 来确认数据目录 (datadir) 和基础目录 (basedir)
rpm -qal | grep mysql

# 查看进程、版本信息
ps -ef | grep mysql
# 或
netstat -atp
```

### 查看MySQL 配置文件
- MySQL 的配置文件通常是 my.cnf，位于 /etc/my.cnf 或 /etc/mysql/my.cnf 等位置。
- 查找配置文件位置:可以使用 locate my.cnf 命令来查找配置文件，或者直接尝试查看常见位置。
- 查看配置文件内容:使用 cat /etc/my.cnf 命令来查看文件内容，寻找 [mysqld] 段落下的 datadir 和 basedir 选项。
  - datadir 指定了MySQL 数据库文件的存储位置，通常在 /var/lib/mysql。
  - basedir 指定了MySQL 安装的基本目录。

常用路径示例:
- 配置文件:/etc/my.cnf
- 数据目录:/var/lib/mysql
- 日志文件:/var/log/mysqld.log
- 服务启动脚本:/usr/lib/systemd/system/mysqld.service

### 导出 sql 文件
1.导出整个数据库
```shell
mysqldump -u 用户名 -p 数据库名 > 导出文件名
```

2.导出一个表
```shell
mysqldump -u 用户名 -p 数据库名 表名> 导出的文件名
```

3.导出一个数据库结构
```shell
mysqldump -u dbuser -p -d --add-drop-table dbname >d:/dbname_db.sql
-d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table
```

4.导入数据库
常用source 命令
进入mysql数据库控制台，如
```shell
mysql -u root -p
mysql>use 数据库
然后使用source命令，后面参数为脚本文件(如这里用到的.sql)
mysql>source d:/dbname.sql
```

## Reference
- [CentOS / Linux 安装MySQL](https://juejin.cn/post/7224408845685325884)
- [centos7服务器yum安装MySQL数据库，以及报错的解决方案](https://cloud.tsyidc.com/internet/1585.html)
- [Yum安装MySQL以及相关目录路径和修改目录](https://www.cnblogs.com/chinesern/p/8440206.html)

