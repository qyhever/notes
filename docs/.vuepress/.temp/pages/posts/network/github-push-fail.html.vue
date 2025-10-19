<template><div><ul>
<li><a href="#%E7%97%87%E7%8A%B6">症状</a></li>
<li><a href="#%E5%8F%AF%E8%83%BD%E7%9A%84%E5%8E%9F%E5%9B%A0%E5%92%8C%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95">可能的原因和解决方法</a>
<ul>
<li><a href="#%E6%9C%BA%E5%9C%BA%E6%A8%A1%E5%BC%8F%E9%80%89%E6%8B%A9%E4%B8%8D%E5%AF%B9%E5%8F%AF%E4%BB%A5%E8%AF%95%E8%AF%95-tun-%E6%A8%A1%E5%BC%8F">机场模式选择不对，可以试试 tun 模式</a></li>
<li><a href="#%E6%9C%BA%E5%9C%BA%E6%9C%8D%E5%8A%A1%E5%95%86%E6%8A%8A-ssh-%E5%8D%8F%E8%AE%AE-or-22-%E7%AB%AF%E5%8F%A3%E5%B0%81%E4%BA%86%E9%9C%80%E8%A6%81%E8%AE%BE%E7%BD%AE%E4%B8%8B-git-via-https">机场服务商把 ssh 协议 or 22 端口封了，需要设置下 git via https</a></li>
<li><a href="#git-config-proxy">git config proxy</a></li>
<li><a href="#%E5%91%BD%E4%BB%A4%E8%A1%8C-proxy">命令行 proxy</a></li>
<li><a href="#%E4%BB%93%E5%BA%93%E7%9B%AE%E5%BD%95%E4%B8%8B%E6%89%A7%E8%A1%8C-git-config---local--e-%E5%BC%B9%E5%87%BA%E6%96%87%E4%BB%B6%E7%BC%96%E8%BE%91gitgithubcom%E6%94%B9%E4%B8%BA-httpsgithubcom">仓库目录下执行 git config --local -e ，弹出文件编辑，git@github.com:改为 https://github.com/</a></li>
</ul>
</li>
<li><a href="#reference">Reference</a></li>
</ul>
<h2 id="症状" tabindex="-1"><a class="header-anchor" href="#症状"><span>症状</span></a></h2>
<p>本地浏览器可以访问，但是 push 代码超时。<br>
阿里云服务器也无法 clone 代码。</p>
<p>proxy 用的小猫咪，异常信息：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> push origin main</span>
<span class="line">Connection closed by <span class="token number">127.0</span>.0.1 port <span class="token number">7890</span></span>
<span class="line">fatal: Could not <span class="token builtin class-name">read</span> from remote repository.</span>
<span class="line"></span>
<span class="line">Please <span class="token function">make</span> sure you have the correct access rights</span>
<span class="line">and the repository exists.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可能的原因和解决方法" tabindex="-1"><a class="header-anchor" href="#可能的原因和解决方法"><span>可能的原因和解决方法</span></a></h2>
<h3 id="机场模式选择不对-可以试试-tun-模式" tabindex="-1"><a class="header-anchor" href="#机场模式选择不对-可以试试-tun-模式"><span>机场模式选择不对，可以试试 tun 模式</span></a></h3>
<h3 id="机场服务商把-ssh-协议-or-22-端口封了-需要设置下-git-via-https" tabindex="-1"><a class="header-anchor" href="#机场服务商把-ssh-协议-or-22-端口封了-需要设置下-git-via-https"><span>机场服务商把 ssh 协议 or 22 端口封了，需要设置下 git via https</span></a></h3>
<p>ssh config 里加上</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">Host github.com</span>
<span class="line">HostName ssh.github.com</span>
<span class="line">Port <span class="token number">443</span></span>
<span class="line">User <span class="token function">git</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port#enabling-ssh-connections-over-https" target="_blank" rel="noopener noreferrer">GitHub Docs using-ssh-over-the-https-port</a></p>
<h3 id="git-config-proxy" tabindex="-1"><a class="header-anchor" href="#git-config-proxy"><span>git config proxy</span></a></h3>
<p>浏览器连 github 是走 https 连接, push 是走 ssh
git 本地代理设置好就可以</p>
<h3 id="命令行-proxy" tabindex="-1"><a class="header-anchor" href="#命令行-proxy"><span>命令行 proxy</span></a></h3>
<p>proxy='export https_proxy=http://127.0.0.1:7890;export http_proxy=http://127.0.0.1:7890;export all_proxy=socks5://127.0.0.1:7890'</p>
<p>unproxy='unset https_proxy http_proxy all_proxy'</p>
<h3 id="仓库目录下执行-git-config-local-e-弹出文件编辑-git-github-com-改为-https-github-com" tabindex="-1"><a class="header-anchor" href="#仓库目录下执行-git-config-local-e-弹出文件编辑-git-github-com-改为-https-github-com"><span>仓库目录下执行 git config --local -e ，弹出文件编辑，git@github.com:改为 https://github.com/</span></a></h3>
<h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>
<ul>
<li><a href="https://www.v2ex.com/t/1155542" target="_blank" rel="noopener noreferrer">v2ex-大家 github 还能 push 代码吗？</a></li>
</ul>
</div></template>


