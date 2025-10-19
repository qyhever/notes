<template><div><p>在<RouteLink to="/posts/network/best-proxy-way.html">最佳代理实践</RouteLink>中， 代理主要有两种：</p>
<ol>
<li>一种主要是 Trojain， 配合 Clash 实现自动代理， 主要服务于浏览器上网查资料</li>
<li>第二种通过 sshuttle 来实现全局代理， 主要是保障命令行的工具一定可以工作， 比如 git、 goget、 yay 等场景</li>
</ol>
<p>sshuttle 这个工具非常稳定， 各种恶劣的环境都可以保证命令行工具正常运行， 但是它有两个缺点：</p>
<ol>
<li>全局的特性会干扰浏览器的正常运行， 会让一些不用代理的网站访问速度变慢， 或者让微信无法接受新消息</li>
<li>每次都需要开一个终端输入密码， 很麻烦
其实， 我平常用的最多的命令就是 Git， 访问 git https 一般都没有问题， 主要是 git ssh 容易被干扰， 原因是防火墙有时会完全拒绝 SSH 链接。</li>
</ol>
<p>今天介绍一种新的方法： Git via HTTPS, 通过 HTTPS 端口建立 SSH 链接， 因为大多数防火墙规则允许 HTTPS 链接， 从而变相解决 git ssh 被干扰的问题。</p>
<h3 id="测试-https-端口的-ssh-是否可行" tabindex="-1"><a class="header-anchor" href="#测试-https-端口的-ssh-是否可行"><span>测试 HTTPS 端口的 SSH 是否可行</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">$ <span class="token function">ssh</span> <span class="token parameter variable">-T</span> <span class="token parameter variable">-p</span> <span class="token number">443</span> git@ssh.github.com</span>
<span class="line"><span class="token operator">></span> Hi username<span class="token operator">!</span> You've successfully authenticated, but GitHub does not provide shell access.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果输出上面类似的消息， 证明此方法可以。</p>
<h3 id="启用通过-https-的-ssh-链接" tabindex="-1"><a class="header-anchor" href="#启用通过-https-的-ssh-链接"><span>启用通过 HTTPS 的 SSH 链接</span></a></h3>
<p>在端口 443 上通过 SSH 连接到 git@ssh.github.com 可行后， 则可以覆盖 SSH 设置以强制与 GitHub.com 的任何连接均通过该服务器和端口运行， 需要在 ~/.ssh/config 文件中添加如下配置：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">Host github.com</span>
<span class="line">Hostname ssh.github.com</span>
<span class="line">Port <span class="token number">443</span></span>
<span class="line">User <span class="token function">git</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="再次验证是否有效" tabindex="-1"><a class="header-anchor" href="#再次验证是否有效"><span>再次验证是否有效</span></a></h3>
<p>执行以下命令来验证 Git via HTTPS 的设置是否有效:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">$ <span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@github.com</span>
<span class="line"><span class="token operator">></span> Hi username<span class="token operator">!</span> You've successfully authenticated, but GitHub does not provide shell access.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h3>
<p>通过 Git via HTTPS 的方法， 可以保障 git ssh 正常运行， 不需启用 sshuttle 即可满足日常的开发需求。</p>
<h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>
<ul>
<li><a href="https://manateelazycat.github.io/2022/05/29/git-via-https/" target="_blank" rel="noopener noreferrer">Git via HTTPS</a></li>
</ul>
</div></template>


