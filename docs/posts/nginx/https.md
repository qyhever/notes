- [1. 安装](#1-安装)
  - [curl方式](#curl方式)
  - [git方式](#git方式)
- [使用](#使用)
- [续订证书](#续订证书)
- [常见问题](#常见问题)
- [Reference](#reference)


acme.sh 实现了 acme 协议, 可以从 letsencrypt 生成免费的证书.

主要步骤:
- 安装 acme.sh
- 生成证书
- copy 证书到 nginx/apache 或者其他服务
- 更新证书
- 配置服务器 nginx
- 更新 acme.sh
- 出错怎么办, 如何调试

### 1. 安装
#### curl方式
```shell
curl https://get.acme.sh | sh
# 进入acme.sh的目录
~/.acme.sh/
# 将本目录里的为acme.ch映射一个全局别名acme.sh，方便其他路径下执行该脚本
alias acme.sh=~/.acme.sh/acme.sh
```

#### git方式
```shell
git clone https://github.com/acmesh-official/acme.sh.git
cd ./acme.sh
cp ./acme.sh /usr/local/bin
```

### 使用
根据你的域名所在的运营商, 例如腾讯云的DNSPod, 阿里云, cloudflare等,不同的运营商, 脚本有区别,这里以DNSPod来演示


1. 访问[DNSPod](https://console.dnspod.cn/account/token/token)，API密钥->DNSPod Token->创建密钥
2. 创建密钥并填写到下方的`DP_Id`和`DP_Key`变量中
```shell
export DP_Id="DNSPod ID" && export DP_Key="DNSPod Token"
```

3. 申请证书
该脚本为申请一个主域 + 通配符多域名（SAN）证书:
```shell
# Daomain=<你的网站域名>
acme.sh --issue --dns dns_dp -d $Daomain -d *.$Daomain --keylength ec-256 --debug
```
参数说明:
- --issue 是触发证书申请流程
- --dns dns_dp: 使用 DNS 挑战（DNS-01）  方式验证域名所有权,acme.sh会自动调用 DNSPod 的 API,在你的域名下添加一条 _acme-challenge 的 TXT 记录来完成验证, 验证完成后, 会自动删除该 TXT 记录（临时添加）, 它支持申请通配符证书（*.example.com），无需开放 80/443 端口
- -d 或--domain: 指定你要为哪些域名申请证书
- --keylength ec-256: 指定生成的私钥类型和长度。ec-256 表示使用 椭圆曲线加密（ECC） ，具体是 prime256v1（NIST P-256）  曲线, 相比传统的 RSA 2048，ECC 提供了更高的安全性和更小的密钥体积，性能更好。可选值还包括：ec-384, ec-521, 2048, 3072, 4096 等。
- --debug: 开启调试模式，输出详细的日志信息

4. 复制证书使用
```shell
dir=/root/.acme.sh/example.com_ecc/
daomain=example.com
cp $dir/fullchain.cer /home/docker/nginx/ssl/nginx.crt
cp $dir/$daomain.key /home/docker/nginx/ssl/nginx.key
```

5. 在Docker的nginx里使用TLS证书
```ini
server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://$host$request_uri;
}

server {
    server_name ${DOMAIN} www.${DOMAIN};

    # HTTP/3 with QUIC
    listen 443 quic reuseport;

    # HTTP/2 and HTTP/1.1
    listen 443 ssl;
    http2 on;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload" always;
    add_header X-XSS-Protection          "1; mode=block" always;
    add_header X-Frame-Options           SAMEORIGIN always;
    add_header X-Content-Type-Options    nosniff always;
    add_header Alt-Svc                   'h3=":443"; ma=86400; h3-29=":443"; ma=86400';

    # SSL/TLS configuration
    ssl_protocols               TLSv1.3 TLSv1.2;
    ssl_ecdh_curve              X25519:P-256:P-384;

    # 通用兼容性密码套件
    ssl_ciphers                 "ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256";

    ssl_prefer_server_ciphers   on;

    # 显式声明 TLS 1.3 密码（需要 OpenSSL 1.1.1+）
    ssl_conf_command Ciphersuites TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;

    # SSL certificates
    ssl_certificate     /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;

    location / {
        root   /etc/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}

```
方式1: 将证书文件(.crt或.pem或.cer后缀文件)和私钥文件(.key后缀文件)复制到nginx容器里

```shell
docker cp <证书文件> <容器名称>:<nginx的ssl_certificate参数指定的文件路径>
docker cp <私钥文件> <容器名称>:<nginx的ssl_certificate_key参数指定的文件路径>

# eg.
docker cp "*.example.com_ecc/fullchain.cer" blog:/etc/nginx/ssl/nginx.cer
docker cp "*.example.com.key" blog:/etc/nginx/ssl/nginx.key
```

方式2: 将证书路径挂载到容器里

```yml
services:
  blog:
    image: example/blog # 这里需要替换成你的镜像
    container_name: blog # 镜像名称
    build:
      context: .
      dockerfile: .
      target: final
    ports:
      - '80:80'
      - '443:443'
      - '443:443/udp'
    # 环境变量
    environment:
      DOMAIN: example.com # 这里需要替换成你的域名
    restart: on-failure:4 # 重启策略，最多重启n次
    volumes:
      - /home/docker/blog/conf:/etc/nginx/conf.d # nginx.conf目录路径
      - /home/docker/nginx/ssl:/etc/nginx/ssl:ro # tls证书文件目录路径

```

### 续订证书
一般情况下, acme.sh60天自动更新一次证书过期时间, 如果没有自动更新, 可以使用以下脚本来手动更新: 强制续订证书,默认是每60天自动更新:

- 可以通过 acme.sh --list 查看证书
- 可以通过 crontab -l 查看定时任务
- 可以通过 crontab -e 命令修改执行的时间

执行下面 sh 脚本手动更新

```sh
export DP_Id=<你的DNSPod id>
export DP_Key=<你的DNSPod key>
Daomain=<你的网站域名>

acme.sh --renew -d $Daomain --force
```

### 常见问题
Q: nginx无法读取文件, 缺少read权限: 2025/08/27 14:18:43 [emerg] 1#1: cannot load certificate key "/etc/nginx/ssl/nginx.key": BIO_new_file() failed (SSL: error:8000000D:system library::Permission denied:calling fopen(/etc/nginx/ssl/nginx.key, r) error:10080002:BIO routines::system lib)

在 ssl 目录下 ls -l 查看文件信息，查看 nginx.key 是否缺少 read 权限

添加 read 权限：
```shell
chmod +r nginx.key
```

Q: 查看证书是否过期:
方式1: 直接查看网站地址栏前面的锁图标的详细信息

方式2: 使用openssl工具:
```shell
openssl x509 -in <证书文件> -noout -dates
```

### Reference
- [acme.sh](https://github.com/acmesh-official/acme.sh)
- [使用acme.sh来实现自动化申请](https://juejin.cn/post/7543104399942910002)
