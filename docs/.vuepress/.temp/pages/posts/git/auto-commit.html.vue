<template><div><ul>
<li><a href="#nodejs">nodejs</a></li>
<li><a href="#bash">bash</a></li>
</ul>
<h3 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs"><span>nodejs</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> execSync <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'child_process'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token punctuation">,</span> <span class="token punctuation">,</span> commitTitle<span class="token punctuation">]</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>argv</span>
<span class="line">  <span class="token keyword">const</span> commands <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">'git add .'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">git commit -m "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>commitTitle <span class="token operator">||</span> <span class="token string">'commit '</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocaleString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">'git pull'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">'git push'</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line">  <span class="token function">execSync</span><span class="token punctuation">(</span>commands<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">' &amp;&amp; '</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">stdio</span><span class="token operator">:</span> <span class="token string">'inherit'</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'error: '</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bash" tabindex="-1"><a class="header-anchor" href="#bash"><span>bash</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 保留所有 Git 命令的输出（stdout 和 stderr）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取提交标题（第一个参数）</span></span>
<span class="line"><span class="token assign-left variable">commit_title</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$1</span>"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置默认提交信息（如果未提供标题）</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$commit_title</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">  <span class="token assign-left variable">commit_title</span><span class="token operator">=</span><span class="token string">"commit: <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">'%Y-%m-%d %H:%M:%S'</span><span class="token variable">)</span></span>"</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 定义要执行的 Git 命令序列（用 &amp;&amp; 连接，任意一步失败则终止）</span></span>
<span class="line"><span class="token assign-left variable">commands</span><span class="token operator">=</span><span class="token punctuation">(</span></span>
<span class="line">  <span class="token string">'git config user.name'</span>                <span class="token comment"># 获取/设置用户名（继承输出）</span></span>
<span class="line">  <span class="token string">'git config user.email'</span>               <span class="token comment"># 获取/设置邮箱（继承输出）</span></span>
<span class="line">  <span class="token string">'git add .'</span>                           <span class="token comment"># 暂存所有变更（继承输出）</span></span>
<span class="line">  <span class="token string">"git commit -m <span class="token entity" title="\&quot;">\"</span><span class="token variable">$commit_title</span><span class="token entity" title="\&quot;">\"</span>"</span>     <span class="token comment"># 创建提交（继承输出）</span></span>
<span class="line">  <span class="token string">'git pull'</span>                            <span class="token comment"># 拉取远程更新（继承输出）</span></span>
<span class="line">  <span class="token string">'git push'</span>                            <span class="token comment"># 推送本地提交（继承输出）</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行命令序列（stdio 继承父进程，保留所有输出）</span></span>
<span class="line"><span class="token function-name function">try</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token builtin class-name">local</span> cmd</span>
<span class="line">  <span class="token keyword">for</span> <span class="token for-or-select variable">cmd</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">${commands<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>"</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">"🚀 执行命令: <span class="token variable">$cmd</span>"</span>  <span class="token comment"># 可选：提示当前执行的命令（非必须）</span></span>
<span class="line">    <span class="token builtin class-name">eval</span> <span class="token string">"<span class="token variable">$cmd</span>"</span> <span class="token operator">||</span> <span class="token builtin class-name">return</span> <span class="token number">1</span>   <span class="token comment"># 任意命令失败则终止并返回错误</span></span>
<span class="line">  <span class="token keyword">done</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 捕获执行结果</span></span>
<span class="line"><span class="token keyword">if</span> try<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">"✅ 所有操作成功完成！"</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">"❌ 操作失败（具体错误已在上方输出）"</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span></span>
<span class="line">  <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


