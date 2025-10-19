<template><div><h1 id="docker多项目部署指南" tabindex="-1"><a class="header-anchor" href="#docker多项目部署指南"><span>Docker多项目部署指南</span></a></h1>
<p>本文档提供了使用Docker部署多个项目的详细说明，包括qyhever博客、r3-admin-front前端和r3-admin-server后端服务。</p>
<h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2>
<ul>
<li><strong>nginx</strong>: 主 nginx，统一处理所有路由和 API 代理，访问路径为根目录 <code v-pre>http://localhost/</code></li>
<li><strong>qyhever</strong>: 博客项目，访问路径为 <code v-pre>http://localhost/blog/</code></li>
<li><strong>r3-admin-front</strong>: 管理前端项目，访问路径为 <code v-pre>http://localhost/r3-admin/</code></li>
<li><strong>r3-admin-server</strong>: 管理后端API服务，为r3-admin-front提供API支持</li>
</ul>
<h2 id="文件说明" tabindex="-1"><a class="header-anchor" href="#文件说明"><span>文件说明</span></a></h2>
<ul>
<li><code v-pre>docker-compose.yml</code>: 定义了所有服务的Docker配置</li>
<li><code v-pre>nginx</code>: Nginx配置文件，静态目录，日志目录</li>
<li>各项目目录下的Dockerfile: 定义了各个项目的构建和运行环境</li>
<li>各项目目录下的.dockerignore: 忽略某些文件或目录</li>
</ul>
<h2 id="部署步骤" tabindex="-1"><a class="header-anchor" href="#部署步骤"><span>部署步骤</span></a></h2>
<h3 id="_1-安装docker和docker-compose" tabindex="-1"><a class="header-anchor" href="#_1-安装docker和docker-compose"><span>1. 安装Docker和Docker Compose</span></a></h3>
<p>确保您的系统已安装Docker和Docker Compose。</p>
<h3 id="_2-构建和启动容器" tabindex="-1"><a class="header-anchor" href="#_2-构建和启动容器"><span>2. 构建和启动容器</span></a></h3>
<p>在项目根目录（包含docker-compose.yml的目录）下运行以下命令：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 构建并启动所有容器</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器状态</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入 nginx</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx /bin/sh</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看 r3-admin-server 服务日志(最新20条记录)</span></span>
<span class="line"><span class="token function">docker-compose</span> logs r3-admin-server <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">20</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启nginx</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查nginx.conf是否配置正确</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx nginx <span class="token parameter variable">-t</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启 r3-admin-server 服务</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">--build</span> r3-admin-server <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-访问应用" tabindex="-1"><a class="header-anchor" href="#_3-访问应用"><span>3. 访问应用</span></a></h3>
<ul>
<li>首页: http://localhost/</li>
<li>博客: http://localhost/blog/</li>
<li>管理前端: http://localhost/r3-admin/</li>
<li>管理后端API: http://localhost/r3/api/</li>
</ul>
<h2 id="配置说明" tabindex="-1"><a class="header-anchor" href="#配置说明"><span>配置说明</span></a></h2>
<h3 id="nginx配置" tabindex="-1"><a class="header-anchor" href="#nginx配置"><span>Nginx配置</span></a></h3>
<p><code v-pre>nginx/nginx.conf</code>文件配置了：</p>
<ul>
<li>将根路径请求配置./nginx/html为静态目录</li>
<li>将/blog/路径请求转发到qyhever博客服务</li>
<li>将/r3-admin/路径请求转发到r3-admin-front服务</li>
<li>将/r3/api/路径请求转发到r3-admin-server服务</li>
</ul>
<h3 id="各项目配置" tabindex="-1"><a class="header-anchor" href="#各项目配置"><span>各项目配置</span></a></h3>
<ul>
<li><strong>qyhever</strong>: 使用VuePress构建静态博客，并使用Nginx提供服务</li>
<li><strong>r3-admin-front</strong>: Vue3项目，构建后使用Nginx提供服务</li>
<li><strong>r3-admin-server</strong>: nest后端服务</li>
</ul>
<h2 id="自定义配置" tabindex="-1"><a class="header-anchor" href="#自定义配置"><span>自定义配置</span></a></h2>
<h3 id="修改端口" tabindex="-1"><a class="header-anchor" href="#修改端口"><span>修改端口</span></a></h3>
<p>如需修改对外暴露的端口，请编辑<code v-pre>docker-compose.yml</code>文件中nginx服务的<code v-pre>ports</code>部分：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token string">"新端口:80"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改项目路径" tabindex="-1"><a class="header-anchor" href="#修改项目路径"><span>修改项目路径</span></a></h3>
<p>如需修改项目访问路径，需要：</p>
<ol>
<li>修改<code v-pre>nginx/nginx.conf</code>中的location配置</li>
<li>对于前端项目，可能还需要修改其构建配置（如vite.config.ts中的base配置）</li>
</ol>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🎉 成功!</p>
<p>问题根源</p>
<ol>
<li>路径不匹配：前端期望 /r3/api/auth/login，但 nginx 只配置了 /r3-admin/api/ 路径</li>
<li>端口配置错误：后端应用监听 process.env.PORT ?? 3000，但 docker-compose 没有设置 PORT 环境变量，导致应用监听 3000 端口而不是期望的 9506 端口</li>
</ol>
</div></template>


