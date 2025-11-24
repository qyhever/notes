iSH 是免费开源的软件，能满足 iOS 下基本终端使用需求，如 git 拉取项目、通过 ssh 管理服务器等。

## iSH
### 创建 ssh 秘钥
无法通过 rsa 创建秘钥，支持部分模式，如 ed255191 ：
```
ssh-keygen -t ed255191
```
或将其他环境秘钥传进来，可以正常使用。

### 挂载文件
先创建目录，然后通过 mount 指令挂载，比如将 Obsidian 软件的目录挂载到终端的 repo 目录内：
```
mkdir repo
mount -t ios-unsafe . repo
```
执行后 iOS 会以交互的方式让你选择目录，选择 obsidian 这一级别即可

取消挂载：
```
umount obsidian
```
