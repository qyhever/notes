- [SSH密钥配置](#ssh密钥配置)
- [故障排除](#故障排除)
  - [GitHub Actions 构建异常，日志错误信息 Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password)](#github-actions-构建异常日志错误信息-permission-denied-publickeygssapi-keyexgssapi-with-micpassword)
  - [/r3/api/health get请求正常，/r3/api/auth/login post 请求 404](#r3apihealth-get请求正常r3apiauthlogin-post-请求-404)
  - [nginx 日志时间， r3-admin-server 服务中的时间不对](#nginx-日志时间-r3-admin-server-服务中的时间不对)


## SSH密钥配置
```bash
# 在本地生成密钥对（如果没有）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 将公钥添加到服务器
ssh-copy-id user@server_ip

# 将私钥内容复制到 GitHub Secrets 中的 SERVER_SSH_RSA
cat ~/.ssh/id_rsa
```

## 故障排除

### GitHub Actions 构建异常，日志错误信息 Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password) 

表明在尝试通过 SSH 连接到您的服务器时发生了身份验证失败。

公钥私钥配置错误，添加一个调试步骤，在 deploy.yml 文件中增加一个步骤，用于打印出工作流在运行时使用的 SSH 公钥。这样就可以清楚地知道应该在生产服务器上配置哪个公钥。
```yml
- name: Display Public Key for Debugging
    run: |
      echo "Verifying the public key that will be used for authentication..."
      ssh-keygen -y -f <(echo "${{ secrets.SERVER_SSH_RSA }}")
```

后续步骤：
1. 提交并推送
2. 重新触发工作流
3. 检查工作流日志 ：在 GitHub Actions 的运行日志中，找到 Display Public Key for debugging 这一步的输出。它会显示一个以 ssh-rsa 或 ecdsa-sha2-nistp256 等开头的公钥。
4. 验证服务器配置 ：
   - 通过 SSH 登录到生产服务器。
   - 确保上一步中从日志里复制的 完整公钥 ，已经添加在 SERVER_USER 秘密中指定用户的 ~/.ssh/authorized_keys 文件中。每一行代表一个公钥。
   - 如果 authorized_keys 文件不存在，或者公钥不在其中，将公钥粘贴进去。
   - 检查权限：确保服务器上的 SSH 相关目录和文件权限正确无误。可以使用以下命令进行设置：
    ```bash
    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/authorized_keys
    ```

### /r3/api/health get请求正常，/r3/api/auth/login post 请求 404

从 docker 内部访问 `http://r3-admin-server:9506/auth/login`
```bash
docker-compose exec nginx wget -qO- --post-data='{"mobile":"test","password":"test"}' --header='Content-Type: application/json'  http://r3-admin-server:9506/auth/login
```
访问正常

从 docker 内部访问 `http://127.0.0.1/r3/api/auth/login`
```bash
docker-compose exec nginx wget -qO- --post-data='{"mobile":"test","password":"test"}' --header='Content-Type: application/json' http://127.0.0.1/r3/api/auth/login
```
返回 404，Cannot POST /

说明 `r3-admin-server` 运行正常，`/r3/api` 代理有问题

查看 `nginx.conf`，发现 `proxy_pass http://$upstream_r3_admin_server/;`

```ini
location /r3/api/ {
    set $upstream_r3_admin_server r3-admin-server:9506;
    proxy_pass http://$upstream_r3_admin_server/;
    # ...
}
```

当 proxy_pass 配置为 http://$upstream_r3_admin_server; (不带斜杠) 时，Nginx 会将 location 块中匹配到的 URI 部分（即 /r3/api/ ）替换为 proxy_pass 中指定的 URI（这里是空），然后将剩余的 URI 部分附加到 proxy_pass 的目标上。

所以，当请求 http://127.0.0.1/r3/api/auth/login 时，Nginx 匹配到 location /r3/api/ ，然后将 /r3/api/ 替换为空，将 /auth/login 附加到 http://r3-admin-server:9506 ，最终代理的请求是 http://r3-admin-server:9506/auth/login 。

但是， "Cannot POST /" 错误意味着 r3-admin-server 接收到的请求路径是 / 。

这里更换配置，去掉 proxy_pass 末尾斜杠，使用 rewrite 处理路径重写，去掉路径中的 /r3/api/
```ini
location /r3/api/ {
    set $upstream_r3_admin_server r3-admin-server:9506;
    rewrite ^/r3/api/(.*)$ /$1 break;
    proxy_pass http://$upstream_r3_admin_server;
    # ...
}
```

### nginx 日志时间， r3-admin-server 服务中的时间不对
这是一个常见的 Docker 环境中的时间同步问题。通常，Docker 容器默认使用 UTC 时间，而宿主机可能配置为本地时区，这会导致日志时间与您期望的时间不符。

通常涉及在 docker-compose.yml 文件中为 Nginx 服务挂载宿主机的 /etc/localtime 文件，或者设置 TZ 环境变量。
```yml
  volumes:
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=Asia/Shanghai
```

重启后，进入查看
```bash
docker-compose exec nginx date 
```