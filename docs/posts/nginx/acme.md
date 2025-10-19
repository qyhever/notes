- [1：安装](#1安装)
- [2：注册 `acme.sh` 账户](#2注册-acmesh-账户)
- [3：切换 CA 服务器为 Let's Encrypt](#3切换-ca-服务器为-lets-encrypt)
- [4：配置 Aliyun API 凭据](#4配置-aliyun-api-凭据)
- [5：生成证书](#5生成证书)
- [6：安装证书到 Nginx](#6安装证书到-nginx)
  - [1. 添加 SSL 配置](#1-添加-ssl-配置)
  - [2. 强制 HTTPS 重定向](#2-强制-https-重定向)
- [7：自动更新证书](#7自动更新证书)
- [8：查看已安装证书信息](#8查看已安装证书信息)
- [Reference](#reference)


### 1：安装

```bash
# 在任意目录下 clone，例如在 /home 目录下
git clone https://github.com/acmesh-official/acme.sh.git
# 为acme.ch映射一个全局别名acme.sh，方便其他路径下执行该脚本
alias acme.sh=/home/acme.sh/acme.sh
# 验证
acme.sh --help
```

### 2：注册 `acme.sh` 账户

```bash
acme.sh --register-account -m your_email@example.com
```

请将 `your_email@example.com` 替换为您的实际电子邮件地址。

### 3：切换 CA 服务器为 Let's Encrypt
```bash
acme.sh --set-default-ca --server letsencrypt
```

更改以后还是有概率出现 pending，但基本 2-3 次即可成功。

### 4：配置 Aliyun API 凭据

需要以下两个环境变量来与 Aliyun 交互：

1. **`Ali_Key`**：Aliyun 的 AccessKey ID。
2. **`Ali_Secret`**：Aliyun 的 AccessKey Secret。

您需要从 Aliyun 获取 `Ali_Key` 和 `Ali_Secret`，然后将其设置为环境变量或直接传递给 `acme.sh`。以下是设置方法：

```bash
export Ali_Key="your_aliyun_api_key"
export Ali_Secret="your_aliyun_api_secret"
```

### 5：生成证书

运行以下命令生成证书：
```bash
acme.sh --issue --dns dns_ali -d example.com -d "*.example.com" --debug
```

*.example.com 加上 `""` 号避免某些命令行(mac下zsh)运行异常。

### 6：安装证书到 Nginx

证书生成后，您需要将其安装到 Nginx 的配置中。以下是修改 `/Users/await/pros/app-deployment/nginx/nginx.prod.conf` 的示例：

#### 1. 添加 SSL 配置
在 `server` 块中添加以下内容：
```nginx
server {
    listen 443 ssl;
    server_name example.com;

    # SSL 证书配置
    ssl_certificate /etc/nginx/ssl/example.com/fullchain.cer;
    ssl_certificate_key /etc/nginx/ssl/example.com/example.com.key;
    ssl_trusted_certificate /etc/nginx/ssl/example.com/ca.cer;

    # SSL 协议配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # 其他配置保持不变
    # ...
}
```

#### 2. 强制 HTTPS 重定向
在 `listen 80` 的 `server` 块中添加以下内容：
```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

### 7：自动更新证书

`acme.sh` 会自动为您设置定时任务来更新证书。您可以通过以下命令手动测试更新：
```bash
acme.sh --renew -d example.com -d "*.example.com" --debug
```

### 8：查看已安装证书信息

```bash
acme.sh --info -d example.com
```

### Reference
- [acme.sh](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
- [dnsapi](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)
- [docker 部署nginx+acme.sh 申请阿里云域名证书并且自动更新](https://juejin.cn/post/7441842559386058789)