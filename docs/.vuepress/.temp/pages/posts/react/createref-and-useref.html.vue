<template><div><ul>
<li><a href="#createref-vs-useref">createRef vs useRef</a></li>
<li><a href="#fc%E6%AF%8F%E6%AC%A1%E6%B8%B2%E6%9F%93%E8%8E%B7%E5%8F%96%E5%88%B0%E7%9A%84%E7%8A%B6%E6%80%81%E4%B8%8D%E6%98%AF%E5%AE%9E%E6%97%B6%E7%8A%B6%E6%80%81">FC每次渲染获取到的状态不是实时状态？</a></li>
</ul>
<p>在class时代，由于组件节点是通过class实例化而得，因此可以在类实例上存放内容，这些内容随着实例化产生，随着componentWillUnmount销毁。但是在hook的范围下，函数组件并没有this和对应的实例，因此useRef作为这一能力的弥补，扮演着跨多次渲染存放内容的角色。</p>
<p>每一个希望深入hook实践的开发者都必须记住这个结论，无法自如地使用useRef会让你失去hook将近一半的能力。</p>
<p>ref是一个与组件对应的React节点生命周期相同的，可用于存放自定义内容的容器。</p>
<h3 id="createref-vs-useref" tabindex="-1"><a class="header-anchor" href="#createref-vs-useref"><span>createRef vs useRef</span></a></h3>
<p>都可以用来获取 dom 或者 组件实例，但 useRef 明显可以做的更多。</p>
<p><strong>createRef 每次渲染都会返回一个新的引用，而 useRef 每次渲染始终都是一个引用。</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useRef<span class="token punctuation">,</span> createRef <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">Demo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">const</span> refFromCreateRef <span class="token operator">=</span> <span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">const</span> refFromUseRef <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>refFromCreateRef<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 每次渲染都为 null</span></span>
<span class="line">    refFromCreateRef<span class="token punctuation">.</span>current <span class="token operator">=</span> count</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>refFromUseRef<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 第一次渲染为 null，后面渲染都为 1</span></span>
<span class="line">    refFromUseRef<span class="token punctuation">.</span>current <span class="token operator">=</span> count</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>p<span class="token operator">></span>current count <span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>p<span class="token operator">></span>refFromCreateRef<span class="token punctuation">.</span>current <span class="token punctuation">{</span>refFromCreateRef<span class="token punctuation">.</span>current<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>p<span class="token operator">></span>refFromUseRef<span class="token punctuation">.</span>current <span class="token punctuation">{</span>refFromUseRef<span class="token punctuation">.</span>current<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span><span class="token operator">></span>click<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击按钮，refFromCreateRef.current每次渲染最新的 count， refFromUseRef.current 每次都渲染 1</p>
<h3 id="fc每次渲染获取到的状态不是实时状态" tabindex="-1"><a class="header-anchor" href="#fc每次渲染获取到的状态不是实时状态"><span>FC每次渲染获取到的状态不是实时状态？</span></a></h3>
<p>看下面的这个例子。它在两秒后会alert点击次数<code v-pre>count</code>：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">Demo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">handleAddClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setCount</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">handleAlertClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'you clicked on: '</span> <span class="token operator">+</span> count<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>p<span class="token operator">></span>You clicked <span class="token punctuation">{</span>count<span class="token punctuation">}</span> times<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleAddClick<span class="token punctuation">}</span><span class="token operator">></span>Click me<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleAlertClick<span class="token punctuation">}</span><span class="token operator">></span>Show alert<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按以下步骤操作：</p>
<ul>
<li><strong>点击增加</strong>count到3</li>
<li><strong>点击一下</strong> “Show alert”</li>
<li><strong>点击增加</strong> count到5并且在定时器回调触发前完成</li>
</ul>
<p>alert 会弹出什么?</p>
<p>会是5吗？— 这个值是alert的时候count的实时状态。或者会是3吗？— 这个值是点击时候的状态。</p>
<p>结果是3</p>
<p><strong>为什么 alert 的不是 count 的实时状态?</strong></p>
<p>实际上，每一次渲染都有一个“新版本”的<code v-pre>handleAlertClick</code>。每一个版本的<code v-pre>handleAlertClick</code>“记住” 了它自己的 <code v-pre>count</code></p>
<p><strong>如何修改 让 alert 的是 count 的实时状态</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useRef <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">Demo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">const</span> latestCount <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span></span>
<span class="line">  latestCount<span class="token punctuation">.</span>current <span class="token operator">=</span> count</span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">handleAddClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setCount</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">handleAlertClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'you clicked on: '</span> <span class="token operator">+</span> latestCount<span class="token punctuation">.</span>current<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>p<span class="token operator">></span>You clicked <span class="token punctuation">{</span>count<span class="token punctuation">}</span> times<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleAddClick<span class="token punctuation">}</span><span class="token operator">></span>Click me<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleAlertClick<span class="token punctuation">}</span><span class="token operator">></span>Show alert<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>useRef 每次都会返回同一个引用，每次渲染都会把最新 count 赋值给这个引用，在 alert 的时候访问的引用保存的是最新的 count。</p>
<p>React官方称useRef为“hook中的作弊器”，所谓的“作弊”，是指它打破了类似useCallback、useEffect对闭包的约束，使用一个“可变的容器”让ref不需要成为闭包的依赖也可以在闭包中获得最新的内容。</p>
</div></template>


