<template><div><ul>
<li><a href="#docker%E5%A4%9A%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97">Docker多项目部署指南</a>
<ul>
<li><a href="#%E9%83%A8%E7%BD%B2%E6%AD%A5%E9%AA%A4">部署步骤</a>
<ul>
<li><a href="#1-%E5%AE%89%E8%A3%85docker%E5%92%8Cdocker-compose">1. 安装Docker和Docker Compose</a></li>
<li><a href="#2-%E6%9E%84%E5%BB%BA%E5%92%8C%E5%90%AF%E5%8A%A8%E5%AE%B9%E5%99%A8">2. 构建和启动容器</a></li>
<li><a href="#3-%E8%AE%BF%E9%97%AE%E5%BA%94%E7%94%A8">3. 访问应用</a></li>
</ul>
</li>
<li><a href="#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4">故障排除</a>
<ul>
<li><a href="#r3api-%E8%B7%AF%E5%BE%84%E8%AF%B7%E6%B1%82%E5%A4%B1%E8%B4%A5%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5">/r3/api/ 路径请求失败问题排查</a></li>
<li><a href="#%E4%BF%AE%E6%94%B9-%E6%9C%8D%E5%8A%A1%E5%90%8D-%E5%92%8C-%E5%AE%B9%E5%99%A8%E5%90%8D-%E5%90%8E%E5%90%AF%E5%8A%A8%E6%8A%A5%E7%AB%AF%E5%8F%A3%E5%86%B2%E7%AA%81%E5%BC%82%E5%B8%B8">修改 服务名 和 容器名 后启动报端口冲突异常</a></li>
<li><a href="#connect-failed-111-connection-refused-while-connecting-to-upstream">connect() failed (111: Connection refused) while connecting to upstream,</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h1 id="docker多项目部署指南" tabindex="-1"><a class="header-anchor" href="#docker多项目部署指南"><span>Docker多项目部署指南</span></a></h1>
<h2 id="部署步骤" tabindex="-1"><a class="header-anchor" href="#部署步骤"><span>部署步骤</span></a></h2>
<h3 id="_1-安装docker和docker-compose" tabindex="-1"><a class="header-anchor" href="#_1-安装docker和docker-compose"><span>1. 安装Docker和Docker Compose</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 安装 Docker</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.docker.com <span class="token parameter variable">-o</span> get-docker.sh</span>
<span class="line"><span class="token function">sh</span> get-docker.sh</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装 Docker Compose</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">"https://github.com/docker/compose/releases/latest/download/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>"</span> <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/local/bin/docker-compose</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建项目目录</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/pros</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">chown</span> <span class="token environment constant">$USER</span><span class="token builtin class-name">:</span><span class="token environment constant">$USER</span> /opt/pros</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确保您的系统已安装Docker和Docker Compose。</p>
<h3 id="_2-构建和启动容器" tabindex="-1"><a class="header-anchor" href="#_2-构建和启动容器"><span>2. 构建和启动容器</span></a></h3>
<p>常用命令，在项目根目录（包含docker-compose.yml的目录）下运行：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 构建前，测试 nginx 配置是否正确</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> nginx nginx <span class="token parameter variable">-t</span> <span class="token parameter variable">-c</span> /etc/nginx/nginx.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建前，测试 openresty 配置是否正确</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> openresty/openresty nginx <span class="token parameter variable">-t</span> <span class="token parameter variable">-c</span> /usr/local/openresty/nginx/conf/nginx.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建并启动所有容器</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器状态</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs app <span class="token parameter variable">-f</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入 app 服务</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> app /bin/sh</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看 r3-admin-server 服务日志(最新20条记录)</span></span>
<span class="line"><span class="token function">docker-compose</span> logs r3-admin-server <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">20</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启 app 服务的 nginx</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> app nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查 app 服务nginx.conf是否配置正确</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> app nginx <span class="token parameter variable">-t</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新构建并启动 r3-admin-server 服务</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">--build</span> r3-admin-server <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新构建并启动 pinco 服务</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">--build</span> pinco <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 访问 pinco 服务内部文件</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> pinco <span class="token function">curl</span> <span class="token parameter variable">-v</span> http://localhost:8080/pages/js/throttle-and-debounce.html</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 确认 pinco 容器的新 IP 地址</span></span>
<span class="line"><span class="token function">docker</span> inspect pinco <span class="token parameter variable">-f</span> <span class="token string">'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 尝试直接访问 pinco 容器，如果访问成功但是 http://localhost/blog 404 那就是 app 服务 nginx 配置问题</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-v</span> http://172.18.0.3:8080/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启服务</span></span>
<span class="line"><span class="token builtin class-name">cd</span> /opt/pros</span>
<span class="line"><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.yml <span class="token parameter variable">-f</span> docker-compose.prod.yml down</span>
<span class="line"><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.yml <span class="token parameter variable">-f</span> docker-compose.prod.yml up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-访问应用" tabindex="-1"><a class="header-anchor" href="#_3-访问应用"><span>3. 访问应用</span></a></h3>
<ul>
<li>博客: http://localhost/</li>
<li>管理前端: http://localhost/r3-admin/</li>
<li>管理后端API: http://localhost/r3/api/</li>
</ul>
<h2 id="故障排除" tabindex="-1"><a class="header-anchor" href="#故障排除"><span>故障排除</span></a></h2>
<h3 id="r3-api-路径请求失败问题排查" tabindex="-1"><a class="header-anchor" href="#r3-api-路径请求失败问题排查"><span>/r3/api/ 路径请求失败问题排查</span></a></h3>
<p>查看主 nginx 配置中的 /r3/api/ 路径配置，确保该路径被正确转发到 r3-admin-server 后端服务。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># r3-admin-server API - 代理/r3/api到后端服务</span></span>
<span class="line">location /r3/api/ <span class="token punctuation">{</span></span>
<span class="line">  proxy_pass http://r3-admin-server:9506/<span class="token punctuation">;</span></span>
<span class="line">  proxy_set_header Host <span class="token variable">$host</span><span class="token punctuation">;</span></span>
<span class="line">  proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span></span>
<span class="line">  proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span></span>
<span class="line">  proxy_set_header X-Forwarded-Proto <span class="token variable">$scheme</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果配置正确或已修改正确，检查 r3-admin-server 后端服务是否可以直接访问：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> r3-admin-server <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token parameter variable">-d</span> <span class="token string">'{"mobile":"test","password":"test"}'</span> http://localhost:9506/auth/login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># output</span></span>
<span class="line"><span class="token comment"># OCI runtime exec failed: exec failed: unable to start container process: exec: "curl": executable file not found in $PATH: unknown</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>curl 不可用，因为 Alpine 容器没有 curl。用 nginx 容器来测试后端连接：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx <span class="token function">wget</span> -qO- --post-data<span class="token operator">=</span><span class="token string">'{"mobile":"test","password":"test"}'</span> <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">'Content-Type: application/json'</span> http://r3-admin-server:9506/auth/login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># output</span></span>
<span class="line"><span class="token comment"># wget: can't connect to remote host (172.18.0.4): Connection refused</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有连接问题！检查后端服务状态：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> logs r3-admin-server <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">10</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>后端服务启动正常。检查网络连接：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx <span class="token function">nslookup</span> r3-admin-server</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># output</span></span>
<span class="line">Server:		<span class="token number">127.0</span>.0.11</span>
<span class="line">Address:	<span class="token number">127.0</span>.0.11:53</span>
<span class="line"></span>
<span class="line">Non-authoritative answer:</span>
<span class="line">Name:	r3-admin-server</span>
<span class="line">Address: <span class="token number">172.18</span>.0.4</span>
<span class="line"></span>
<span class="line">Non-authoritative answer:</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>网络解析正常。检查端口是否监听：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx <span class="token function">nc</span> <span class="token parameter variable">-zv</span> r3-admin-server <span class="token number">9506</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>没有输出<code v-pre>r3-admin-server (172.18.0.4:9506) open</code>，open关键词，发现问题。</p>
<p>r3-admin-server nest.js项目 main.ts 中，应用监听的端口是 process.env.PORT ?? 3000，而不是固定的 9506。但是 docker-compose 和 Dockerfile 中期望的是 9506 端口。</p>
<p>缺少 PORT 环境变量！在 docker-compose.yml 中添加 PORT 环境变量：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">environment:</span>
<span class="line">  - <span class="token assign-left variable">NODE_ENV</span><span class="token operator">=</span>production</span>
<span class="line">  - <span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">9506</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动 r3-admin-server 服务：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">--build</span> r3-admin-server <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>检查 r3-admin-server 的日志，确认它正在正确的端口监听：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> logs r3-admin-server <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">10</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>服务已经重新启动了。现在测试 /r3/api/auth/login 接口：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token parameter variable">-d</span> <span class="token string">'{"mobile":"test","password":"test"}'</span> http://localhost/r3/api/auth/login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># output</span></span>
<span class="line"><span class="token comment"># {"data":null,"success":false,"msg":"手机号不正确"}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题根源</p>
<ol>
<li>路径不匹配：前端期望 /r3/api/auth/login，但 nginx 只配置了 /r3-admin/api/ 路径</li>
<li>端口配置错误：后端应用监听 process.env.PORT ?? 3000，但 docker-compose 没有设置 PORT 环境变量，导致应用监听 3000 端口而不是期望的 9506 端口</li>
</ol>
<h3 id="修改-服务名-和-容器名-后启动报端口冲突异常" tabindex="-1"><a class="header-anchor" href="#修改-服务名-和-容器名-后启动报端口冲突异常"><span>修改 服务名 和 容器名 后启动报端口冲突异常</span></a></h3>
<p>操作:<br>
修改服务名 nginx -&gt; app<br>
修改容器名 nginx-proxy -&gt; app</p>
<p>主要有两个问题：</p>
<ol>
<li>端口占用错误 ： Bind for 0.0.0.0:80 failed: port is already allocated 。这意味着您主机上的 80 端口已经被其他程序占用，导致 app 容器无法启动。</li>
<li>孤儿容器警告 ： Found orphan containers ([nginx-proxy]) for this project. 这是因为我们之前将 Nginx 服务的名称从 nginx 改为 app ，并且容器名称从 nginx-proxy 改为 app ，导致旧的 nginx-proxy 容器变成了&quot;孤儿&quot;。</li>
</ol>
<p>解决：</p>
<ol>
<li>停止并删除旧的 nginx-proxy 容器，以释放 80 端口。</li>
<li>使用 --remove-orphans 标志重新运行 docker-compose up -d ，以便启动新的 app 容器并清理掉旧的孤儿容器。</li>
</ol>
<p>首先停止并删除 nginx-proxy 容器</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> nginx-proxy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>重新启动服务，以确保新的 app 容器能够正常启动，并且清理掉所有孤儿容器</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> --remove-orphans</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="connect-failed-111-connection-refused-while-connecting-to-upstream" tabindex="-1"><a class="header-anchor" href="#connect-failed-111-connection-refused-while-connecting-to-upstream"><span>connect() failed (111: Connection refused) while connecting to upstream,</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 检查内部的 nginx 配置</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> pinco nginx <span class="token parameter variable">-T</span></span>
<span class="line"><span class="token comment"># 检查 pinco 容器的状态</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> pinco</span>
<span class="line"><span class="token comment"># 检查容器日志</span></span>
<span class="line"><span class="token function">docker</span> logs pinco</span>
<span class="line"><span class="token comment"># 检查一下 pinco 容器内的网络监听状态</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> pinco <span class="token function">netstat</span> <span class="token parameter variable">-tlnp</span></span>
<span class="line"><span class="token comment"># 检查一下网络连通性</span></span>
<span class="line"><span class="token function">docker</span> network inspect app-deployment_app-network</span>
<span class="line"><span class="token comment"># 确认 pinco 容器的新 IP 地址</span></span>
<span class="line"><span class="token function">docker</span> inspect pinco <span class="token parameter variable">-f</span> <span class="token string">'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'</span></span>
<span class="line"><span class="token comment"># 尝试直接访问 pinco 容器</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-v</span> http://172.18.0.3:8080/</span>
<span class="line"><span class="token comment"># 重新启动 app 服务</span></span>
<span class="line"><span class="token function">docker</span> restart app</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


