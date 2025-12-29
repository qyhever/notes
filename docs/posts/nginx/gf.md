## 日志分析



### 1. **主要异常情况**



从 error.log 中可以看到以下几类异常：



#### a) 恶意扫描和攻击尝试

- **WordPress 相关扫描**：大量针对 WordPress 文件的扫描（wp-login.php, wp-admin/, wp-content/ 等）

- **PHP 后门扫描**：尝试访问各种 PHP 后门文件（alfa.php, admin.php, shell.php 等）

- **路径遍历攻击**：尝试访问 .git/config, .env 等敏感文件

- **CGI 漏洞扫描**：/cgi-bin/luci/;stok=/locale

- **文件上传漏洞扫描**：upload.php, uploadfile.php 等



#### b) 正常但缺失的资源

- `robots.txt` - 搜索引擎爬虫请求

- `sitemap.xml` - 站点地图

- `favicon.ico` - 网站图标



#### c) 可疑的访问模式

- 来自多个 IP 的重复扫描

- 带有伪造 referrer 的请求（Google、Bing、Yahoo 等）



### 2. **安全风险评估**



- ✅ 已有基本防护：`.git` 和 `.env` 文件已被规则拦截

- ⚠️ 大量 404 错误表明网站正在被扫描

- ⚠️ 没有针对恶意 User-Agent 的过滤

- ⚠️ 缺少请求频率限制的有效应用



## Nginx 配置优化建议

```ini
worker_processes  auto;  # 自动根据 CPU 核心数设置

worker_rlimit_nofile 65535;



events {

  worker_connections  4096;  # 增加连接数

  use epoll;  # Linux 下使用 epoll

  multi_accept on;

}



http {

    log_format  mylog  '$remote_addr - $remote_user [$formatted_time] "$request" '

                    '$status $body_bytes_sent "$http_referer" '

                    '"$http_user_agent" "$http_x_forwarded_for"';

    

    # 安全日志格式 - 记录可疑请求

    log_format  security  '$remote_addr - [$formatted_time] "$request" '

                    '$status "$http_user_agent" - BLOCKED';

    

    access_by_lua_block {

        -- 初始化变量（避免日志中出现空值或未定义错误）

        ngx.var.formatted_time = ""

        -- 生成带毫秒的时间戳

        local now = ngx.now()  -- 当前时间戳（秒，含小数）

        local ms = math.floor(now * 1000) % 1000  -- 提取毫秒部分

        local date_str = os.date("%Y-%m-%d %H:%M:%S", now)  -- 日期时间部分

        -- 拼接成完整时间（格式：YYYY-MM-DD HH:MM:SS.sss）

        ngx.var.formatted_time = date_str .. string.format(".%03d", ms)

    }



    server_tokens off;

    

    # 限流配置 - 更严格的限制

    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;  # 降低到 10 req/s

    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;  # API 专用限流

    limit_conn_zone $binary_remote_addr zone=addr:10m;

    

    # 请求体大小限制

    client_body_buffer_size 128k;

    client_max_body_size 10m;

    client_header_buffer_size 1k;

    large_client_header_buffers 4 8k;

```

```ini
    server {

        set $formatted_time "";

        set $app_de "1510";

        listen 80;

        server_name localhost;



        # 默认字符集

        charset utf-8;



        # 访问日志

        access_log /var/log/nginx/access.log mylog;

        error_log /var/log/nginx/error.log warn;  # 改为 warn 级别，减少日志量

        

        # 安全日志 - 记录被拦截的请求

        access_log /var/log/nginx/security.log security if=$malicious;

        

        # 连接限制

        limit_conn addr 10;

        limit_req zone=one burst=5 nodelay;

        

        # ============ 安全防护规则 ============

        

        # 拦截恶意 User-Agent

        if ($http_user_agent ~* (sqlmap|nikto|nmap|masscan|nessus|openvas|metasploit|havij|acunetix)) {

            return 403;

        }

        

        # 拦截常见扫描工具

        if ($http_user_agent ~* (wget|curl|python|perl|ruby|java|go-http-client)) {

            set $malicious 1;

            return 403;

        }

        

        # 拦截空 User-Agent

        if ($http_user_agent = "") {

            return 403;

        }

        

        # 拦截 SQL 注入尝试

        if ($query_string ~* (union.*select|insert.*into|drop.*table|update.*set|delete.*from)) {

            return 403;

        }

        

        # 拦截 XSS 尝试

        if ($query_string ~* (<script|javascript:|onerror=|onload=)) {

            return 403;

        }

        

        # 拦截路径遍历

        if ($request_uri ~* (\.\./|\.\.\\)) {

            return 403;

        }

        

        # 拦截敏感文件访问

        location ~* \.(env|git|svn|htaccess|htpasswd|ini|log|sh|sql|conf|bak|old|swp)$ {

            deny all;

            access_log /var/log/nginx/security.log security;

        }

        

        # 拦截 PHP 后门常见文件名

        location ~* (shell|backdoor|c99|r57|webshell|phpspy|eval|base64|assert)\.php$ {

            deny all;

            access_log /var/log/nginx/security.log security;

        }

        

        # 拦截 WordPress 扫描（如果不使用 WordPress）

        location ~* ^/(wp-admin|wp-content|wp-includes|xmlrpc\.php|wp-login\.php) {

            deny all;

            access_log /var/log/nginx/security.log security;

        }
```

