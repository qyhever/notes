<template><div><ul>
<li><a href="#%E5%89%8D%E7%AB%AF%E9%83%A8%E7%BD%B2">前端部署</a>
<ul>
<li><a href="#%E5%B8%B8%E8%A7%84%E5%81%9A%E6%B3%95">常规做法</a>
<ul>
<li><a href="#%E6%89%93%E5%8C%85%E6%96%87%E4%BB%B6%E5%90%8D-hash-%E5%8C%96">打包文件名 hash 化</a></li>
<li><a href="#html-%E5%85%A5%E5%8F%A3%E6%96%87%E4%BB%B6%E9%98%B2%E7%BC%93%E5%AD%98">HTML 入口文件防缓存</a></li>
<li><a href="#%E8%A2%AB%E5%BF%BD%E7%95%A5%E7%9A%84%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5">被忽略的缓存策略</a></li>
</ul>
</li>
<li><a href="#%E7%B2%BE%E7%BB%86%E5%8C%96-nginx-%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5">精细化 Nginx 缓存策略</a></li>
<li><a href="#cdn%E8%AE%BE%E7%BD%AE">CDN设置</a></li>
</ul>
</li>
<li><a href="#reference">Reference</a></li>
</ul>
<h2 id="前端部署" tabindex="-1"><a class="header-anchor" href="#前端部署"><span>前端部署</span></a></h2>
<h3 id="常规做法" tabindex="-1"><a class="header-anchor" href="#常规做法"><span>常规做法</span></a></h3>
<ol>
<li>index.html 不被缓存，每次访问都是最新的。</li>
<li>最新的 index.html 引用了带新 Hash 的 JS/CSS 文件。</li>
<li>浏览器发现文件名变了，自然会去加载新资源。</li>
<li>用户看到了最新的页面。</li>
</ol>
<h4 id="打包文件名-hash-化" tabindex="-1"><a class="header-anchor" href="#打包文件名-hash-化"><span>打包文件名 hash 化</span></a></h4>
<p>使用 Webpack Vite 等构建工具，在打包时为 JS、CSS 等静态资源生成独一无二的 Hash 值文件名。</p>
<p>在有内容更新后，Hash 值发生变化，浏览器请求最新文件名避免缓存。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">main.348ae9a.js</span>
<span class="line">runtime.b7b2e9e9.js</span>
<span class="line">vendor.ant-design.5dbb2c6f.js</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="html-入口文件防缓存" tabindex="-1"><a class="header-anchor" href="#html-入口文件防缓存"><span>HTML 入口文件防缓存</span></a></h4>
<p>在 index.html 的 <head> 部分，加入了禁止缓存的 meta 标签。告诉浏览器：&quot;嘿，别缓存我！每次都来服务器拿最新的。&quot;</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html"><pre v-pre><code><span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Cache-Control<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>no-cache, no-store, must-revalidate<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Pragma<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>no-cache<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Expires<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="被忽略的缓存策略" tabindex="-1"><a class="header-anchor" href="#被忽略的缓存策略"><span>被忽略的缓存策略</span></a></h4>
<p>浏览器缓存策略的优先级是：<strong>HTTP 响应头（Response Headers）的优先级 &gt; HTML Meta 标签</strong></p>
<p>meta 标签更像是一种建议，而由服务器（如 Nginx）在 HTTP 响应中返回的 Cache-Control、Expires 等头部信息，才是浏览器必须严格遵守的最高指令。如果 HTTP 响应头没有明确指示不缓存，或者指示了可以缓存，那么浏览器就会愉快地忽略 meta 标签的建议，将 index.html 缓存起来。</p>
<p>Nginx 的默认行为</p>
<div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre v-pre><code><span class="line"><span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment"># 🔴 致命的遗漏：这里没有任何关于 index.html 的缓存控制指令！</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>当浏览器请求 https://yoursite.com/ 时，命中了 location / 规则。</li>
<li>Nginx 返回了 index.html 文件，但没有附加任何 Cache-Control 或 Expires 响应头。</li>
<li>浏览器或上游 CDN 看到这个沉默的响应，便启用自己的默认缓存策略，将 index.html 缓存了一段时间。</li>
<li>当你部署新版本后，JS 文件名（例如 main.new-hash.js）虽然变了，但用户再次访问时，浏览器直接从缓存中取出了旧的 index.html。</li>
<li>旧的 HTML 文件依然引用着旧的 JS 文件（main.old-hash.js）。</li>
<li>最终，用户看到的还是旧版本。</li>
</ol>
<h3 id="精细化-nginx-缓存策略" tabindex="-1"><a class="header-anchor" href="#精细化-nginx-缓存策略"><span>精细化 Nginx 缓存策略</span></a></h3>
<div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx"><pre v-pre><code><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> your.domain.com</span><span class="token punctuation">;</span> <span class="token comment"># 替换为你的域名</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span> <span class="token comment"># 替换为你的项目根目录</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 规则1：HTML 文件 - 永不缓存</span></span>
<span class="line">    <span class="token comment"># 这是最关键的一步，确保浏览器总是获取最新的入口文件。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> = /index.html</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">"no-cache, no-store, must-revalidate"</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">add_header</span> Pragma <span class="token string">"no-cache"</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">add_header</span> Expires <span class="token string">"0"</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 规则2：带 Hash 的静态资源 - 永久缓存</span></span>
<span class="line">    <span class="token comment"># 文件名中的 Hash 确保了内容变化时文件名也会变化，所以可以放心地让浏览器永久缓存。</span></span>
<span class="line">    <span class="token comment"># `immutable` 告诉浏览器这个文件内容永远不会变，连校验请求都无需发送。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> ~* \.[a-f0-9]</span><span class="token punctuation">{</span>8<span class="token punctuation">}</span>\.(css|js)$ <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">expires</span> <span class="token number">1y</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">"public, immutable"</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 规则3：其他静态资源（如图片、字体） - 长期缓存</span></span>
<span class="line">    <span class="token comment"># 这些文件通常不带 Hash，但也不常变动，可以设置一个较长的缓存时间。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> ~* \.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf)$</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">expires</span> <span class="token number">30d</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">add_header</span> Cache-Control <span class="token string">"public"</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 规则4：单页应用（SPA）路由处理</span></span>
<span class="line">    <span class="token comment"># 这是保证 React/Vue 等路由正常工作的关键。</span></span>
<span class="line">    <span class="token comment"># 重要的是，它会将所有未匹配到具体文件的请求都交由 index.html 处理。</span></span>
<span class="line">    <span class="token comment"># 由于我们已为 /index.html 单独设置了不缓存规则，所以这里是安全的。</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>location = /index.html：使用 = 精确匹配 /index.html，并强制其不被任何一方缓存。这是整个策略的核心。</li>
<li>location ~* .[a-f0-9]{8}.(css|js)$：通过正则表达式匹配所有带 8 位 Hash 的 JS 和 CSS 文件，并设置长达一年的缓存（1y）和 immutable 属性，实现最佳性能。</li>
<li>location /：作为最后的 fallback，处理 SPA 的前端路由，将所有页面导航都指向不缓存的 index.html。</li>
</ul>
<p>将这份配置应用到你的 nginx.development.conf, nginx.testing.conf, nginx.production.conf, 和 nginx.preview.conf 文件中（根据不同环境微调 expires 时间即可），你将彻底告别缓存带来的烦恼。</p>
<h3 id="cdn设置" tabindex="-1"><a class="header-anchor" href="#cdn设置"><span>CDN设置</span></a></h3>
<p>如果应用部署在 CDN 之后，请确保 CDN 的缓存策略与你的 Nginx 配置保持一致。通常需要在 CDN 控制台设置规则，使其遵守源站（Origin）的 Cache-Control 头。</p>
<table>
<thead>
<tr>
<th style="text-align:left">文件类型</th>
<th style="text-align:center">建议 TTL</th>
<th style="text-align:center">是否遵守源站</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">*.html</td>
<td style="text-align:center">0 秒</td>
<td style="text-align:center">是</td>
</tr>
<tr>
<td style="text-align:left">*.[hash].js</td>
<td style="text-align:center">31536000 秒 (1年)</td>
<td style="text-align:center">是</td>
</tr>
<tr>
<td style="text-align:left">*.[hash].css</td>
<td style="text-align:center">31536000 秒 (1年)</td>
<td style="text-align:center">是</td>
</tr>
<tr>
<td style="text-align:left">图片/字体</td>
<td style="text-align:center">2592000 秒 (30天)</td>
<td style="text-align:center">是</td>
</tr>
</tbody>
</table>
<h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>
<ul>
<li><a href="https://juejin.cn/post/7527977068417957939" target="_blank" rel="noopener noreferrer">什么？2025年了发版后还要手动清浏览器缓存？</a></li>
<li><a href=""></a></li>
<li><a href=""></a></li>
</ul>
</div></template>


