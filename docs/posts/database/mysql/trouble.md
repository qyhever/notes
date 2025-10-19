- [Problem: Access denied for user 'root'@'localhost' (using password: YES)](#problem-access-denied-for-user-rootlocalhost-using-password-yes)
  - [Option 1: Using MySQL Installer (Recommended for Windows)](#option-1-using-mysql-installer-recommended-for-windows)
  - [Option 2: Safe Mode Reset](#option-2-safe-mode-reset)
  - [Option 3](#option-3)


## Problem: Access denied for user 'root'@'localhost' (using password: YES)
需要修改密码

### Option 1: Using MySQL Installer (Recommended for Windows)
1. Open MySQL Installer from Start Menu
2. Click "Reconfigure" next to MySQL Server
3. Follow the wizard to reset root password

### Option 2: Safe Mode Reset
```shell
# Stop MySQL service
net stop mysql80
# 或者 此电脑->管理->服务->MySQL80，右键选择停止

# Start MySQL in safe mode (skip grant tables)
# 8.0以下
mysqld --skip-grant-tables --skip-networking
# 8.0以上
mysqld --console --skip-grant-tables --shared-memory

# In a new command prompt
mysql -u root

# 在 mysql 面板中 依次执行以下命令
mysql> FLUSH PRIVILEGES;
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;

# Restart MySQL normally
net start mysql80

# Check your_new_password
mysql -u root -p
```
实测无效，可以用以下命令试试

```
mysql> use mysql;
mysql> update user set password=password("your_new_password") where user="root";
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

### Option 3
1. 打开 此电脑->管理->服务->MySQL80，右键点击属性找到 mysql 的 my.ini 文件路径
2. 在 my.ini 所在目录，新建 init_pwd.txt 文件。内容
```shell
ALTER user root@'localhost' identified by 'your_new_password';
```
3. 停止 mysql 服务，`net stop mysql` 或者 通过 windows 服务停止MySQL80
4. 重新初始化 mysql
```shell
mysqld --defaults-file="D:\MySQL\MySQL Server 8.0\my.ini" --init-file="D:\MySQL\MySQL Server 8.0\init_pwd.txt"

```
> 此命令会删除数据库，需要先备份

5. 执行后，一直卡在那里，执行 ctrl+c 退出
6. 重新启动 mysql 服务，可以用新密码登录了
