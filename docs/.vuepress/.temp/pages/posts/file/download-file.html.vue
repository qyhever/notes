<template><div><ul>
<li><a href="#%E5%89%8D%E7%AB%AF%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E9%81%87%E5%88%B0%E7%9A%84%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98">前端下载文件遇到的一些问题</a>
<ul>
<li><a href="#%E5%89%8D%E7%AB%AF%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E7%9A%84%E6%96%B9%E5%BC%8F">前端下载文件的方式</a>
<ul>
<li><a href="#1%E4%BD%BF%E7%94%A8-a-%E6%A0%87%E7%AD%BE%E4%B8%8B%E8%BD%BD">1、使用 a 标签下载</a></li>
<li><a href="#2%E4%BD%BF%E7%94%A8%E8%99%9A%E6%8B%9F-a-%E6%A0%87%E7%AD%BE%E4%B8%8B%E8%BD%BD">2、使用虚拟 a 标签下载</a></li>
<li><a href="#3%E4%BD%BF%E7%94%A8-windowopen-%E6%96%B9%E6%B3%95%E4%B8%8B%E8%BD%BD">3、使用 <code v-pre>window.open</code> 方法下载</a></li>
<li><a href="#5%E4%BD%BF%E7%94%A8-iframe-%E4%B8%8B%E8%BD%BD">5、使用 iframe 下载</a></li>
<li><a href="#6%E4%BD%BF%E7%94%A8-blob--objecturl--a-%E6%A0%87%E7%AD%BE%E7%9A%84%E6%96%B9%E5%BC%8F%E4%B8%8B%E8%BD%BD">6、使用 blob + ObjectURL + a 标签的方式下载</a></li>
</ul>
</li>
<li><a href="#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%80%9A%E8%BF%87%E4%BF%AE%E6%94%B9-http-%E5%8D%8F%E8%AE%AE%E5%A4%B4%E5%AE%9E%E7%8E%B0%E4%BF%AE%E6%94%B9%E6%96%87%E4%BB%B6%E5%90%8D">服务端通过修改 HTTP 协议头实现修改文件名</a></li>
<li><a href="#%E5%8F%82%E8%80%83%E9%93%BE%E6%8E%A5-">参考链接 🖇</a></li>
<li><a href="#%E7%9B%B8%E5%85%B3%E6%96%87%E7%AB%A0">相关文章</a></li>
</ul>
</li>
</ul>
<h1 id="前端下载文件遇到的一些问题" tabindex="-1"><a class="header-anchor" href="#前端下载文件遇到的一些问题"><span>前端下载文件遇到的一些问题</span></a></h1>
<p>在前段时间的开发中，有一个下载分片视频的需求，在做这个需求的过程中遇到了几个坑，这里来记录一下。</p>
<p>在这个需求中，同一个视频被分成了一到多个视频片段，如果有一个视频片段在点击下载按钮时直接下载；如果有多个视频片段则需要选择后点击一次下载按钮时完成对所有视频片段的下载，即不能将视频的下载链接写成 <code v-pre>&lt;a href=&quot;xx&quot; download&gt;video href&lt;/a&gt;</code> 这种形式逐个点击后下载。接下来，我们就来看一看前端中到底有多少种方式可以用来下载文件。</p>
<h2 id="前端下载文件的方式" tabindex="-1"><a class="header-anchor" href="#前端下载文件的方式"><span><span id="ways">前端下载文件的方式</span></span></a></h2>
<h3 id="_1、使用-a-标签下载" tabindex="-1"><a class="header-anchor" href="#_1、使用-a-标签下载"><span><span id="a-tag">1、使用 a 标签下载<span></span></a></h3>
<p>通常情况下我们使用 <code v-pre>a</code> 标签进行页面之间的跳转，但是 <code v-pre>a</code> 标签还有一个隐藏功能，那就是 <strong>文件下载</strong>。默认情况下，如果 <code v-pre>a</code> 标签的 <code v-pre>href</code> 属性的值是一个指向浏览器可以打开的 MIME 中的一种时，浏览器会加载该 URI 指向的文件的并展示出来；如果 URI 指向的文件并不能被浏览器展现时，则会被下载到本地。</p>
<p>而在 HTML5 中，<code v-pre>a</code> 标签新增来一个 <code v-pre>download</code> 属性，如果一个 <code v-pre>a</code> 标签在使用时添加了 <code v-pre>download</code> 属性的话，在点击时，浏览器会将 <code v-pre>href</code> 指向的文件下载到本地。如果 <code v-pre>download</code> 属性设置了值的话，该属性的值会作为下载到本地文件的名字。</p>
<p>但是，如果 <code v-pre>a</code> 标签的 <code v-pre>href</code> 是指向的一个接口，通过接口下载文件的话，<code v-pre>download</code> 属性即使设置了值，也不能更改下载到本地的文件的名字；同样，下载 OSS 上的文件，也不能通过设置 <code v-pre>download</code> 属性来改变下载到本地文件的名字。所以，如果使用 <code v-pre>a</code> 标签下载文件并且想修改下载到本地的文件名时，需要服务端配合修改 HTTP 的协议头 <code v-pre>Content-Disposition</code>。</p>
<h3 id="_2、使用虚拟-a-标签下载" tabindex="-1"><a class="header-anchor" href="#_2、使用虚拟-a-标签下载"><span><span id="virtual-a-tag">2、使用虚拟 a 标签下载</span></span></a></h3>
<p>由于产品形态或者其他原因，有时候产品不允许在页面中出现 <strong>实体的 a 标签</strong>，这里所谓的实体的 a 标签是指真实存在于 dom 树中的 a 标签，这种时候可以借助存在于内存中的 <strong>虚拟 a 标签</strong> 来实现下载的功能。</p>
<p>在现代浏览器中，绝大部份浏览器都支持在内存中创建 HTML 标签，并可以在虚拟标签上触发该标签所允许的事件，例如 <code v-pre>click</code> 等事件。</p>
<p>使用虚拟 a 标签实现下载功能的代码如下：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">download</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">let</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span></span>
<span class="line">	a<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">'uri/to/file'</span></span>
<span class="line">	a<span class="token punctuation">.</span>download <span class="token operator">=</span> <span class="token string">'filename'</span></span>
<span class="line">	<span class="token comment">// a.style.display = 'none' # 设置 a 标签不可见</span></span>
<span class="line">	<span class="token comment">// document.body.append(a) # 添加到 dom 树中</span></span>
<span class="line">	a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// document.body.remove(a) # 从 dom 树中移除</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">download</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码现在内存中创建了一个 a 标签，设置 <code v-pre>href</code> 和 <code v-pre>download</code> 属性之后，添加到 dom 树中；然后通过 <code v-pre>a.click()</code> 触发 a 标签的点击事件，由于 a 标签设置了 <code v-pre>download</code> 属性，所以浏览器会解析 URI 并将文件下载到本地；最后通过 HTML 向外暴露的 <code v-pre>remove</code> 方法将 a 标签从 dom 树中移除。</p>
<p>其实即使不将 a 标签添加到 dom 树中，也可以通过 <code v-pre>a.click()</code> 触发 a 标签的点击事件实现下载；所以，在使用的过程中，可以省略上面代码中被注释的部分，少改变一次 dom 树，毕竟任何的操作都是有消耗的。</p>
<h3 id="_3、使用-window-open-方法下载" tabindex="-1"><a class="header-anchor" href="#_3、使用-window-open-方法下载"><span><span id="window-open">3、使用 <code v-pre>window.open</code> 方法下载</span></span></a></h3>
<p>同没有添加 <code v-pre>download</code> 属性的 a 标签一样，可以通过 <code v-pre>window.open</code> 方法下载部分文件，这些可以下载的文件是不能被浏览器展现出来的文件；对于可以被浏览器解析并展现的文件，<code v-pre>windown.open</code> 方法只会在新打开的窗口渲染文件内容，并不会下载到本地。</p>
<p>除了以上的问题外，使用 <code v-pre>window.open</code> 还会出现以下几个问题：</p>
<ul>
<li><code v-pre>window.open</code> 方法还会先打开一个空白的页面，然后在新打开的页面中实现下载，体验不是很好；</li>
<li>新打开的页面不会自己关闭，需要开发者自己手动关闭新打开的页面，这里就会出现一个问题：如果关闭新窗口的代码执行的太早，下载的请求链接没有传输完成时，则该下载会被中断。而且开发者没有办法知道下载请求链接是否完成，所以要么不关闭新打开的窗口，由用户关闭；或者设置一个比较大的定时器，由定时器来关闭新打开的空白页面。</li>
<li>对于异步获取的下载 <strong>url</strong>，通过 <code v-pre>window.open</code> 打开新页面时会被浏览器拦截，即该页面不会被打开，会被浏览器折叠在地址栏的最右边，需要用户手动信任后才能下载；</li>
</ul>
<p>所以不建议通过 <code v-pre>window.open</code> 方法下载文件。</p>
<p>**注：**对于使用 <code v-pre>window.open</code> 打开异步获取的 url 被浏览器拦截的问题，可以通过先创建新的空白页面，然后设置 url 的方式打开：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> w <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">getUrlAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">w<span class="token punctuation">.</span>location <span class="token operator">=</span> url</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>另：不要通过 <code v-pre>window.open</code> 方法打开不安全的下载页面，因为新打开的页面可以通过 <code v-pre>window.opener</code> 获取你的页面引用。详见 <RouteLink to="/posts/file/rel-noopener.html">rel=noopener</RouteLink></strong>。</p>
<h3 id="_5、使用-iframe-下载" tabindex="-1"><a class="header-anchor" href="#_5、使用-iframe-下载"><span><span id="iframe">5、使用 iframe 下载</span></span></a></h3>
<p>使用 iframe 下载文件与使用 <a href="#virtual-a-tag">虚拟 a 标签下载</a> 或者 <a href="#window-open">使用 <code v-pre>window.open</code> 方法下载</a> 具有一样的局限：只能下载浏览器不能渲染的文件。其本质也是借助浏览器会下载不能渲染的文件的特性。</p>
<p>下载代码与使用 <a href="#virtual-a-tag">虚拟 a 标签下载</a> 差不多：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">let</span> f <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'iframe'</span><span class="token punctuation">)</span></span>
<span class="line"># document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line">f<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'URL/to/file'</span></span>
<span class="line"># document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注释部分的代码可以不用，因为可以通过内存中的 iframe 实现下载。</strong></p>
<h3 id="_6、使用-blob-objecturl-a-标签的方式下载" tabindex="-1"><a class="header-anchor" href="#_6、使用-blob-objecturl-a-标签的方式下载"><span><span id="blob-ObjectURL-a">6、使用 blob + ObjectURL + a 标签的方式下载</span></span></a></h3>
<p>该实现方式的代码如下：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * 获取 blob</span>
<span class="line"> * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">url</span> 目标文件地址</span>
<span class="line"> * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>Promise<span class="token punctuation">}</span></span> </span>
<span class="line"> */</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">getBlob</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">const</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'GET'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        xhr<span class="token punctuation">.</span>responseType <span class="token operator">=</span> <span class="token string">'blob'</span><span class="token punctuation">;</span></span>
<span class="line">        xhr<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">resolve</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * 保存</span>
<span class="line"> * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>Blob<span class="token punctuation">}</span></span> <span class="token parameter">blob</span>     </span>
<span class="line"> * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">filename</span> 想要保存的文件名称</span>
<span class="line"> */</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">saveAs</span><span class="token punctuation">(</span><span class="token parameter">blob<span class="token punctuation">,</span> filename</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>navigator<span class="token punctuation">.</span>msSaveOrOpenBlob<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        navigator<span class="token punctuation">.</span><span class="token function">msSaveBlob</span><span class="token punctuation">(</span>blob<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">const</span> link <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">const</span> body <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        link<span class="token punctuation">.</span>href <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        link<span class="token punctuation">.</span>download <span class="token operator">=</span> filename<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// fix Firefox</span></span>
<span class="line">        link<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'none'</span><span class="token punctuation">;</span></span>
<span class="line">        body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>link<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        </span>
<span class="line">        link<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>link<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span>link<span class="token punctuation">.</span>href<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * 下载</span>
<span class="line"> * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">url</span> 目标文件地址</span>
<span class="line"> * <span class="token keyword">@param</span>  <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span> <span class="token parameter">filename</span> 想要保存的文件名称</span>
<span class="line"> */</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> filename</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">getBlob</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">blob</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">saveAs</span><span class="token punctuation">(</span>blob<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">作者：RoamIn</span>
<span class="line"><span class="token literal-property property">链接：https</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>www<span class="token punctuation">.</span>jianshu<span class="token punctuation">.</span>com<span class="token operator">/</span>p<span class="token operator">/</span>6545015017c4</span>
<span class="line">來源：简书</span>
<span class="line">著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注：©上面的代码摘抄自 <a href="https://www.jianshu.com/p/6545015017c4" target="_blank" rel="noopener noreferrer">JavaScript 实现文件下载并重命名</a>。</strong></p>
<p>这种方式的下载原理：</p>
<ul>
<li>1、通过 Ajax 请求将要下载的文件以 <code v-pre>blob</code> 的格式下载到本地；</li>
<li>2、通过 <code v-pre>window.URL.createObjectURL(blob)</code> 创建一个标识文件对象的 Object URL；更多文件操作的内容可以参考 <a href="https://github.com/NinjiaHub/Frontend-Tricks/blob/master/documents/HTML/file-api.md" target="_blank" rel="noopener noreferrer">前端 file api</a>；</li>
<li>3、通过 <a href="#virtual-a-tag">使用虚拟 a 标签下载</a> 下载到本地；</li>
</ul>
<p>使用该方式具有以下几种限制：</p>
<ul>
<li>1、需要下载 blob 格式的文件，所以需要服务器支持 <code v-pre>responseType: blob</code>；</li>
<li>2、需要先将文件下载到本地之后再使用 <code v-pre>window.URL.createObjectURL(blob)</code> 创建 Object URL，所以如果文件比较大，ajax 请求需要很久才能下载完成，下载期间没有任何反应，所以体验不好；</li>
</ul>
<p>优势：</p>
<ul>
<li>可以本地控制修改文件名，即使是下载 OSS 文件也可以在本地定义文件名。</li>
</ul>
<h2 id="服务端通过修改-http-协议头实现修改文件名" tabindex="-1"><a class="header-anchor" href="#服务端通过修改-http-协议头实现修改文件名"><span><span id="http-header">服务端通过修改 HTTP 协议头实现修改文件名</span></span></a></h2>
<p>上面的下载方式都不能很好的解决本地下载且修改文件名的问题；这里要讲的下载方式可以比较好的解决问题：既可以持续下载让用户看到，又能本地修改下载后的文件名字。</p>
<p>我们知道服务器上的静态文件可以通过 a 标签 + download 属性的方式实现下载，并且可以修改下载到本地的文件名字；而 OSS 上的文件，或者通过请求接口下载的文件，不能通过设置 download 属性来修改下载到本地的文件的名字，这个时候可以请服务端配合，在下载接口中返回如下 HTTP 协议头：</p>
<div class="language-http line-numbers-mode" data-highlighter="prismjs" data-ext="http"><pre v-pre><code><span class="line">'Content-Disposition: attachment; filename="downloaded.pdf"'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>浏览器在请求响应时，如发现该 HTTP 协议头，会将 <code v-pre>filename</code> 的值设置为下载文件的名字，这样就可以避免使用 blob 方式下载时的“假死”问题，也修改了下载文件的名字。</p>
<p>可以在设计接口时，留一个设置文件名的参数，这样就可以在调用下载接口时，将想要设置的文件名以参数的形式传递到服务端；服务端接口在响应时，在响应中带上 HTTP 协议头，通知浏览器修改下载文件的名字。</p>
<h2 id="参考链接-🖇" tabindex="-1"><a class="header-anchor" href="#参考链接-🖇"><span><span id="links">参考链接</span> 🖇</span></a></h2>
<ul>
<li><a href="https://stackoverflow.com/questions/3102226/how-to-set-name-of-file-downloaded-from-browser" title="How to set name of file downloaded from browser?
" target="_blank" rel="noopener noreferrer">How to set name of file downloaded from browser?
</a></li>
<li><a href="https://github.com/eligrey/FileSaver.js" target="_blank" rel="noopener noreferrer">FileSaver</a></li>
<li><a href="https://www.jianshu.com/p/6545015017c4" target="_blank" rel="noopener noreferrer">JavaScript 实现文件下载并重命名</a></li>
</ul>
<ul>
<li><a href="https://github.com/NinjiaHub/Frontend-Tricks/blob/master/documents/CHAOS/download-file.md" target="_blank" rel="noopener noreferrer">原地址</a></li>
</ul>
<h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章"><span>相关文章</span></a></h2>
<ul>
<li><a href="https://juejin.cn/post/6844904069958467592" target="_blank" rel="noopener noreferrer">前端下载文件的5种方法的对比</a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651233330&amp;idx=1&amp;sn=b2f3ab11473b2ff849d03b9a237b0394&amp;poc_token=HJCqlWijXrYjQ_2cv8XIg3raoxTastPkG1FqdRj9" target="_blank" rel="noopener noreferrer">【第1699期】正确处理下载文件时HTTP头的编码问题（Content-Disposition）</a></li>
<li><a href="https://blog.robotshell.org/2012/deal-with-http-header-encoding-for-file-download/" target="_blank" rel="noopener noreferrer">正确处理下载文件时HTTP头的编码问题（Content-Disposition）</a></li>
</ul>
</div></template>


