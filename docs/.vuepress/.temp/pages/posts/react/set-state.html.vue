<template><div><ul>
<li><a href="#setstate-%E6%98%AF%E5%90%8C%E6%AD%A5%E8%BF%98%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98">setState 是同步还是异步相关问题</a>
<ul>
<li><a href="#setstate-%E6%98%AF%E5%90%8C%E6%AD%A5%E8%BF%98%E6%98%AF%E5%BC%82%E6%AD%A5">setState 是同步还是异步？</a></li>
<li><a href="#%E4%BD%95%E6%97%B6%E6%98%AF%E5%90%8C%E6%AD%A5%E4%BD%95%E6%97%B6%E6%98%AF%E5%BC%82%E6%AD%A5%E5%91%A2">何时是同步，何时是异步呢？</a></li>
<li><a href="#%E9%82%A3%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E5%87%BA%E7%8E%B0%E5%BC%82%E6%AD%A5%E7%9A%84%E6%83%85%E5%86%B5%E5%91%A2">那为什么会出现异步的情况呢？</a></li>
<li><a href="#%E9%82%A3%E5%A6%82%E4%BD%95%E5%9C%A8%E8%A1%A8%E7%8E%B0%E5%87%BA%E5%BC%82%E6%AD%A5%E7%9A%84%E5%87%BD%E6%95%B0%E9%87%8C%E5%8F%AF%E4%BB%A5%E5%87%86%E7%A1%AE%E6%8B%BF%E5%88%B0%E6%9B%B4%E6%96%B0%E5%90%8E%E7%9A%84-state-%E5%91%A2">那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？</a></li>
<li><a href="#%E9%82%A3%E8%A1%A8%E7%8E%B0%E5%87%BA%E5%BC%82%E6%AD%A5%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84%E5%91%A2">那表现出异步的原理是怎么样的呢？</a></li>
</ul>
</li>
</ul>
<h3 id="setstate-是同步还是异步相关问题" tabindex="-1"><a class="header-anchor" href="#setstate-是同步还是异步相关问题"><span>setState 是同步还是异步相关问题</span></a></h3>
<h4 id="setstate-是同步还是异步" tabindex="-1"><a class="header-anchor" href="#setstate-是同步还是异步"><span>setState 是同步还是异步？</span></a></h4>
<p>严格来讲，useState不是像 Promise 那样的异步 API；但更新不会立刻应用。可以把 setState 理解为向 React 发出的请求：
<code v-pre>“请把这个值改成 X，等合适的时机再更新 UI。”</code>
React 会在下一次渲染周期里应用更新，而不是在当前函数调用过程中立刻改写变量。因此，在 setState 后立刻读取，看到的仍是更新前的值。</p>
<p>执行过程代码同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，所以表现出来有时是同步，有时是“异步”。</p>
<h4 id="何时是同步-何时是异步呢" tabindex="-1"><a class="header-anchor" href="#何时是同步-何时是异步呢"><span>何时是同步，何时是异步呢？</span></a></h4>
<p>只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout/setInterval等原生 API 中都是同步的。简单的可以理解为被 React 控制的函数里面就会表现出“异步”，反之表现为同步。</p>
<h4 id="那为什么会出现异步的情况呢" tabindex="-1"><a class="header-anchor" href="#那为什么会出现异步的情况呢"><span>那为什么会出现异步的情况呢？</span></a></h4>
<p>为了做性能优化，将 state 的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实 dom，那么它将带来巨大的性能消耗。</p>
<h4 id="那如何在表现出异步的函数里可以准确拿到更新后的-state-呢" tabindex="-1"><a class="header-anchor" href="#那如何在表现出异步的函数里可以准确拿到更新后的-state-呢"><span>那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？</span></a></h4>
<p>通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。</p>
<p>或者可以通过给 setState 传递函数来表现出同步的情况：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">val</span><span class="token operator">:</span> newVal <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="那表现出异步的原理是怎么样的呢" tabindex="-1"><a class="header-anchor" href="#那表现出异步的原理是怎么样的呢"><span>那表现出异步的原理是怎么样的呢？</span></a></h4>
<p>直接讲源码肯定篇幅不够，可以看这篇文章：<a href="https://juejin.im/post/6844903636749778958" target="_blank" rel="noopener noreferrer">你真的理解setState吗</a>。</p>
<p>我这里还是用最简单的语言让你理解：在 React 的 setState 函数实现中，会根据 isBatchingUpdates(默认是 false) 变量判断是否直接更新 this.state 还是放到队列中稍后更新。然后有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 true，当 React 调用事件处理函数之前，或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新。</p>
<p>这样你就可以理解为什么原生事件和 setTimeout/setinterval 里面调用 this.state 会同步更新了吧，因为通过这些函数调用的 React 没办法去调用 batchedUpdate 函数将 isBatchingUpdates 设置为 true，那么这个时候 setState 的时候默认就是 false，那么就会同步更新。</p>
</div></template>


