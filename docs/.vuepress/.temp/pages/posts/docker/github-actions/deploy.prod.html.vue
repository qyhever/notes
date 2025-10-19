<template><div><ul>
<li><a href="#ssh%E5%AF%86%E9%92%A5%E9%85%8D%E7%BD%AE">SSH密钥配置</a></li>
<li><a href="#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4">故障排除</a>
<ul>
<li><a href="#github-actions-%E6%9E%84%E5%BB%BA%E5%BC%82%E5%B8%B8%E6%97%A5%E5%BF%97%E9%94%99%E8%AF%AF%E4%BF%A1%E6%81%AF-permission-denied-publickeygssapi-keyexgssapi-with-micpassword">GitHub Actions 构建异常，日志错误信息 Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password)</a></li>
<li><a href="#r3apihealth-get%E8%AF%B7%E6%B1%82%E6%AD%A3%E5%B8%B8r3apiauthlogin-post-%E8%AF%B7%E6%B1%82-404">/r3/api/health get请求正常，/r3/api/auth/login post 请求 404</a></li>
<li><a href="#nginx-%E6%97%A5%E5%BF%97%E6%97%B6%E9%97%B4-r3-admin-server-%E6%9C%8D%E5%8A%A1%E4%B8%AD%E7%9A%84%E6%97%B6%E9%97%B4%E4%B8%8D%E5%AF%B9">nginx 日志时间， r3-admin-server 服务中的时间不对</a></li>
</ul>
</li>
</ul>
<h2 id="ssh密钥配置" tabindex="-1"><a class="header-anchor" href="#ssh密钥配置"><span>SSH密钥配置</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 在本地生成密钥对（如果没有）</span></span>
<span class="line">ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> <span class="token string">"your_email@example.com"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将公钥添加到服务器</span></span>
<span class="line">ssh-copy-id user@server_ip</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将私钥内容复制到 GitHub Secrets 中的 SERVER_SSH_RSA</span></span>
<span class="line"><span class="token function">cat</span> ~/.ssh/id_rsa</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="故障排除" tabindex="-1"><a class="header-anchor" href="#故障排除"><span>故障排除</span></a></h2>
<h3 id="github-actions-构建异常-日志错误信息-permission-denied-publickey-gssapi-keyex-gssapi-with-mic-password" tabindex="-1"><a class="header-anchor" href="#github-actions-构建异常-日志错误信息-permission-denied-publickey-gssapi-keyex-gssapi-with-mic-password"><span>GitHub Actions 构建异常，日志错误信息 Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password)</span></a></h3>
<p>表明在尝试通过 SSH 连接到您的服务器时发生了身份验证失败。</p>
<p>公钥私钥配置错误，添加一个调试步骤，在 deploy.yml 文件中增加一个步骤，用于打印出工作流在运行时使用的 SSH 公钥。这样就可以清楚地知道应该在生产服务器上配置哪个公钥。</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Display Public Key for Debugging</span>
<span class="line">    <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">      echo "Verifying the public key that will be used for authentication..."</span>
<span class="line">      ssh-keygen -y -f &lt;(echo "${{ secrets.SERVER_SSH_RSA }}")</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后续步骤：</p>
<ol>
<li>提交并推送</li>
<li>重新触发工作流</li>
<li>检查工作流日志 ：在 GitHub Actions 的运行日志中，找到 Display Public Key for debugging 这一步的输出。它会显示一个以 ssh-rsa 或 ecdsa-sha2-nistp256 等开头的公钥。</li>
<li>验证服务器配置 ：
<ul>
<li>通过 SSH 登录到生产服务器。</li>
<li>确保上一步中从日志里复制的 完整公钥 ，已经添加在 SERVER_USER 秘密中指定用户的 ~/.ssh/authorized_keys 文件中。每一行代表一个公钥。</li>
<li>如果 authorized_keys 文件不存在，或者公钥不在其中，将公钥粘贴进去。</li>
<li>检查权限：确保服务器上的 SSH 相关目录和文件权限正确无误。可以使用以下命令进行设置：</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">chmod</span> <span class="token number">700</span> ~/.ssh</span>
<span class="line"><span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/authorized_keys</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="r3-api-health-get请求正常-r3-api-auth-login-post-请求-404" tabindex="-1"><a class="header-anchor" href="#r3-api-health-get请求正常-r3-api-auth-login-post-请求-404"><span>/r3/api/health get请求正常，/r3/api/auth/login post 请求 404</span></a></h3>
<p>从 docker 内部访问 <code v-pre>http://r3-admin-server:9506/auth/login</code></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx <span class="token function">wget</span> -qO- --post-data<span class="token operator">=</span><span class="token string">'{"mobile":"test","password":"test"}'</span> <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">'Content-Type: application/json'</span>  http://r3-admin-server:9506/auth/login</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>访问正常</p>
<p>从 docker 内部访问 <code v-pre>http://127.0.0.1/r3/api/auth/login</code></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx <span class="token function">wget</span> -qO- --post-data<span class="token operator">=</span><span class="token string">'{"mobile":"test","password":"test"}'</span> <span class="token parameter variable">--header</span><span class="token operator">=</span><span class="token string">'Content-Type: application/json'</span> http://127.0.0.1/r3/api/auth/login</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>返回 404，Cannot POST /</p>
<p>说明 <code v-pre>r3-admin-server</code> 运行正常，<code v-pre>/r3/api</code> 代理有问题</p>
<p>查看 <code v-pre>nginx.conf</code>，发现 <code v-pre>proxy_pass http://$upstream_r3_admin_server/;</code></p>
<div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre v-pre><code><span class="line">location /r3/api/ {</span>
<span class="line">    set $upstream_r3_admin_server r3-admin-server:9506;</span>
<span class="line">    proxy_pass http://$upstream_r3_admin_server/;</span>
<span class="line">    <span class="token comment"># ...</span></span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 proxy_pass 配置为 http://$upstream_r3_admin_server; (不带斜杠) 时，Nginx 会将 location 块中匹配到的 URI 部分（即 /r3/api/ ）替换为 proxy_pass 中指定的 URI（这里是空），然后将剩余的 URI 部分附加到 proxy_pass 的目标上。</p>
<p>所以，当请求 http://127.0.0.1/r3/api/auth/login 时，Nginx 匹配到 location /r3/api/ ，然后将 /r3/api/ 替换为空，将 /auth/login 附加到 http://r3-admin-server:9506 ，最终代理的请求是 http://r3-admin-server:9506/auth/login 。</p>
<p>但是， &quot;Cannot POST /&quot; 错误意味着 r3-admin-server 接收到的请求路径是 / 。</p>
<p>这里更换配置，去掉 proxy_pass 末尾斜杠，使用 rewrite 处理路径重写，去掉路径中的 /r3/api/</p>
<div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre v-pre><code><span class="line">location /r3/api/ {</span>
<span class="line">    set $upstream_r3_admin_server r3-admin-server:9506;</span>
<span class="line">    rewrite ^/r3/api/(.*)$ /$1 break;</span>
<span class="line">    proxy_pass http://$upstream_r3_admin_server;</span>
<span class="line">    <span class="token comment"># ...</span></span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx-日志时间-r3-admin-server-服务中的时间不对" tabindex="-1"><a class="header-anchor" href="#nginx-日志时间-r3-admin-server-服务中的时间不对"><span>nginx 日志时间， r3-admin-server 服务中的时间不对</span></a></h3>
<p>这是一个常见的 Docker 环境中的时间同步问题。通常，Docker 容器默认使用 UTC 时间，而宿主机可能配置为本地时区，这会导致日志时间与您期望的时间不符。</p>
<p>通常涉及在 docker-compose.yml 文件中为 Nginx 服务挂载宿主机的 /etc/localtime 文件，或者设置 TZ 环境变量。</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line">  <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro</span>
<span class="line">  <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> TZ=Asia/Shanghai</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启后，进入查看</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx <span class="token function">date</span> </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


