
## 系统信息
```bash
uname -a # 显示操作系统名称、主机名、内核版本、硬件架构等信息
lsb_release -a # 提供Linux 发行版的详细信息，包括名称、版本号和代号
```

## 文件目录
```bash
ls -la # 列出全部文件并显示详细信息
ls a* # 列出当前目录下的所有以a字母开头的文件
ls -l *.txt # 列出当前目录下的所有后缀名为txt的文件

mkdir foo # 创建 foo 目录
mkdir foo/bar/baz # 创建多层目录
mkdir -m 777 foo # 创建 foo 目录，权限为 777

rmdir -p foo/bar/baz # 删除多层目录，仅能删除空目录

touch a.txt # 创建 a.txt 文件

cp a.txt b.txt # 把a文件复制到b文件
cp a.txt ./foo # 把a文件复制到 foo 目录下
cp -a foo bar # 把 foo 目录下所有文件复制到新目录 bar

mv a.txt b.txt # 把文件a重命名为b
mv a.txt ./foo # 把a文件移动到 foo 目录

cat a.txt # 查看文件内容
cat -n a.txt # 查看文件并给文件内容标上行号
cat a.txt >> b.txt # 把a文件的内容组合到b文件的末尾
echo 'hello' > a.txt # 添加内容到a文件（会覆盖已有内容）
echo 'hello' >> a.txt # 追加内容到a文件（没有内容相当于创建文件）
cat >> 文件名 # 追加内容，运行后，输入内容(每一行输入后按Enter 键)并在最后按 Ctrl + D 退出
cat > 文件名 # 覆盖内容
cat >> 文件名 << EOF # 追加多行内容，运行后，输入多行内容，最后在单独的一行输入你之前定义的分隔符，例如 EOF，按Enter 键退出

rm -rf foo # 强制递归删除 foo

find / -name openrestry # 全局查找 openrestry 的文件目录
```


## chmod
```bash
chmod +r foo # 可读
chmod +w foo # 可写
chmod +x foo # 可执行
```

## alias
当前命令行生效
```bash
alias ll='ls -la' # 创建 ll 别名（等号前后不能有空格）
alias # 查看当前别名列表
unalias ll # 删除 ll 别名
unalias -a # 删除所有别名
```

如果需要永久生效，需要添加到环境变量中。
```bash
# 在 Linux 下编辑 .bashrc
vim ~/.bashrc
# 将新建的别名命令逐行写入
alias ll='ls -la'
# 刷新
source ~/.bashrc
```

## 上传下载
```bash
# 上传 foo.html 到服务器 /usr/share/nginx/html 目录下
scp ./foo.html 用户名@ip地址:/usr/share/nginx/html
# 上传 bar 目录 到服务器 /usr/share/nginx/html 目录下
scp -r bar 用户名@ip地址:/usr/share/nginx/html
# 上传 dist 目录下所有文件 到服务器 /usr/share/nginx/html/app 目录下
scp -r dist/* user@remote_host:/usr/share/nginx/html/app/
# 下载 /usr/share/nginx/html/foo.html 文件 到 当前目录下
scp 用户名@ip地址:/usr/share/nginx/html/foo.html ./
```

另外常用的上传还有 `rsync` 命令，它可以实现增量备份和同步，在传输大量文件时通常效率更高，因为它只传输变更的部分。
```bash
# 同步本地目录到远程目录
rsync -avz /path/to/local/dir user@remote_host:/path/to/remote/dir
# 增量备份本地目录到远程目录
rsync -avz --delete /path/to/local/dir user@remote_host:/path/to/remote/dir
```
- `-a` ：归档模式，保留文件权限、所有权等信息。
- `-v` ：详细模式，显示传输过程。
- `-z` ：压缩传输，提高效率。
- `--delete` ：在源目录中删除的文件，在目标目录中也会被删除，以保持两边文件的一致性。
