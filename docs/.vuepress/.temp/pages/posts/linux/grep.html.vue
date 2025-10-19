<template><div><ul>
<li><a href="#%E6%9F%A5%E6%97%A5%E5%BF%97">查日志</a>
<ul>
<li><a href="#%E5%9F%BA%E6%9C%AC">基本</a></li>
<li><a href="#vi">vi</a></li>
<li><a href="#%E7%BB%84%E5%90%88%E6%8B%B3">组合拳</a>
<ul>
<li><a href="#%E5%9C%BA%E6%99%AF%E4%B8%80%E6%9F%A5%E5%BC%82%E5%B8%B8%E5%A0%86%E6%A0%88%E7%BB%9D%E4%B8%8D%E8%83%BD%E5%8F%AA%E7%9C%8B%E4%B8%80%E8%A1%8C">场景一：查异常堆栈，绝不能只看一行！</a></li>
<li><a href="#%E5%9C%BA%E6%99%AF%E4%BA%8C%E5%AE%9E%E6%97%B6%E7%9C%8B%E6%96%B0%E6%97%A5%E5%BF%97">场景二：实时看新日志</a></li>
<li><a href="#%E5%9C%BA%E6%99%AF%E4%B8%89%E7%BF%BB%E5%8E%86%E5%8F%B2%E6%97%A5%E5%BF%97--%E5%8E%8B%E7%BC%A9%E6%97%A5%E5%BF%97">场景三：翻历史日志 &amp; 压缩日志</a></li>
<li><a href="#%E5%9C%BA%E6%99%AF%E5%9B%9B%E7%BB%9F%E8%AE%A1%E5%BC%82%E5%B8%B8%E6%95%B0%E9%87%8F">场景四：统计异常数量</a></li>
</ul>
</li>
<li><a href="#%E5%B8%B8%E7%94%A8-grep-%E5%8F%82%E6%95%B0">常用 grep 参数</a></li>
</ul>
</li>
<li><a href="#reference">Reference</a></li>
</ul>
<h2 id="查日志" tabindex="-1"><a class="header-anchor" href="#查日志"><span>查日志</span></a></h2>
<h3 id="基本" tabindex="-1"><a class="header-anchor" href="#基本"><span>基本</span></a></h3>
<p>实时监控 a.log 文件，并筛选出包含 &quot;java.lang.NullPointerException&quot; 内容的日志行。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> a.log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"java.lang.NullPointerException"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>使用 grep 的 -C 选项，例如显示前后各 5 行：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> a.log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-C</span> <span class="token number">5</span> <span class="token string">"java.lang.NullPointerException"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="vi" tabindex="-1"><a class="header-anchor" href="#vi"><span>vi</span></a></h3>
<p>在Vim 中，按下 / 并输入关键字后按回车开始搜索，按 n 可以查找下一个匹配项。若要反向查找，可按下 ? 或 N。</p>
<h3 id="组合拳" tabindex="-1"><a class="header-anchor" href="#组合拳"><span>组合拳</span></a></h3>
<h4 id="场景一-查异常堆栈-绝不能只看一行" tabindex="-1"><a class="header-anchor" href="#场景一-查异常堆栈-绝不能只看一行"><span>场景一：查异常堆栈，绝不能只看一行！</span></a></h4>
<p><code v-pre>-A 50</code> 匹配到的行+后面 50 行，堆栈信息一览无余。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">50</span> <span class="token string">"java.lang.NullPointerException"</span> a.log</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>怕刷屏？加 less 分页：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">50</span> <span class="token string">"java.lang.NullPointerException"</span> a.log <span class="token operator">|</span> <span class="token function">less</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 less 里你可以：</p>
<ul>
<li>↑↓ / PageUp PageDown 滚动</li>
<li>G 直达末尾</li>
<li>/Exception 继续搜索</li>
<li>q 退出</li>
</ul>
<h4 id="场景二-实时看新日志" tabindex="-1"><a class="header-anchor" href="#场景二-实时看新日志"><span>场景二：实时看新日志</span></a></h4>
<p>应用正在跑，随时可能报错？这时候直接 tail 跟进：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> a.log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">50</span> <span class="token string">"java.lang.NullPointerException"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>报错一来，堆栈直接推到你面前。<br>
大小写怕拼错？加 -i 忽略大小写。<br>
想停止，Ctrl + C 可退出。</p>
<h4 id="场景三-翻历史日志-压缩日志" tabindex="-1"><a class="header-anchor" href="#场景三-翻历史日志-压缩日志"><span>场景三：翻历史日志 &amp; 压缩日志</span></a></h4>
<p>线上日志常常被分片+压缩，变成 a.log.2025-07-02.gz。这时候别傻傻解压。</p>
<p>查所有 .log 文件：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">grep</span> <span class="token parameter variable">-H</span> <span class="token parameter variable">-A</span> <span class="token number">50</span> <span class="token string">"java.lang.NullPointerException"</span> *.log</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>查 .gz 文件：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">zgrep <span class="token parameter variable">-H</span> <span class="token parameter variable">-A</span> <span class="token number">50</span> <span class="token string">"java.lang.NullPointerException"</span> *.gz</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>-H 会打印文件名，帮你知道异常在哪一天爆的。</p>
<h4 id="场景四-统计异常数量" tabindex="-1"><a class="header-anchor" href="#场景四-统计异常数量"><span>场景四：统计异常数量</span></a></h4>
<p>如果想知道异常是偶发还是疯狂刷屏</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">grep</span> <span class="token parameter variable">-c</span> <span class="token string">"java.lang.NullPointerException"</span> a.log</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>多文件：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">grep</span> <span class="token parameter variable">-c</span> <span class="token string">"java.lang.NullPointerException"</span> *.log</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="常用-grep-参数" tabindex="-1"><a class="header-anchor" href="#常用-grep-参数"><span>常用 grep 参数</span></a></h3>
<ul>
<li>
<p>-A N 显示匹配行之后 N 行</p>
</li>
<li>
<p>-B N 显示匹配行之前 N 行</p>
</li>
<li>
<p>-C N 显示匹配行上下文 N 行</p>
</li>
<li>
<p>-H 打印文件名</p>
</li>
<li>
<p>-i 忽略大小写</p>
</li>
<li>
<p>-r 递归搜索子目录</p>
</li>
<li>
<p>-c 统计匹配数量</p>
</li>
</ul>
<h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>
<ul>
<li><a href="https://www.toutiao.com/article/7545429680254370342/" target="_blank" rel="noopener noreferrer">同事查日志太慢，我现场教他一套 grep 组合拳</a></li>
<li><a href=""></a></li>
<li><a href=""></a></li>
</ul>
</div></template>


