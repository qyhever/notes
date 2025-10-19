<template><div><ul>
<li><a href="#%E4%B8%A4%E7%A7%8D%E8%AE%BE%E7%BD%AE-props-%E9%BB%98%E8%AE%A4%E5%80%BC%E7%9A%84%E6%96%B9%E6%B3%95">两种设置 props 默认值的方法</a>
<ul>
<li><a href="#props-%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC%E9%BB%98%E8%AE%A4%E5%80%BC">props 解构赋值默认值</a></li>
<li><a href="#withdefaults">withDefaults</a></li>
</ul>
</li>
<li><a href="#arrayfoo--bar-and-foo--bar">(Array&lt;Foo | Bar&gt;) and (Foo[] | Bar[])</a></li>
<li><a href="#rest-%E5%89%A9%E4%BD%99%E5%8F%82%E6%95%B0%E6%88%96%E8%80%85-arguments-%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92%E7%9A%84%E7%B1%BB%E5%9E%8B%E9%94%99%E8%AF%AF">...rest 剩余参数或者 arguments 参数传递的类型错误</a></li>
</ul>
<h3 id="两种设置-props-默认值的方法" tabindex="-1"><a class="header-anchor" href="#两种设置-props-默认值的方法"><span>两种设置 props 默认值的方法</span></a></h3>
<h4 id="props-解构赋值默认值" tabindex="-1"><a class="header-anchor" href="#props-解构赋值默认值"><span>props 解构赋值默认值</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">interface</span> <span class="token class-name">IProps</span> <span class="token punctuation">{</span></span>
<span class="line">  type<span class="token operator">?</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token operator">|</span> <span class="token string">'bar'</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token punctuation">{</span> info <span class="token operator">=</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span> <span class="token operator">=</span> defineProps<span class="token operator">&lt;</span>IProps<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="withdefaults" tabindex="-1"><a class="header-anchor" href="#withdefaults"><span>withDefaults</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">interface</span> <span class="token class-name">IProps</span> <span class="token punctuation">{</span></span>
<span class="line">  type<span class="token operator">?</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token operator">|</span> <span class="token string">'bar'</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">withDefaults</span><span class="token punctuation">(</span>defineProps<span class="token operator">&lt;</span>IProps<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'foo'</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="array-foo-bar-and-foo-bar" tabindex="-1"><a class="header-anchor" href="#array-foo-bar-and-foo-bar"><span>(Array&lt;Foo | Bar&gt;) and (Foo[] | Bar[])</span></a></h3>
<p>两者在类型上是不同的，这点在使用 map 方法时很明显的报错<br>
https://github.com/microsoft/TypeScript/issues/33591#issuecomment-786443978</p>
<h3 id="rest-剩余参数或者-arguments-参数传递的类型错误" tabindex="-1"><a class="header-anchor" href="#rest-剩余参数或者-arguments-参数传递的类型错误"><span>...rest 剩余参数或者 arguments 参数传递的类型错误</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">a</span><span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 编译异常</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>rest<span class="token operator">:</span> number<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token operator">...</span>rest<span class="token punctuation">)</span> <span class="token comment">// error: Expected 3 arguments, but got 0 or more.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 正确方式</span></span>
<span class="line">type RestParamType <span class="token operator">=</span> Parameters<span class="token operator">&lt;</span><span class="token keyword">typeof</span> foo<span class="token operator">></span> <span class="token comment">// 使用 Parameters 将 foo 的参数类型挖出来</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>rest<span class="token operator">:</span> RestParamType</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token operator">...</span>rest<span class="token punctuation">)</span> <span class="token comment">// success</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


