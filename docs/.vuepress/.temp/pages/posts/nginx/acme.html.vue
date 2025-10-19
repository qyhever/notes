<template><div><ul>
<li><a href="#1%E5%AE%89%E8%A3%85">1：安装</a></li>
<li><a href="#2%E6%B3%A8%E5%86%8C-acmesh-%E8%B4%A6%E6%88%B7">2：注册 <code v-pre>acme.sh</code> 账户</a></li>
<li><a href="#3%E5%88%87%E6%8D%A2-ca-%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%BA-lets-encrypt">3：切换 CA 服务器为 Let's Encrypt</a></li>
<li><a href="#4%E9%85%8D%E7%BD%AE-aliyun-api-%E5%87%AD%E6%8D%AE">4：配置 Aliyun API 凭据</a></li>
<li><a href="#5%E7%94%9F%E6%88%90%E8%AF%81%E4%B9%A6">5：生成证书</a></li>
<li><a href="#6%E5%AE%89%E8%A3%85%E8%AF%81%E4%B9%A6%E5%88%B0-nginx">6：安装证书到 Nginx</a>
<ul>
<li><a href="#1-%E6%B7%BB%E5%8A%A0-ssl-%E9%85%8D%E7%BD%AE">1. 添加 SSL 配置</a></li>
<li><a href="#2-%E5%BC%BA%E5%88%B6-https-%E9%87%8D%E5%AE%9A%E5%90%91">2. 强制 HTTPS 重定向</a></li>
</ul>
</li>
<li><a href="#7%E8%87%AA%E5%8A%A8%E6%9B%B4%E6%96%B0%E8%AF%81%E4%B9%A6">7：自动更新证书</a></li>
<li><a href="#8%E6%9F%A5%E7%9C%8B%E5%B7%B2%E5%AE%89%E8%A3%85%E8%AF%81%E4%B9%A6%E4%BF%A1%E6%81%AF">8：查看已安装证书信息</a></li>
<li><a href="#reference">Reference</a></li>
</ul>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装"><span>1：安装</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 在任意目录下 clone，例如在 /home 目录下</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/acmesh-official/acme.sh.git</span>
<span class="line"><span class="token comment"># 为acme.ch映射一个全局别名acme.sh，方便其他路径下执行该脚本</span></span>
<span class="line"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">acme.sh</span><span class="token operator">=</span>/home/acme.sh/acme.sh</span>
<span class="line"><span class="token comment"># 验证</span></span>
<span class="line">acme.sh <span class="token parameter variable">--help</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-注册-acme-sh-账户" tabindex="-1"><a class="header-anchor" href="#_2-注册-acme-sh-账户"><span>2：注册 <code v-pre>acme.sh</code> 账户</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">acme.sh --register-account <span class="token parameter variable">-m</span> your_email@example.com</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>请将 <code v-pre>your_email@example.com</code> 替换为您的实际电子邮件地址。</p>
<h3 id="_3-切换-ca-服务器为-let-s-encrypt" tabindex="-1"><a class="header-anchor" href="#_3-切换-ca-服务器为-let-s-encrypt"><span>3：切换 CA 服务器为 Let's Encrypt</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">acme.sh --set-default-ca <span class="token parameter variable">--server</span> letsencrypt</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>更改以后还是有概率出现 pending，但基本 2-3 次即可成功。</p>
<h3 id="_4-配置-aliyun-api-凭据" tabindex="-1"><a class="header-anchor" href="#_4-配置-aliyun-api-凭据"><span>4：配置 Aliyun API 凭据</span></a></h3>
<p>需要以下两个环境变量来与 Aliyun 交互：</p>
<ol>
<li><strong><code v-pre>Ali_Key</code></strong>：Aliyun 的 AccessKey ID。</li>
<li><strong><code v-pre>Ali_Secret</code></strong>：Aliyun 的 AccessKey Secret。</li>
</ol>
<p>您需要从 Aliyun 获取 <code v-pre>Ali_Key</code> 和 <code v-pre>Ali_Secret</code>，然后将其设置为环境变量或直接传递给 <code v-pre>acme.sh</code>。以下是设置方法：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">Ali_Key</span><span class="token operator">=</span><span class="token string">"your_aliyun_api_key"</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">Ali_Secret</span><span class="token operator">=</span><span class="token string">"your_aliyun_api_secret"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-生成证书" tabindex="-1"><a class="header-anchor" href="#_5-生成证书"><span>5：生成证书</span></a></h3>
<p>运行以下命令生成证书：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">acme.sh <span class="token parameter variable">--issue</span> <span class="token parameter variable">--dns</span> dns_ali <span class="token parameter variable">-d</span> example.com <span class="token parameter variable">-d</span> <span class="token string">"*.example.com"</span> <span class="token parameter variable">--debug</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>*.example.com 加上 <code v-pre>&quot;&quot;</code> 号避免某些命令行(mac下zsh)运行异常。</p>
<h3 id="_6-安装证书到-nginx" tabindex="-1"><a class="header-anchor" href="#_6-安装证书到-nginx"><span>6：安装证书到 Nginx</span></a></h3>
<p>证书生成后，您需要将其安装到 Nginx 的配置中。以下是修改 <code v-pre>/Users/await/pros/app-deployment/nginx/nginx.prod.conf</code> 的示例：</p>
<h4 id="_1-添加-ssl-配置" tabindex="-1"><a class="header-anchor" href="#_1-添加-ssl-配置"><span>1. 添加 SSL 配置</span></a></h4>
<p>在 <code v-pre>server</code> 块中添加以下内容：</p>
<div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre v-pre><code><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> example.com</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># SSL 证书配置</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_certificate</span> /etc/nginx/ssl/example.com/fullchain.cer</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/nginx/ssl/example.com/example.com.key</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_trusted_certificate</span> /etc/nginx/ssl/example.com/ca.cer</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># SSL 协议配置</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1.2 TLSv1.3</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_ciphers</span> <span class="token string">'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384'</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_session_timeout</span> <span class="token number">1d</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_session_cache</span> shared:SSL:50m</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_stapling</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_stapling_verify</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 其他配置保持不变</span></span>
<span class="line">    <span class="token comment"># ...</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-强制-https-重定向" tabindex="-1"><a class="header-anchor" href="#_2-强制-https-重定向"><span>2. 强制 HTTPS 重定向</span></a></h4>
<p>在 <code v-pre>listen 80</code> 的 <code v-pre>server</code> 块中添加以下内容：</p>
<div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre v-pre><code><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> example.com</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-自动更新证书" tabindex="-1"><a class="header-anchor" href="#_7-自动更新证书"><span>7：自动更新证书</span></a></h3>
<p><code v-pre>acme.sh</code> 会自动为您设置定时任务来更新证书。您可以通过以下命令手动测试更新：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">acme.sh <span class="token parameter variable">--renew</span> <span class="token parameter variable">-d</span> example.com <span class="token parameter variable">-d</span> <span class="token string">"*.example.com"</span> <span class="token parameter variable">--debug</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_8-查看已安装证书信息" tabindex="-1"><a class="header-anchor" href="#_8-查看已安装证书信息"><span>8：查看已安装证书信息</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">acme.sh <span class="token parameter variable">--info</span> <span class="token parameter variable">-d</span> example.com</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h3>
<ul>
<li><a href="https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E" target="_blank" rel="noopener noreferrer">acme.sh</a></li>
<li><a href="https://github.com/acmesh-official/acme.sh/wiki/dnsapi" target="_blank" rel="noopener noreferrer">dnsapi</a></li>
<li><a href="https://juejin.cn/post/7441842559386058789" target="_blank" rel="noopener noreferrer">docker 部署nginx+acme.sh 申请阿里云域名证书并且自动更新</a></li>
</ul>
</div></template>


