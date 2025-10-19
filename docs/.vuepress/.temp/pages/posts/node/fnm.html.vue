<template><div><ul>
<li><a href="#fnm">fnm</a>
<ul>
<li><a href="#%E6%89%8B%E5%8A%A8%E5%AE%89%E8%A3%85">手动安装</a></li>
<li><a href="#%E9%85%8D%E7%BD%AE-fnm">配置 fnm</a>
<ul>
<li><a href="#git-bash">git bash</a></li>
<li><a href="#powershell">powershell</a></li>
<li><a href="#cmd">cmd</a></li>
</ul>
</li>
<li><a href="#%E5%8F%82%E8%80%83">参考</a></li>
</ul>
</li>
</ul>
<h2 id="fnm" tabindex="-1"><a class="header-anchor" href="#fnm"><span>fnm</span></a></h2>
<p><a href="https://github.com/Schniz/fnm" target="_blank" rel="noopener noreferrer">fnm</a> 是一个跨平台的 Node.js 版本管理器，支持 Windows 并能自动识别 .nvmrc 文件</p>
<h3 id="手动安装" tabindex="-1"><a class="header-anchor" href="#手动安装"><span>手动安装</span></a></h3>
<ol>
<li>访问 <a href="https://github.com/Schniz/fnm/releases" target="_blank" rel="noopener noreferrer">fnm releases</a> 页面</li>
<li>下载 fnm-windows.zip</li>
<li>解压到某个目录（如 d:\fnm）</li>
<li>按WIN+R，打开【运行】对话框，输入sysdm.cpl，点【确定】按钮，打开高级系统设置-&gt;环境变量</li>
<li>将该目录新增为系统变量 FNM_DIR</li>
<li>将 FNM_DIR 添加到系统 PATH 环境变量</li>
</ol>
<h3 id="配置-fnm" tabindex="-1"><a class="header-anchor" href="#配置-fnm"><span>配置 fnm</span></a></h3>
<h4 id="git-bash" tabindex="-1"><a class="header-anchor" href="#git-bash"><span>git bash</span></a></h4>
<p>把以下内容复制到 <code v-pre>C:\Users\你的用户名\.bashrc</code> 中，没有则新建</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># fnm 环境设置</span></span>
<span class="line"><span class="token comment"># export PATH="/d/fnm:$PATH"</span></span>
<span class="line"><span class="token comment"># export FNM_DIR="/d/fnm"</span></span>
<span class="line"><span class="token comment"># export FNM_NODE_DIST_MIRROR="https://npmmirror.com/mirrors/node"</span></span>
<span class="line"><span class="token comment"># export FNM_MULTISHELL_PATH="$APPDATA/fnm_multishells"</span></span>
<span class="line"><span class="token comment"># export FNM_VERSION_FILE_STRATEGY=local</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 加载 fnm</span></span>
<span class="line"><span class="token builtin class-name">eval</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>fnm <span class="token function">env</span> --use-on-cd<span class="token variable">)</span></span>"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再运行以下命令让 .bashrc 生效</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">source</span> ~/.bashrc</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="powershell" tabindex="-1"><a class="header-anchor" href="#powershell"><span>powershell</span></a></h4>
<p>按 &quot;Windows 图标键 + X&quot; -&gt; 选择 &quot;终端管理员&quot; 打开。<br>
在打开的 “终端管理员” 窗口中执行以下命令。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>-not <span class="token punctuation">(</span>Test-Path <span class="token variable">$profile</span><span class="token punctuation">))</span> <span class="token punctuation">{</span> New-Item <span class="token variable">$profile</span> <span class="token parameter variable">-Force</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>执行完成后，会在系统的 “文档” 目录下创建一个 WindowsPowerShell 文件夹，并在这个文件夹里面创建了 Microsoft.PowerShell_profile.ps1 文件。<br>
然后在 “管理员终端” 中执行下面的命令编辑上一步创建的 Microsoft.PowerShell_profile.ps1 文件。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">Invoke-Item <span class="token variable">$profile</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>上面的命令会自动打开 Microsoft.PowerShell_profile.ps1 文件。在打开的 Microsoft.PowerShell_profile.ps1 文件中 里面添加如下内容，然后保存文件。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">fnm <span class="token function">env</span> --use-on-cd <span class="token parameter variable">--shell</span> powershell <span class="token operator">|</span> Out-String <span class="token operator">|</span> Invoke-Expression</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 “管理员终端” 中执行以下命令，以便系统有权限加载上面的 Microsoft.PowerShell_profile.ps1 文件。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">set-executionpolicy remotesigned</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd"><span>cmd</span></a></h4>
<p>最简单粗暴方法，执行<code v-pre>fnm env</code>，在输出内容中找到变量 <code v-pre>FNM_MULTISHELL_PATH</code> 的值，添加到系统变量 <code v-pre>FNM_MULTISHELL_PATH</code> 中，将该变量添加到系统 PATH 环境变量</p>
<h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h3>
<ul>
<li><a href="https://blog.csdn.net/ctrlshiftalta/article/details/142408516" target="_blank" rel="noopener noreferrer">1</a></li>
<li><a href="https://blog.csdn.net/weixin_45410468/article/details/144755143" target="_blank" rel="noopener noreferrer">2</a></li>
</ul>
</div></template>


