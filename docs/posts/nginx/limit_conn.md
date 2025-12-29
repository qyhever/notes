你想了解Nginx中`limit_conn`和`limit_req`的核心区别及实际使用方法，我会从本质差异、工作原理、使用场景和配置示例等方面为你详细解析：

### 一、核心区别（核心定位不同）
`limit_conn`和`limit_req`均是Nginx的流量限制模块，但管控的**对象和维度完全不同**，这是二者的核心差异：
| 特性                | limit_conn                          | limit_req                          |
|---------------------|-------------------------------------|------------------------------------|
| 核心定位            | 限制**并发连接数**（同一客户端的同时连接数量） | 限制**请求速率**（单位时间内的请求次数，基于漏桶/令牌桶算法） |
| 管控对象            | 客户端（通常按IP、用户标识分组）的**连接数** | 客户端的**请求数**（单个连接内可包含多个请求，如HTTP长连接中的多次请求） |
| 解决问题            | 防止单个客户端同时建立大量连接耗尽服务器资源（如并发连接攻击） | 防止单个客户端在短时间内发送大量请求（如CC攻击、高频接口调用） |
| 依赖模块            | `ngx_http_limit_conn_module`        | `ngx_http_limit_req_module`        |
| 算法基础            | 基于连接计数（简单统计当前活跃连接数） | 基于漏桶算法（默认）/令牌桶算法（`burst`+`nodelay`实现） |

### 二、各自工作原理
#### 1. limit_conn：并发连接数限制
- 工作逻辑：Nginx会为每个符合条件的客户端（如按`$remote_addr`即客户端IP分组）维护一个"活跃连接计数器"，每当客户端建立新连接时计数器+1，连接关闭（请求完成、超时等）时计数器-1。
- 限制规则：当计数器值超过配置的上限时，Nginx会拒绝后续新的连接请求，返回`503 Service Unavailable`状态码。
- 关键特性：仅统计"活跃连接"，不关心连接内的请求数量；支持按不同维度分组（如IP、域名、用户Token）。

#### 2. limit_req：请求速率限制
- 工作逻辑：基于**漏桶算法**（默认）实现请求速率控制，把请求比作"水滴"，漏桶的"出水速度"就是配置的请求速率上限：
  - 正常情况下，请求按配置速率匀速处理，多余的请求会暂存到漏桶的"缓冲区"（`burst`参数配置）；
  - 若请求量超过漏桶容量（速率+缓冲区），则直接拒绝多余请求，返回`503 Service Unavailable`状态码；
  - 搭配`nodelay`参数时，可实现"令牌桶效果"，允许缓冲区中的请求立即处理（不等待漏桶匀速出水），仅限制超出速率+缓冲区的请求。
- 关键特性：针对请求数进行限流，即使是单个长连接中的高频请求，也会被限制；支持"突发请求"缓冲，避免正常突发流量被误拦截。

### 三、使用场景（针对性适配）
#### 1. limit_conn 的适用场景
适用于需要限制"同时连接数量"的场景，典型案例：
- 限制单个IP同时连接到网站的数量，防止恶意客户端建立大量并发连接占用服务器端口和内存；
- 针对文件下载、视频流播放等长连接场景，限制单个用户同时下载/播放的文件数量（避免带宽被单个用户独占）；
- 后台管理系统限制同一账号同时登录的设备连接数（按用户Token分组限流）。

#### 2. limit_req 的适用场景
适用于需要限制"单位时间请求频率"的场景，典型案例：
- 网站首页、接口服务限制单个IP每秒/每分钟的请求次数，抵御CC攻击；
- 短信验证码、登录接口限制单个用户的请求频率（如1分钟最多3次），防止恶意刷接口；
- 静态资源（图片、JS/CSS）限制请求速率，避免单个客户端高频抓取资源占用带宽；
- API服务对外提供接口时，按用户维度限制QPS（每秒请求数），保障服务稳定性。

