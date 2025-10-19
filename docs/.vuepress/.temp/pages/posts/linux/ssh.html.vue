<template><div><ul>
<li><a href="#%E4%B8%80%E5%89%8D%E7%BD%AE%E6%9D%A1%E4%BB%B6">一、前置条件</a></li>
<li><a href="#%E4%BA%8C%E5%9F%BA%E7%A1%80%E8%BF%9E%E6%8E%A5%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95">二、基础连接：密码登录</a>
<ul>
<li><a href="#%E6%AD%A5%E9%AA%A4-1%E6%89%93%E5%BC%80%E6%9C%AC%E5%9C%B0%E7%BB%88%E7%AB%AF%E6%88%96-ssh-%E5%B7%A5%E5%85%B7">步骤 1：打开本地终端（或 SSH 工具）</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4-2%E6%89%A7%E8%A1%8C-ssh-%E8%BF%9E%E6%8E%A5%E5%91%BD%E4%BB%A4">步骤 2：执行 SSH 连接命令</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4-3%E7%A1%AE%E8%AE%A4%E8%BF%9E%E6%8E%A5%E5%B9%B6%E8%BE%93%E5%85%A5%E5%AF%86%E7%A0%81">步骤 3：确认连接并输入密码</a></li>
</ul>
</li>
<li><a href="#%E4%B8%89%E8%BF%9B%E9%98%B6%E5%AF%86%E9%92%A5%E7%99%BB%E5%BD%95%E6%9B%B4%E5%AE%89%E5%85%A8">三、进阶：密钥登录（更安全）</a>
<ul>
<li><a href="#%E6%AD%A5%E9%AA%A4-1%E6%9C%AC%E5%9C%B0%E7%94%9F%E6%88%90%E5%AF%86%E9%92%A5%E5%AF%B9">步骤 1：本地生成密钥对</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4-2%E5%B0%86%E5%85%AC%E9%92%A5%E4%B8%8A%E4%BC%A0%E5%88%B0%E8%BF%9C%E7%A8%8B%E6%9C%8D%E5%8A%A1%E5%99%A8">步骤 2：将公钥上传到远程服务器</a>
<ul>
<li><a href="#%E6%96%B9%E5%BC%8F-1%E4%BD%BF%E7%94%A8-ssh-copy-id-%E8%87%AA%E5%8A%A8%E4%B8%8A%E4%BC%A0%E6%8E%A8%E8%8D%90">方式 1：使用 <code v-pre>ssh-copy-id</code> 自动上传（推荐）</a></li>
<li><a href="#%E6%96%B9%E5%BC%8F-2%E6%89%8B%E5%8A%A8%E4%B8%8A%E4%BC%A0%E6%97%A0-ssh-copy-id-%E6%97%B6">方式 2：手动上传（无 <code v-pre>ssh-copy-id</code> 时）</a></li>
</ul>
</li>
<li><a href="#%E6%AD%A5%E9%AA%A4-3%E6%B5%8B%E8%AF%95%E5%AF%86%E9%92%A5%E7%99%BB%E5%BD%95">步骤 3：测试密钥登录</a></li>
</ul>
</li>
<li><a href="#%E5%9B%9B%E9%85%8D%E7%BD%AE%E5%88%AB%E5%90%8D">四、配置别名</a>
<ul>
<li><a href="#sshconfig%E6%96%87%E4%BB%B6">~/.ssh/config文件</a></li>
<li><a href="#%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A4">配置步骤</a></li>
</ul>
</li>
<li><a href="#%E4%BA%94%E5%B8%B8%E7%94%A8-ssh-%E5%91%BD%E4%BB%A4%E9%80%89%E9%A1%B9">五、常用 SSH 命令选项</a></li>
<li><a href="#%E5%85%AD%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3">六、常见问题与解决*</a></li>
<li><a href="#%E5%85%AD%E5%AE%89%E5%85%A8%E5%BB%BA%E8%AE%AE"><strong>六、安全建议</strong></a></li>
</ul>
<p>使用本地计算机通过 SSH 连接远程服务器是运维和开发的常见操作，以下是详细的步骤指南。</p>
<h3 id="一、前置条件" tabindex="-1"><a class="header-anchor" href="#一、前置条件"><span>一、前置条件</span></a></h3>
<ol>
<li>
<p><strong>远程服务器要求</strong></p>
<ul>
<li>已安装并运行 SSH 服务（默认端口为 22，服务名为 <code v-pre>sshd</code>）。</li>
<li>知道服务器的 <strong>公网 IP 地址/域名</strong>、<strong>登录用户名</strong>（如 <code v-pre>root</code> 或普通用户）及<strong>密码/密钥对</strong>。</li>
</ul>
</li>
<li>
<p><strong>本地计算机准备</strong></p>
<ul>
<li><strong>Linux/macOS</strong>：系统自带 SSH 客户端（终端直接使用）。</li>
<li><strong>Windows</strong>：
<ul>
<li>Windows 10/11 内置 OpenSSH 客户端（需在「设置→应用→可选功能」中启用）；</li>
<li>或使用第三方工具（如 https://www.putty.org/、https://mobaxterm.mobatek.net/）。</li>
</ul>
</li>
</ul>
</li>
</ol>
<h3 id="二、基础连接-密码登录" tabindex="-1"><a class="header-anchor" href="#二、基础连接-密码登录"><span>二、基础连接：密码登录</span></a></h3>
<h4 id="步骤-1-打开本地终端-或-ssh-工具" tabindex="-1"><a class="header-anchor" href="#步骤-1-打开本地终端-或-ssh-工具"><span>步骤 1：打开本地终端（或 SSH 工具）</span></a></h4>
<ul>
<li>Linux/macOS：直接使用「终端」（Terminal）。</li>
<li>Windows：使用 PowerShell、命令提示符（CMD）或 WSL 终端。</li>
</ul>
<h4 id="步骤-2-执行-ssh-连接命令" tabindex="-1"><a class="header-anchor" href="#步骤-2-执行-ssh-连接命令"><span>步骤 2：执行 SSH 连接命令</span></a></h4>
<p>格式：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">ssh</span> <span class="token punctuation">[</span>用户名<span class="token punctuation">]</span>@<span class="token punctuation">[</span>服务器IP/域名<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例（连接 IP 为 <code v-pre>192.168.1.100</code> 的服务器，用户名为 <code v-pre>ubuntu</code>）：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">ssh</span> ubuntu@192.168.1.100</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="步骤-3-确认连接并输入密码" tabindex="-1"><a class="header-anchor" href="#步骤-3-确认连接并输入密码"><span>步骤 3：确认连接并输入密码</span></a></h4>
<ul>
<li>首次连接时，会提示服务器的 SSH 指纹（用于防止中间人攻击），输入 <code v-pre>yes</code> 确认并缓存指纹：<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">The authenticity of host '192.168.1.100 (192.168.1.100)' can't be established.</span>
<span class="line">ECDSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.</span>
<span class="line">Are you sure you want to continue connecting (yes/no/[fingerprint])? yes</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>然后输入远程服务器用户的密码，即可登录。</li>
</ul>
<h3 id="三、进阶-密钥登录-更安全" tabindex="-1"><a class="header-anchor" href="#三、进阶-密钥登录-更安全"><span>三、进阶：密钥登录（更安全）</span></a></h3>
<p>密码登录存在被暴力破解风险，推荐使用**密钥对（公钥+私钥）**登录。</p>
<h4 id="步骤-1-本地生成密钥对" tabindex="-1"><a class="header-anchor" href="#步骤-1-本地生成密钥对"><span>步骤 1：本地生成密钥对</span></a></h4>
<p>在本地终端执行以下命令（默认生成 RSA 密钥，保存路径为 <code v-pre>~/.ssh/</code>）：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span>  <span class="token comment"># -t 指定算法，-b 指定密钥长度（RSA 建议至少 2048）</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>提示保存路径时，直接回车使用默认路径（<code v-pre>~/.ssh/id_rsa</code>）。</li>
<li>提示输入密码时，可留空（方便免密登录）或设置私钥密码（增强安全性）。</li>
</ul>
<p>生成后，本地会有两个文件：</p>
<ul>
<li>私钥（<code v-pre>~/.ssh/id_rsa</code>）：<strong>严格保密</strong>，用于身份验证。</li>
<li>公钥（<code v-pre>~/.ssh/id_rsa.pub</code>）：需上传到服务器。</li>
</ul>
<h4 id="步骤-2-将公钥上传到远程服务器" tabindex="-1"><a class="header-anchor" href="#步骤-2-将公钥上传到远程服务器"><span>步骤 2：将公钥上传到远程服务器</span></a></h4>
<p>有两种方式上传公钥：</p>
<h5 id="方式-1-使用-ssh-copy-id-自动上传-推荐" tabindex="-1"><a class="header-anchor" href="#方式-1-使用-ssh-copy-id-自动上传-推荐"><span>方式 1：使用 <code v-pre>ssh-copy-id</code> 自动上传（推荐）</span></a></h5>
<p>本地执行：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">ssh-copy-id <span class="token parameter variable">-i</span> ~/.ssh/id_rsa.pub <span class="token punctuation">[</span>用户名<span class="token punctuation">]</span>@<span class="token punctuation">[</span>服务器IP/域名<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">ssh-copy-id <span class="token parameter variable">-i</span> ~/.ssh/id_rsa.pub ubuntu@192.168.1.100</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>输入服务器密码后，公钥会自动追加到服务器的 <code v-pre>~/.ssh/authorized_keys</code> 文件中。</li>
</ul>
<h5 id="方式-2-手动上传-无-ssh-copy-id-时" tabindex="-1"><a class="header-anchor" href="#方式-2-手动上传-无-ssh-copy-id-时"><span>方式 2：手动上传（无 <code v-pre>ssh-copy-id</code> 时）</span></a></h5>
<ol>
<li>查看本地公钥内容：<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">cat</span> ~/.ssh/id_rsa.pub</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>复制输出的公钥字符串（以 <code v-pre>ssh-rsa</code> 开头）。</li>
<li>登录远程服务器，创建/编辑 <code v-pre>~/.ssh/authorized_keys</code> 文件：<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/.ssh  <span class="token comment"># 若目录不存在则创建</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">"复制的公钥内容"</span> <span class="token operator">>></span> ~/.ssh/authorized_keys</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>设置文件权限（关键！否则 SSH 可能拒绝读取）：<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">chmod</span> <span class="token number">700</span> ~/.ssh       <span class="token comment"># 目录权限为 700</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token number">600</span> ~/.ssh/authorized_keys  <span class="token comment"># 公钥文件权限为 600</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="步骤-3-测试密钥登录" tabindex="-1"><a class="header-anchor" href="#步骤-3-测试密钥登录"><span>步骤 3：测试密钥登录</span></a></h4>
<p>再次执行 SSH 连接命令，若无需输入密码直接登录，则配置成功：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">ssh</span> ubuntu@192.168.1.100</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="四、配置别名" tabindex="-1"><a class="header-anchor" href="#四、配置别名"><span>四、配置别名</span></a></h3>
<h4 id="ssh-config文件" tabindex="-1"><a class="header-anchor" href="#ssh-config文件"><span>~/.ssh/config文件</span></a></h4>
<p>SSH 客户端通过读取 ~/.ssh/config文件（用户级配置）或 /etc/ssh/ssh_config（系统级配置）来应用自定义连接规则。</p>
<p>该文件支持按别名分组配置，每个配置块以 Host关键字开头，定义特定主机的连接参数（如真实 IP、用户名、端口、私钥等）。</p>
<h4 id="配置步骤" tabindex="-1"><a class="header-anchor" href="#配置步骤"><span>配置步骤</span></a></h4>
<ol>
<li>创建/编辑配置文件
如果 <code v-pre>~/.ssh/config</code> 不存在，手动创建并设置权限（必须为 <code v-pre>600</code>，否则 SSH 会忽略该文件）：</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 进入 .ssh 目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> ~/.ssh</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建 config 文件（若不存在）</span></span>
<span class="line"><span class="token function">touch</span> config</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置权限（重要！）</span></span>
<span class="line"><span class="token function">chmod</span> <span class="token number">600</span> config</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用文本编辑器（如 <code v-pre>vim</code>、<code v-pre>nano</code>）打开文件：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">vim</span> ~/.ssh/config  <span class="token comment"># 或 nano ~/.ssh/config</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="2">
<li>配置别名和用户名
在 <code v-pre>config</code> 文件中，通过 <code v-pre>Host</code> 定义别名，<code v-pre>HostName</code> 定义真实 IP/域名，<code v-pre>User</code> 定义默认用户名。</li>
</ol>
<p><strong>示例：为远程服务器配置别名</strong><br>
假设需要连接：</p>
<ul>
<li>真实 IP：<code v-pre>192.168.1.100</code></li>
<li>默认用户名：<code v-pre>ubuntu</code></li>
<li>端口：<code v-pre>22</code>（默认可省略）</li>
</ul>
<p>在 <code v-pre>config</code> 文件中添加以下内容：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 主机别名：myserver（可以用任意易记的名称）</span></span>
<span class="line">Host myserver</span>
<span class="line">  <span class="token comment"># 真实 IP 或域名</span></span>
<span class="line">  HostName <span class="token number">192.168</span>.1.100</span>
<span class="line">  <span class="token comment"># 默认登录用户名（可选，不指定则用当前本地用户名）</span></span>
<span class="line">  User ubuntu</span>
<span class="line">  <span class="token comment"># 可选：指定 SSH 端口（非默认 22 时需要）</span></span>
<span class="line">  <span class="token comment"># Port 2222</span></span>
<span class="line">  <span class="token comment"># 可选：指定私钥路径（密钥登录时使用）</span></span>
<span class="line">  <span class="token comment"># IdentityFile ~/.ssh/id_rsa_custom</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多服务器配置示例</strong>（添加第二个服务器）：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">Host dbserver       <span class="token comment"># 别名：dbserver</span></span>
<span class="line">  HostName <span class="token number">10.0</span>.0.5  <span class="token comment"># 真实 IP</span></span>
<span class="line">  User root          <span class="token comment"># 默认用户名</span></span>
<span class="line">  Port <span class="token number">22</span>            <span class="token comment"># 端口（默认可省略）</span></span>
<span class="line"></span>
<span class="line">Host github         <span class="token comment"># 别名：github（用于 Git SSH 连接）</span></span>
<span class="line">  HostName github.com</span>
<span class="line">  User <span class="token function">git</span></span>
<span class="line">  IdentityFile ~/.ssh/id_rsa_github  <span class="token comment"># GitHub 专用私钥</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>
<p>保存并生效
保存 <code v-pre>config</code> 文件后，SSH 客户端会自动读取配置。无需重启服务，直接使用别名连接即可。</p>
</li>
<li>
<p>验证配置是否生效</p>
</li>
</ol>
<ul>
<li>方法 1：直接使用别名连接<br>
执行 <code v-pre>ssh myserver</code>（对应配置中的 <code v-pre>Host myserver</code>），SSH 会自动替换为：</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">ssh</span> ubuntu@192.168.1.100  <span class="token comment"># 等同于原命令</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>方法 2：查看配置解析结果<br>
使用 <code v-pre>ssh -G 别名</code> 命令查看 SSH 客户端解析后的完整连接参数：</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">ssh</span> <span class="token parameter variable">-G</span> myserver</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出会显示解析后的 <code v-pre>user</code>、<code v-pre>hostname</code>、<code v-pre>port</code> 等信息，确认配置正确。</p>
<ol start="5">
<li>其他常用配置选项
除了 <code v-pre>Host</code>、<code v-pre>HostName</code>、<code v-pre>User</code>，还可以添加以下参数优化连接：</li>
</ol>
<table>
<thead>
<tr>
<th>配置项</th>
<th>说明</th>
<th>示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>Port</code></td>
<td>指定 SSH 端口（默认 22）</td>
<td><code v-pre>Port 2222</code></td>
</tr>
<tr>
<td><code v-pre>IdentityFile</code></td>
<td>指定私钥文件路径（密钥登录时使用）</td>
<td><code v-pre>IdentityFile ~/.ssh/id_rsa</code></td>
</tr>
<tr>
<td><code v-pre>ForwardAgent</code></td>
<td>启用 SSH 代理转发（用于访问其他服务器）</td>
<td><code v-pre>ForwardAgent yes</code></td>
</tr>
<tr>
<td><code v-pre>ServerAliveInterval</code></td>
<td>保持连接活跃（防止超时断开）</td>
<td><code v-pre>ServerAliveInterval 60</code></td>
</tr>
<tr>
<td><code v-pre>Compression</code></td>
<td>启用压缩（适合低带宽网络）</td>
<td><code v-pre>Compression yes</code></td>
</tr>
</tbody>
</table>
<h3 id="五、常用-ssh-命令选项" tabindex="-1"><a class="header-anchor" href="#五、常用-ssh-命令选项"><span>五、常用 SSH 命令选项</span></a></h3>
<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
<th>示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>-p &lt;端口&gt;</code></td>
<td>指定 SSH 端口（默认 22）</td>
<td><code v-pre>ssh -p 2222 user@server</code></td>
</tr>
<tr>
<td><code v-pre>-i &lt;私钥&gt;</code></td>
<td>指定私钥文件（默认 <code v-pre>~/.ssh/id_rsa</code>）</td>
<td><code v-pre>ssh -i ~/.ssh/custom_key user@server</code></td>
</tr>
<tr>
<td><code v-pre>-v</code></td>
<td>启用调试模式（查看连接细节）</td>
<td><code v-pre>ssh -v user@server</code></td>
</tr>
<tr>
<td><code v-pre>-L</code></td>
<td>本地端口转发</td>
<td><code v-pre>ssh -L 8080:localhost:80 user@server</code></td>
</tr>
</tbody>
</table>
<h3 id="六、常见问题与解决" tabindex="-1"><a class="header-anchor" href="#六、常见问题与解决"><span>六、常见问题与解决*</span></a></h3>
<ol>
<li>
<p><strong>连接超时（无法访问）</strong></p>
<ul>
<li>检查服务器 IP/域名是否正确。</li>
<li>确认服务器 SSH 服务已启动（远程服务器执行 <code v-pre>systemctl status sshd</code> 检查状态）。</li>
<li>防火墙是否放行 22 端口（远程服务器执行 <code v-pre>ufw allow 22</code> 或 <code v-pre>iptables</code> 规则）。</li>
</ul>
</li>
<li>
<p><strong>权限拒绝（密码错误或密钥无效）</strong></p>
<ul>
<li>密码登录时，确认密码输入正确（注意大小写）。</li>
<li>密钥登录时，检查服务器 <code v-pre>~/.ssh/authorized_keys</code> 文件是否包含公钥，且权限是否正确（<code v-pre>.ssh</code> 目录 700，<code v-pre>authorized_keys</code> 600）。</li>
</ul>
</li>
<li>
<p><strong>Windows 无法连接</strong></p>
<ul>
<li>确认 OpenSSH 客户端已启用（通过「设置→应用→可选功能」检查）。</li>
<li>或使用 PuTTY：输入服务器 IP 和端口，加载私钥（需转换为 <code v-pre>.ppk</code> 格式，可用 <code v-pre>puttygen</code> 转换）。</li>
</ul>
</li>
</ol>
<h3 id="六、安全建议" tabindex="-1"><a class="header-anchor" href="#六、安全建议"><span><strong>六、安全建议</strong></span></a></h3>
<ul>
<li>禁用密码登录（仅允许密钥）：修改服务器 <code v-pre>/etc/ssh/sshd_config</code>，设置 <code v-pre>PasswordAuthentication no</code>，然后重启 <code v-pre>sshd</code> 服务（<code v-pre>systemctl restart sshd</code>）。</li>
<li>修改默认 SSH 端口（如 2222）：编辑 <code v-pre>sshd_config</code> 中的 <code v-pre>Port</code> 字段，减少暴力破解风险。</li>
<li>定期更新 SSH 服务版本，修复安全漏洞。</li>
</ul>
</div></template>


