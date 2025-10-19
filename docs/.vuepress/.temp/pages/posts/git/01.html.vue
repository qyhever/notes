<template><div><ul>
<li><a href="#ssh%E9%85%8D%E7%BD%AE">ssh配置</a></li>
<li><a href="#%E6%8B%89%E5%8F%96">拉取</a></li>
<li><a href="#%E9%85%8D%E7%BD%AE">配置</a></li>
<li><a href="#%E6%9A%82%E5%AD%98">暂存</a></li>
<li><a href="#%E6%8F%90%E4%BA%A4">提交</a></li>
<li><a href="#%E6%8E%A8%E9%80%81">推送</a></li>
<li><a href="#%E5%88%86%E6%94%AF">分支</a></li>
<li><a href="#%E5%B8%B8%E8%A7%81%E5%BC%82%E5%B8%B8">常见异常</a>
<ul>
<li><a href="#crlflf%E8%AD%A6%E5%91%8A">CRLF/LF警告</a>
<ul>
<li><a href="#%E7%97%87%E7%8A%B6">症状</a></li>
<li><a href="#%E4%BB%93%E5%BA%93%E7%BA%A7%E9%85%8D%E7%BD%AE">仓库级配置</a></li>
<li><a href="#%E6%9B%B4%E7%A8%B3%E5%A6%A5%E7%9A%84%E5%81%9A%E6%B3%95">更稳妥的做法</a></li>
<li><a href="#%E5%B7%B2%E6%9C%89%E6%96%87%E4%BB%B6%E6%8C%89%E8%A7%84%E5%88%99%E9%87%8D%E6%96%B0%E8%A7%84%E8%8C%83%E5%8C%96">已有文件按规则重新规范化</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="ssh配置" tabindex="-1"><a class="header-anchor" href="#ssh配置"><span>ssh配置</span></a></h2>
<ul>
<li><code v-pre>ssh-keygen -t rsa -C &quot;selector@gmail.com&quot;</code>,按3个回车，密码为空</li>
<li>打开C:/用户/用户名/.ssh/.pub，添加到https://github.com/settings/keys</li>
</ul>
<h2 id="拉取" tabindex="-1"><a class="header-anchor" href="#拉取"><span>拉取</span></a></h2>
<p>初始化 git 仓库</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> init</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>clone 仓库</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># --depth=1 只拉取近一次的提交记录</span></span>
<span class="line"><span class="token function">git</span> clone 项目远程地址 <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span> 项目名</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> config user.name <span class="token string">'用户名'</span></span>
<span class="line"><span class="token function">git</span> config user.email <span class="token string">'邮箱'</span></span>
<span class="line"><span class="token function">git</span> config core.autocrlf</span>
<span class="line"><span class="token function">git</span> config core.eol</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看全部配置信息</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--list</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">-l</span></span>
<span class="line"><span class="token comment"># 查看指定配置</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--get</span> key</span>
<span class="line"><span class="token function">git</span> config key</span>
<span class="line"><span class="token comment"># 修改指定配置</span></span>
<span class="line"><span class="token function">git</span> config key value</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上 --global 参数可查看或修改全局配置</p>
<h2 id="暂存" tabindex="-1"><a class="header-anchor" href="#暂存"><span>暂存</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token operator">&lt;</span>file<span class="token operator">></span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看状态(添加,提交完之后可以查看文件是否修改,提交等)</span></span>
<span class="line"><span class="token function">git</span> status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销</span></span>
<span class="line"><span class="token function">git</span> reset HEAD <span class="token operator">&lt;</span>file<span class="token operator">></span></span>
<span class="line"><span class="token function">git</span> reset HEAD</span>
<span class="line"><span class="token comment"># 取消暂存</span></span>
<span class="line"><span class="token function">git</span> restore <span class="token parameter variable">--staged</span> <span class="token operator">&lt;</span>file<span class="token operator">></span></span>
<span class="line"><span class="token function">git</span> restore <span class="token parameter variable">--staged</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token comment"># 从索引中移除已追踪文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token operator">&lt;</span>file<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="提交" tabindex="-1"><a class="header-anchor" href="#提交"><span>提交</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 会打开 vi 界面</span></span>
<span class="line"><span class="token function">git</span> commit</span>
<span class="line"><span class="token comment"># 直接提交</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"commit msg"</span></span>
<span class="line"><span class="token comment"># 提交记录</span></span>
<span class="line"><span class="token function">git</span> log</span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span></span>
<span class="line"><span class="token comment"># 修改最后一次提交信息</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span></span>
<span class="line"><span class="token comment"># 撤销未推送提交，但保留改动在工作区</span></span>
<span class="line"><span class="token function">git</span> reset HEAD~1</span>
<span class="line"><span class="token comment"># 或 git reset --mixed HEAD~1</span></span>
<span class="line"><span class="token comment"># 撤销未推送提交，但保留改动在暂存区</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD~1</span>
<span class="line"><span class="token comment"># 完全撤销提交</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1</span>
<span class="line"><span class="token comment"># 撤销已推送提交，不会重写历史，历史记录保留原始提交和撤销提交</span></span>
<span class="line"><span class="token function">git</span> revert <span class="token operator">&lt;</span>commit-hash<span class="token operator">></span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="推送" tabindex="-1"><a class="header-anchor" href="#推送"><span>推送</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> push</span>
<span class="line"><span class="token comment"># 强制推送</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--force</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分支" tabindex="-1"><a class="header-anchor" href="#分支"><span>分支</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 查看分支</span></span>
<span class="line"><span class="token function">git</span> branch</span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-a</span></span>
<span class="line"><span class="token comment"># 新建分支</span></span>
<span class="line"><span class="token function">git</span> branch new-branch-name</span>
<span class="line"><span class="token comment"># 或者新建分支，并切换到该分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> new-branch-name</span>
<span class="line"><span class="token comment"># 切换分支</span></span>
<span class="line"><span class="token function">git</span> checkout branch-name</span>
<span class="line"><span class="token comment"># 或者更现代的</span></span>
<span class="line"><span class="token function">git</span> switch branch-name</span>
<span class="line"><span class="token comment"># 推送新的分支</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin new-branch-name</span>
<span class="line"><span class="token comment"># 删除分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> old-branch-name</span>
<span class="line"><span class="token comment"># 强制删除，比如即使该分支还没有被合并</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-D</span> old-branch-name</span>
<span class="line"><span class="token comment"># 切换分支之前有未提交更改，应该先提交或stash</span></span>
<span class="line"><span class="token function">git</span> stash</span>
<span class="line"><span class="token comment"># 切换回来后，来恢复之前的工作状态</span></span>
<span class="line"><span class="token function">git</span> stash pop</span>
<span class="line"><span class="token comment"># 合并分支</span></span>
<span class="line"><span class="token function">git</span> merge branch-name</span>
<span class="line"><span class="token comment"># 取消合并</span></span>
<span class="line"><span class="token function">git</span> merge <span class="token parameter variable">--abort</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常见异常" tabindex="-1"><a class="header-anchor" href="#常见异常"><span>常见异常</span></a></h2>
<h3 id="crlf-lf警告" tabindex="-1"><a class="header-anchor" href="#crlf-lf警告"><span>CRLF/LF警告</span></a></h3>
<h4 id="症状" tabindex="-1"><a class="header-anchor" href="#症状"><span>症状</span></a></h4>
<ul>
<li>Windows上提示：<code v-pre>LF will be replaced by CRLF</code></li>
<li>macOS/Linux上提示：<code v-pre>CRLF will be replaced by LF</code>
原因是不同平台换行符不一致</li>
</ul>
<h4 id="仓库级配置" tabindex="-1"><a class="header-anchor" href="#仓库级配置"><span>仓库级配置</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Windows</span></span>
<span class="line"><span class="token function">git</span> config core.autocrlf <span class="token boolean">true</span></span>
<span class="line"><span class="token comment"># macOS/Linux</span></span>
<span class="line"><span class="token function">git</span> config core.autocrlf input</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="更稳妥的做法" tabindex="-1"><a class="header-anchor" href="#更稳妥的做法"><span>更稳妥的做法</span></a></h4>
<p>用 .gitattributes 固定文本行为</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 统一文本文件为 LF</span></span>
<span class="line">* <span class="token assign-left variable">text</span><span class="token operator">=</span>auto <span class="token assign-left variable">eol</span><span class="token operator">=</span>lf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保持二进制原文件</span></span>
<span class="line">*.png    binary</span>
<span class="line">*.jpg    binary</span>
<span class="line">*.jpeg   binary</span>
<span class="line"><span class="token comment"># more...</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="已有文件按规则重新规范化" tabindex="-1"><a class="header-anchor" href="#已有文件按规则重新规范化"><span>已有文件按规则重新规范化</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">--renormalize</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"fix: normalize line endings to LF"</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