```ini
        # ============ 静态资源优化 ============

        

        # robots.txt - 返回基本内容

        location = /robots.txt {

            add_header Content-Type text/plain;

            return 200 "User-agent: *\nDisallow: /api/\nDisallow: /admin/\n";

            access_log off;

        }

        

        # sitemap.xml - 如果没有实际文件，返回 404 但不记录日志

        location = /sitemap.xml {

            log_not_found off;

            access_log off;

        }

        

        location = /favicon.ico {

            log_not_found off;

            access_log off;

            expires 30d;

        }



        location = /.well-known/appspecific/com.chrome.devtools.json {

            log_not_found off;

            access_log off;

        }

        

        # 静态资源缓存

        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {

            expires 30d;

            add_header Cache-Control "public, immutable";

            access_log off;

        }
```

```ini
        # r3-admin-server API - 代理/r3/api到后端服务

        location /r3/api/ {

            # API 专用限流

            limit_req zone=api burst=10 nodelay;

            

            rewrite ^/r3/api/(.*)$ /$1 break;

            proxy_pass http://r3-admin-server:9506;

            proxy_set_header Host $host;

            proxy_set_header Content-Type $content_type;

            proxy_set_header X-Real-IP $remote_addr;

            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_set_header X-Forwarded-Proto $scheme;

            

            # 超时设置

            proxy_connect_timeout 10s;

            proxy_send_timeout 30s;

            proxy_read_timeout 30s;

            

            # 缓冲设置

            proxy_buffering on;

            proxy_buffer_size 4k;

            proxy_buffers 8 4k;

        }
```





## 额外建议



### 1. **创建 robots.txt 文件**



在 `nginx/html` 目录下创建 `robots.txt`：



```txt

User-agent: *

Disallow: /api/

Disallow: /admin/

Disallow: /r3/api/

Allow: /



Sitemap: https://qyhever.com/sitemap.xml

```



### 2. **配置 Fail2ban（推荐）**



创建 Fail2ban 规则来自动封禁恶意 IP：



```ini

# /etc/fail2ban/filter.d/nginx-scan.conf

[Definition]

failregex = ^<HOST> .* "(GET|POST|HEAD) .*(\.php|\.env|\.git|wp-admin|wp-login).*" (404|403)

ignoreregex =

```



### 3. **日志轮转优化**



```bash

# /etc/logrotate.d/nginx

/var/log/nginx/*.log {

    daily

    missingok

    rotate 14

    compress

    delaycompress

    notifempty

    create 0640 nginx nginx

    sharedscripts

    postrotate

        [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`

    endscript

}

```



### 4. **监控告警**



建议设置监控规则：

- 当 403/404 错误率超过阈值时告警

- 当来自单个 IP 的请求超过阈值时告警

- 定期分析 `security.log` 中的恶意请求模式



### 5. **Docker Compose 优化建议**



考虑添加健康检查：



```yaml

services:

  app:

    healthcheck:

      test: ["CMD", "curl", "-f", "http://localhost/"]

      interval: 30s

      timeout: 10s

      retries: 3

```



## 总结



主要优化点：

1. ✅ 增强安全防护（User-Agent 过滤、敏感文件保护）

2. ✅ 优化限流策略（降低全局限流，API 单独限流）

3. ✅ 减少无效日志（robots.txt、favicon.ico）

4. ✅ 添加安全日志记录

5. ✅ 性能优化（worker 进程、连接数、缓存）

6. ✅ 拦截常见攻击模式（SQL 注入、XSS、路径遍历）



这些优化将显著减少日志中的异常请求，提高服务器安全性和性能。
