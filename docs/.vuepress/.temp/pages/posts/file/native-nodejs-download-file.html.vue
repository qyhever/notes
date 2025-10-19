<template><div><ul>
<li><a href="#%E5%8E%9F%E7%94%9F-nodejs-%E4%B8%8B%E8%BD%BD">原生 nodejs 下载</a>
<ul>
<li><a href="#%E9%A2%84%E8%A7%88">预览</a></li>
<li><a href="#%E4%B8%8B%E8%BD%BD">下载</a></li>
</ul>
</li>
</ul>
<h2 id="原生-nodejs-下载" tabindex="-1"><a class="header-anchor" href="#原生-nodejs-下载"><span>原生 nodejs 下载</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 设置下载文件名</span></span>
<span class="line">  res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Content-Disposition'</span><span class="token punctuation">,</span> <span class="token string">'attachment; filename="l.png"'</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token comment">// 设置响应头，告诉客户端这是一个文件下载</span></span>
<span class="line">  <span class="token comment">// application/octet-stream 表示这是一个二进制流文件。浏览器遇到这种类型时，会将其视为二进制文件并触发下载行为</span></span>
<span class="line">  <span class="token comment">// res.setHeader('Content-Type', 'application/octet-stream')</span></span>
<span class="line">  <span class="token comment">// res.setHeader('Content-Type', 'image/png')</span></span>
<span class="line">  <span class="token comment">// 方式一：读取文件直接返回</span></span>
<span class="line">  fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">'./logo.png'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token comment">// // 方式二：文件流式传输</span></span>
<span class="line">  <span class="token comment">// const fileStream = fs.createReadStream('./logo.png')</span></span>
<span class="line">  <span class="token comment">// // 将文件流管道到响应对象，实现自动传输</span></span>
<span class="line">  <span class="token comment">// fileStream.pipe(res)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">4000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'running...'</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="预览" tabindex="-1"><a class="header-anchor" href="#预览"><span>预览</span></a></h3>
<p>如果是预览，不设置任何 header，浏览器可能正确显示预览文件，保险起见，还是设置 header 头 Content-Type 为文件对应的 mineType</p>
<h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载"><span>下载</span></a></h3>
<p>如果只设置 header 头 <code v-pre>'Content-Type': 'application/octet-stream'</code>，那么可以触发下载，但是文件下载名为默认的 “下载”，没有后缀名。</p>
<p>如果只设置 header 头 <code v-pre>'Content-Disposition', 'attachment; filename=&quot;l.png&quot;'</code>，那么可以触发下载，下载文件名也是设置的文件名，但保险起见，还是设置 header 头 <code v-pre>'Content-Type': 'application/octet-stream'</code>.</p>
</div></template>


