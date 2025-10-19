<template><div><ul>
<li><a href="#problem-access-denied-for-user-rootlocalhost-using-password-yes">Problem: Access denied for user 'root'@'localhost' (using password: YES)</a>
<ul>
<li><a href="#option-1-using-mysql-installer-recommended-for-windows">Option 1: Using MySQL Installer (Recommended for Windows)</a></li>
<li><a href="#option-2-safe-mode-reset">Option 2: Safe Mode Reset</a></li>
<li><a href="#option-3">Option 3</a></li>
</ul>
</li>
</ul>
<h2 id="problem-access-denied-for-user-root-localhost-using-password-yes" tabindex="-1"><a class="header-anchor" href="#problem-access-denied-for-user-root-localhost-using-password-yes"><span>Problem: Access denied for user 'root'@'localhost' (using password: YES)</span></a></h2>
<p>需要修改密码</p>
<h3 id="option-1-using-mysql-installer-recommended-for-windows" tabindex="-1"><a class="header-anchor" href="#option-1-using-mysql-installer-recommended-for-windows"><span>Option 1: Using MySQL Installer (Recommended for Windows)</span></a></h3>
<ol>
<li>Open MySQL Installer from Start Menu</li>
<li>Click &quot;Reconfigure&quot; next to MySQL Server</li>
<li>Follow the wizard to reset root password</li>
</ol>
<h3 id="option-2-safe-mode-reset" tabindex="-1"><a class="header-anchor" href="#option-2-safe-mode-reset"><span>Option 2: Safe Mode Reset</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Stop MySQL service</span></span>
<span class="line">net stop mysql80</span>
<span class="line"><span class="token comment"># 或者 此电脑->管理->服务->MySQL80，右键选择停止</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start MySQL in safe mode (skip grant tables)</span></span>
<span class="line"><span class="token comment"># 8.0以下</span></span>
<span class="line">mysqld --skip-grant-tables --skip-networking</span>
<span class="line"><span class="token comment"># 8.0以上</span></span>
<span class="line">mysqld <span class="token parameter variable">--console</span> --skip-grant-tables --shared-memory</span>
<span class="line"></span>
<span class="line"><span class="token comment"># In a new command prompt</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在 mysql 面板中 依次执行以下命令</span></span>
<span class="line">mysql<span class="token operator">></span> FLUSH PRIVILEGES<span class="token punctuation">;</span></span>
<span class="line">mysql<span class="token operator">></span> ALTER <span class="token environment constant">USER</span> <span class="token string">'root'</span>@<span class="token string">'localhost'</span> IDENTIFIED BY <span class="token string">'your_new_password'</span><span class="token punctuation">;</span></span>
<span class="line">mysql<span class="token operator">></span> FLUSH PRIVILEGES<span class="token punctuation">;</span></span>
<span class="line">mysql<span class="token operator">></span> EXIT<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Restart MySQL normally</span></span>
<span class="line">net start mysql80</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check your_new_password</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实测无效，可以用以下命令试试</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">mysql> use mysql;</span>
<span class="line">mysql> update user set password=password("your_new_password") where user="root";</span>
<span class="line">mysql> FLUSH PRIVILEGES;</span>
<span class="line">mysql> EXIT;</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="option-3" tabindex="-1"><a class="header-anchor" href="#option-3"><span>Option 3</span></a></h3>
<ol>
<li>打开 此电脑-&gt;管理-&gt;服务-&gt;MySQL80，右键点击属性找到 mysql 的 my.ini 文件路径</li>
<li>在 my.ini 所在目录，新建 init_pwd.txt 文件。内容</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">ALTER user root@<span class="token string">'localhost'</span> identified by <span class="token string">'your_new_password'</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="3">
<li>停止 mysql 服务，<code v-pre>net stop mysql</code> 或者 通过 windows 服务停止MySQL80</li>
<li>重新初始化 mysql</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysqld --defaults-file<span class="token operator">=</span><span class="token string">"D:\MySQL\MySQL Server 8.0\my.ini"</span> --init-file<span class="token operator">=</span><span class="token string">"D:\MySQL\MySQL Server 8.0\init_pwd.txt"</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>此命令会删除数据库，需要先备份</p>
</blockquote>
<ol start="5">
<li>执行后，一直卡在那里，执行 ctrl+c 退出</li>
<li>重新启动 mysql 服务，可以用新密码登录了</li>
</ol>
</div></template>