### 四、配置示例（完整可落地）
#### 1. limit_conn 配置（限制单个IP并发连接数）
```nginx
http {
    # 1. 定义连接数限制共享内存区（key为客户端IP，容量10M，可存储大量IP的连接计数）
    limit_conn_zone $remote_addr zone=conn_limit_zone:10m;

    server {
        listen 80;
        server_name example.com;

        location / {
            # 2. 启用连接数限制：每个IP最多允许5个并发连接
            limit_conn conn_limit_zone 5;
            # 3. 超出限制时返回503状态码（默认就是503，可省略）
            limit_conn_status 503;
            # 4. 可选：限制每个服务器的总并发连接数
            limit_conn_zone $server_name zone=server_conn_zone:10m;
            limit_conn server_conn_zone 1000;

            root /usr/share/nginx/html;
            index index.html;
        }

        # 针对下载目录单独限制并发连接数
        location /download/ {
            limit_conn conn_limit_zone 2; # 单个IP最多2个同时下载连接
            root /usr/share/nginx/download;
        }
    }
}
```

#### 2. limit_req 配置（限制单个IP请求速率，支持突发请求）
```nginx
http {
    # 1. 定义请求速率限制共享内存区（key为客户端IP，速率限制为10r/s=每秒10个请求）
    # rate=10r/s 表示每秒处理10个请求；rate=60r/m 表示每分钟60个请求
    limit_req_zone $remote_addr zone=req_limit_zone:10m rate=10r/s;

    server {
        listen 80;
        server_name example.com;

        # 针对接口目录限制请求速率
        location /api/ {
            # 2. 启用请求速率限制：使用req_limit_zone内存区，burst=20表示突发缓冲区容量20
            # nodelay：缓冲区中的请求不等待，立即处理（令牌桶效果），仅拒绝超出10+20的请求
            limit_req zone=req_limit_zone burst=20 nodelay;
            # 3. 超出限制时返回503状态码（默认503，可省略）
            limit_req_status 503;
            # 4. 可选：对特定请求（如POST）放宽限制（需先定义新的limit_req_zone）
            # limit_req zone=req_limit_zone_post burst=10 nodelay;

            proxy_pass http://127.0.0.1:8080; # 转发到后端服务
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # 针对登录接口严格限制请求速率（1分钟最多3次）
        location /api/login {
            limit_req_zone $remote_addr zone=login_req_zone:10m rate=3r/m;
            limit_req zone=login_req_zone burst=0; # 禁用突发缓冲区，超出直接拒绝
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### 五、关键注意事项
1. **共享内存区配置**：`limit_conn_zone`和`limit_req_zone`必须在`http`块中定义（不能在`server`或`location`块内），`zone=xxx:10m`表示内存区名称和大小，10M内存可存储约数十万客户端的计数信息。
2. **限流维度扩展**：默认按`$remote_addr`（客户端IP）限流，也可按`$http_x_forwarded_for`（代理后的真实IP）、`$http_user_agent`（浏览器标识）、`$cookie_user`（用户Cookie）等自定义维度分组。
3. **错误处理**：超出限制时默认返回503状态码，可通过`limit_conn_status`和`limit_req_status`修改为403等状态码，也可配合`error_page`指令返回自定义错误页面。
4. **避免误限流**：对于搜索引擎爬虫、合法批量请求等场景，可通过`allow`指令放行特定IP，例如：
   ```nginx
   location /api/ {
       allow 192.168.1.0/24; # 放行内网IP段
       allow 8.8.8.8; # 放行谷歌DNSIP（爬虫可能使用）
       deny all; # 拒绝其他IP
       limit_req zone=req_limit_zone burst=20 nodelay;
   }
   ```
5. **两者结合使用**：实际生产环境中，常将`limit_conn`和`limit_req`配合使用，既限制并发连接数，又限制请求速率，形成更全面的流量防护体系。

### 总结
1. 核心差异：`limit_conn`限**并发连接数**（同时连接的数量），`limit_req`限**请求速率**（单位时间请求次数）；
2. 场景适配：长连接、多设备并发场景用`limit_conn`，高频请求、接口防刷场景用`limit_req`；
3. 配置关键：先在`http`块定义共享内存区，再在`server/location`块启用限流，可通过`burst`和`nodelay`优化突发流量处理；
4. 最佳实践：两者结合使用，并放行合法IP，避免误拦截正常请求。