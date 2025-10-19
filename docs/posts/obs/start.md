- [安装包](#安装包)
- [同步步骤](#同步步骤)
  - [创建git仓库](#创建git仓库)
  - [PC 同步](#pc-同步)
  - [ios 同步](#ios-同步)
  - [Android 同步](#android-同步)
- [iOS 上 iSH 执行 git 命令卡住的问题](#ios-上-ish-执行-git-命令卡住的问题)
- [相关](#相关)


## 安装包
去[官网](https://obsidian.md)下载安装包

## 同步步骤
### 创建git仓库
在 github 或者 gitee 创建私有仓库，比如命名为 obn  
仓库下面添加 .gitignore 文件，将 .obsidian 加入 git 忽略，避免多端同步冲突
```
.obsidian
```

### PC 同步
PC 端 obsidian 安装 Git 插件，简单配置下，就可以自动进行 git 同步了

### ios 同步
- 下载名为 iSH 的 APP，打开后，执行以下命令安装所需软件
```
apk update
apk add git
apk add vim
apk add openssh
apk add openrc
```

- 然后创建一个新目录再执行 mount，执行时 iOS 会以交互的方式让你选择目录，选择 obsidian 这一级别即可
```
cd ~ && mkdir repo
mount -t ios-unsafe . repo
```
- 拉取远程仓库
```
cd ~/repo
git clone xxx
```

- 打开 obsidian，选择打开 obn 这个日志库即可

### Android 同步
下载名为 termux 的 App，[github](https://github.com/termux/termux-app/releases)
打开后，执行以下命令安装所需软件


```
pkg add git
pkg add vim
pkg add openssh
```

Termux 使用 `termux-setup-storage` 命令挂载Android 手机存储，该命令会在Termux 的 `~/storage` 目录下创建一个符号链接，指向手机的共享存储空间（通常是 `~/storage/shared`）。授权后，您就可以通过 `cd storage` 命令访问手机上的文件，例如下载目录 `~/storage/downloads`

```
cd ~
termux-setup-storage
```

1.**授予权限**
此时会弹出一个权限请求框，要求Termux 访问您的手机存储空间。
- 选择`允许`以授权Termux 访问。
2.**验证挂载**：
授权成功后，在Termux 的主目录 (`~/`) 下会出现一个名为 `storage` 的新目录。
3.**访问手机存储**：
- 使用 `cd storage` 命令进入挂载的目录。
- 您会看到 `shared` 文件夹，进入该文件夹（`cd shared`）即可看到您的手机内部存储空间。
- 您还可以直接访问常用的子目录，如 `downloads`（下载目录），通过 `cd storage/shared/downloads` 命令
- ，在 share 下新建/repo(随便起名)， 拉取远程仓库
```
mkdir repo
cd repo
git clone xxx
```

- 打开 obsidian，选择打开 obn 这个日志库即可

## iOS 上 iSH 执行 git 命令卡住的问题
这是一个经常出现的问题，有关 [issue](https://github.com/ish-app/ish/issues/1640)提到 mount 时使用 ios-unsafe 参数可以解决，实际
用了之后，还是不能解决。

这个[issue](https://github.com/ish-app/ish/issues/1581)有一个解决办法：每次 git 操作前都重新 mount。可以写一个 sh 脚本，放在 repo
下，每次运行下就行。

新建 sh 文件
```
cd ~
vim tool.sh
```

tool.sh内容
```
cd ~
mount -t ios-unsafe . repo
```
git 操作前每次执行，`sh tool.sh`即可

## 相关
- [obsidian 使用 git 进行多终端同步](https://zhuanlan.zhihu.com/p/697196173)
- [网状的思考，线性的写作](https://www.codedump.info/post/20220612-weekly-18/)
- [阮一峰-最适合程序员的笔记软件](https://www.ruanyifeng.com/blog/2021/08/best-note-taking-software-for-programmers.html)
