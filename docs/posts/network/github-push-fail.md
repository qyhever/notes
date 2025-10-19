- [症状](#症状)
- [可能的原因和解决方法](#可能的原因和解决方法)
  - [机场模式选择不对，可以试试 tun 模式](#机场模式选择不对可以试试-tun-模式)
  - [机场服务商把 ssh 协议 or 22 端口封了，需要设置下 git via https](#机场服务商把-ssh-协议-or-22-端口封了需要设置下-git-via-https)
  - [git config proxy](#git-config-proxy)
  - [命令行 proxy](#命令行-proxy)
  - [仓库目录下执行 git config --local -e ，弹出文件编辑，git@github.com:改为 https://github.com/](#仓库目录下执行-git-config---local--e-弹出文件编辑gitgithubcom改为-httpsgithubcom)
- [Reference](#reference)


## 症状
本地浏览器可以访问，但是 push 代码超时。  
阿里云服务器也无法 clone 代码。

proxy 用的小猫咪，异常信息：
```shell
git push origin main
Connection closed by 127.0.0.1 port 7890
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

## 可能的原因和解决方法
### 机场模式选择不对，可以试试 tun 模式

### 机场服务商把 ssh 协议 or 22 端口封了，需要设置下 git via https
ssh config 里加上
```shell
Host github.com
HostName ssh.github.com
Port 443
User git
```
[GitHub Docs using-ssh-over-the-https-port](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port#enabling-ssh-connections-over-https)
### git config proxy
浏览器连 github 是走 https 连接, push 是走 ssh
git 本地代理设置好就可以

### 命令行 proxy
proxy='export https_proxy=http://127.0.0.1:7890;export http_proxy=http://127.0.0.1:7890;export all_proxy=socks5://127.0.0.1:7890'

unproxy='unset https_proxy http_proxy all_proxy'

### 仓库目录下执行 git config --local -e ，弹出文件编辑，git@github.com:改为 https://github.com/

## Reference
- [v2ex-大家 github 还能 push 代码吗？](https://www.v2ex.com/t/1155542)
