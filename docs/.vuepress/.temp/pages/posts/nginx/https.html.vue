<template><div><ul>
<li><a href="#1-%E5%AE%89%E8%A3%85">1. 安装</a>
<ul>
<li><a href="#curl%E6%96%B9%E5%BC%8F">curl方式</a></li>
<li><a href="#git%E6%96%B9%E5%BC%8F">git方式</a></li>
</ul>
</li>
<li><a href="#%E4%BD%BF%E7%94%A8">使用</a></li>
<li><a href="#%E7%BB%AD%E8%AE%A2%E8%AF%81%E4%B9%A6">续订证书</a></li>
<li><a href="#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98">常见问题</a></li>
<li><a href="#reference">Reference</a></li>
</ul>
<p>acme.sh 实现了 acme 协议, 可以从 letsencrypt 生成免费的证书.</p>
<p>主要步骤:</p>
<ul>
<li>安装 acme.sh</li>
<li>生成证书</li>
<li>copy 证书到 nginx/apache 或者其他服务</li>
<li>更新证书</li>
<li>配置服务器 nginx</li>
<li>更新 acme.sh</li>
<li>出错怎么办, 如何调试</li>
</ul>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装"><span>1. 安装</span></a></h3>
<h4 id="curl方式" tabindex="-1"><a class="header-anchor" href="#curl方式"><span>curl方式</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> https://get.acme.sh <span class="token operator">|</span> <span class="token function">sh</span></span>
<span class="line"><span class="token comment"># 进入acme.sh的目录</span></span>
<span class="line">~/.acme.sh/</span>
<span class="line"><span class="token comment"># 将本目录里的为acme.ch映射一个全局别名acme.sh，方便其他路径下执行该脚本</span></span>
<span class="line"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">acme.sh</span><span class="token operator">=~</span>/.acme.sh/acme.sh</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git方式" tabindex="-1"><a class="header-anchor" href="#git方式"><span>git方式</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> clone https://github.com/acmesh-official/acme.sh.git</span>
<span class="line"><span class="token builtin class-name">cd</span> ./acme.sh</span>
<span class="line"><span class="token function">cp</span> ./acme.sh /usr/local/bin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h3>
<p>根据你的域名所在的运营商, 例如腾讯云的DNSPod, 阿里云, cloudflare等,不同的运营商, 脚本有区别,这里以DNSPod来演示</p>
<ol>
<li>访问<a href="https://console.dnspod.cn/account/token/token" target="_blank" rel="noopener noreferrer">DNSPod</a>，API密钥-&gt;DNSPod Token-&gt;创建密钥</li>
<li>创建密钥并填写到下方的<code v-pre>DP_Id</code>和<code v-pre>DP_Key</code>变量中</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">DP_Id</span><span class="token operator">=</span><span class="token string">"DNSPod ID"</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable">DP_Key</span><span class="token operator">=</span><span class="token string">"DNSPod Token"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="3">
<li>申请证书
该脚本为申请一个主域 + 通配符多域名（SAN）证书:</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Daomain=&lt;你的网站域名></span></span>
<span class="line">acme.sh <span class="token parameter variable">--issue</span> <span class="token parameter variable">--dns</span> dns_dp <span class="token parameter variable">-d</span> <span class="token variable">$Daomain</span> <span class="token parameter variable">-d</span> *.<span class="token variable">$Daomain</span> <span class="token parameter variable">--keylength</span> ec-256 <span class="token parameter variable">--debug</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明:</p>
<ul>
<li>--issue 是触发证书申请流程</li>
<li>--dns dns_dp: 使用 DNS 挑战（DNS-01）  方式验证域名所有权,acme.sh会自动调用 DNSPod 的 API,在你的域名下添加一条 _acme-challenge 的 TXT 记录来完成验证, 验证完成后, 会自动删除该 TXT 记录（临时添加）, 它支持申请通配符证书（*.example.com），无需开放 80/443 端口</li>
<li>-d 或--domain: 指定你要为哪些域名申请证书</li>
<li>--keylength ec-256: 指定生成的私钥类型和长度。ec-256 表示使用 椭圆曲线加密（ECC） ，具体是 prime256v1（NIST P-256）  曲线, 相比传统的 RSA 2048，ECC 提供了更高的安全性和更小的密钥体积，性能更好。可选值还包括：ec-384, ec-521, 2048, 3072, 4096 等。</li>
<li>--debug: 开启调试模式，输出详细的日志信息</li>
</ul>
<ol start="4">
<li>复制证书使用</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token assign-left variable">dir</span><span class="token operator">=</span>/root/.acme.sh/example.com_ecc/</span>
<span class="line"><span class="token assign-left variable">daomain</span><span class="token operator">=</span>example.com</span>
<span class="line"><span class="token function">cp</span> <span class="token variable">$dir</span>/fullchain.cer /home/docker/nginx/ssl/nginx.crt</span>
<span class="line"><span class="token function">cp</span> <span class="token variable">$dir</span>/<span class="token variable">$daomain</span>.key /home/docker/nginx/ssl/nginx.key</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>在Docker的nginx里使用TLS证书</li>
</ol>
<div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre v-pre><code><span class="line">server {</span>
<span class="line">    listen 80;</span>
<span class="line">    server_name ${DOMAIN};</span>
<span class="line">    return 301 https://$host$request_uri;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">server {</span>
<span class="line">    server_name ${DOMAIN} www.${DOMAIN};</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># HTTP/3 with QUIC</span></span>
<span class="line">    listen 443 quic reuseport;</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># HTTP/2 and HTTP/1.1</span></span>
<span class="line">    listen 443 ssl;</span>
<span class="line">    http2 on;</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># Security headers</span></span>
<span class="line">    <span class="token key attr-name">add_header Strict-Transport-Security "max-age</span><span class="token punctuation">=</span><span class="token value attr-value">63072000; includeSubdomains; preload" always;</span></span>
<span class="line">    <span class="token key attr-name">add_header X-XSS-Protection          "1; mode</span><span class="token punctuation">=</span><span class="token value attr-value">block" always;</span></span>
<span class="line">    add_header X-Frame-Options           SAMEORIGIN always;</span>
<span class="line">    add_header X-Content-Type-Options    nosniff always;</span>
<span class="line">    <span class="token key attr-name">add_header Alt-Svc                   'h3</span><span class="token punctuation">=</span><span class="token value attr-value">":443"; ma=86400; h3-29=":443"; ma=86400';</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># SSL/TLS configuration</span></span>
<span class="line">    ssl_protocols               TLSv1.3 TLSv1.2;</span>
<span class="line">    ssl_ecdh_curve              X25519:P-256:P-384;</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 通用兼容性密码套件</span></span>
<span class="line">    ssl_ciphers                 "ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256";</span>
<span class="line"></span>
<span class="line">    ssl_prefer_server_ciphers   on;</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 显式声明 TLS 1.3 密码（需要 OpenSSL 1.1.1+）</span></span>
<span class="line">    ssl_conf_command Ciphersuites TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># SSL certificates</span></span>
<span class="line">    ssl_certificate     /etc/nginx/ssl/nginx.crt;</span>
<span class="line">    ssl_certificate_key /etc/nginx/ssl/nginx.key;</span>
<span class="line"></span>
<span class="line">    location / {</span>
<span class="line">        root   /etc/nginx/html;</span>
<span class="line">        index  index.html index.htm;</span>
<span class="line">        try_files $uri $uri/ /index.html;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式1: 将证书文件(.crt或.pem或.cer后缀文件)和私钥文件(.key后缀文件)复制到nginx容器里</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> <span class="token function">cp</span> <span class="token operator">&lt;</span>证书文件<span class="token operator">></span> <span class="token operator">&lt;</span>容器名称<span class="token operator">></span>:<span class="token operator">&lt;</span>nginx的ssl_certificate参数指定的文件路径<span class="token operator">></span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">cp</span> <span class="token operator">&lt;</span>私钥文件<span class="token operator">></span> <span class="token operator">&lt;</span>容器名称<span class="token operator">></span>:<span class="token operator">&lt;</span>nginx的ssl_certificate_key参数指定的文件路径<span class="token operator">></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># eg.</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">cp</span> <span class="token string">"*.example.com_ecc/fullchain.cer"</span> blog:/etc/nginx/ssl/nginx.cer</span>
<span class="line"><span class="token function">docker</span> <span class="token function">cp</span> <span class="token string">"*.example.com.key"</span> blog:/etc/nginx/ssl/nginx.key</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式2: 将证书路径挂载到容器里</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">blog</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> example/blog <span class="token comment"># 这里需要替换成你的镜像</span></span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> blog <span class="token comment"># 镜像名称</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">context</span><span class="token punctuation">:</span> .</span>
<span class="line">      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> .</span>
<span class="line">      <span class="token key atrule">target</span><span class="token punctuation">:</span> final</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">'80:80'</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">'443:443'</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">'443:443/udp'</span></span>
<span class="line">    <span class="token comment"># 环境变量</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">DOMAIN</span><span class="token punctuation">:</span> example.com <span class="token comment"># 这里需要替换成你的域名</span></span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> on<span class="token punctuation">-</span>failure<span class="token punctuation">:</span><span class="token number">4</span> <span class="token comment"># 重启策略，最多重启n次</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /home/docker/blog/conf<span class="token punctuation">:</span>/etc/nginx/conf.d <span class="token comment"># nginx.conf目录路径</span></span>
<span class="line">      <span class="token punctuation">-</span> /home/docker/nginx/ssl<span class="token punctuation">:</span>/etc/nginx/ssl<span class="token punctuation">:</span>ro <span class="token comment"># tls证书文件目录路径</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="续订证书" tabindex="-1"><a class="header-anchor" href="#续订证书"><span>续订证书</span></a></h3>
<p>一般情况下, acme.sh60天自动更新一次证书过期时间, 如果没有自动更新, 可以使用以下脚本来手动更新: 强制续订证书,默认是每60天自动更新:</p>
<ul>
<li>可以通过 acme.sh --list 查看证书</li>
<li>可以通过 crontab -l 查看定时任务</li>
<li>可以通过 crontab -e 命令修改执行的时间</li>
</ul>
<p>执行下面 sh 脚本手动更新</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">DP_Id</span><span class="token operator">=</span><span class="token operator">&lt;</span>你的DNSPod id<span class="token operator">></span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">DP_Key</span><span class="token operator">=</span><span class="token operator">&lt;</span>你的DNSPod key<span class="token operator">></span></span>
<span class="line"><span class="token assign-left variable">Daomain</span><span class="token operator">=</span><span class="token operator">&lt;</span>你的网站域名<span class="token operator">></span></span>
<span class="line"></span>
<span class="line">acme.sh <span class="token parameter variable">--renew</span> <span class="token parameter variable">-d</span> <span class="token variable">$Daomain</span> <span class="token parameter variable">--force</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h3>
<p>Q: nginx无法读取文件, 缺少read权限: 2025/08/27 14:18:43 [emerg] 1#1: cannot load certificate key &quot;/etc/nginx/ssl/nginx.key&quot;: BIO_new_file() failed (SSL: error:8000000D:system library::Permission denied:calling fopen(/etc/nginx/ssl/nginx.key, r) error:10080002:BIO routines::system lib)</p>
<p>在 ssl 目录下 ls -l 查看文件信息，查看 nginx.key 是否缺少 read 权限</p>
<p>添加 read 权限：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">chmod</span> +r nginx.key</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Q: 查看证书是否过期:
方式1: 直接查看网站地址栏前面的锁图标的详细信息</p>
<p>方式2: 使用openssl工具:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">openssl x509 <span class="token parameter variable">-in</span> <span class="token operator">&lt;</span>证书文件<span class="token operator">></span> <span class="token parameter variable">-noout</span> <span class="token parameter variable">-dates</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h3>
<ul>
<li><a href="https://github.com/acmesh-official/acme.sh" target="_blank" rel="noopener noreferrer">acme.sh</a></li>
<li><a href="https://juejin.cn/post/7543104399942910002" target="_blank" rel="noopener noreferrer">使用acme.sh来实现自动化申请</a></li>
</ul>
</div></template>


