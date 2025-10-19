<template><div><ul>
<li><a href="#%E6%A6%82%E5%BF%B5%E7%AF%87">概念篇</a>
<ul>
<li><a href="#react-%E7%9A%84%E6%A0%B8%E5%BF%83%E6%80%9D%E6%83%B3">React 的核心思想</a></li>
<li><a href="#%E6%B8%B2%E6%9F%93%E5%99%A8">渲染器</a></li>
<li><a href="#reconcilers">reconcilers</a></li>
<li><a href="#stack-reconciler">Stack reconciler</a></li>
<li><a href="#fiber-reconciler">Fiber reconciler</a></li>
<li><a href="#fiber-%E6%9E%B6%E6%9E%84">Fiber 架构</a>
<ul>
<li><a href="#%E4%BB%80%E4%B9%88%E6%98%AF-fiber">什么是 fiber?</a></li>
<li><a href="#%E4%B8%A4%E4%B8%AA%E9%98%B6%E6%AE%B5%E7%9A%84%E6%8B%86%E5%88%86">两个阶段的拆分</a>
<ul>
<li><a href="#reconciliation-%E9%98%B6%E6%AE%B5">Reconciliation 阶段</a></li>
<li><a href="#commit-%E9%98%B6%E6%AE%B5">Commit 阶段</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#%E7%B1%BB%E7%BB%84%E4%BB%B6">类组件</a>
<ul>
<li><a href="#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F">生命周期</a></li>
<li><a href="#setstate">setState</a></li>
<li><a href="#forceupdate">forceUpdate</a></li>
<li><a href="#static-defaultprops">static defaultProps</a></li>
<li><a href="#static-displayname">static displayName</a></li>
</ul>
</li>
<li><a href="#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6">函数式组件</a></li>
<li><a href="#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86">事件处理</a>
<ul>
<li><a href="#%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6">合成事件</a></li>
<li><a href="#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91%E9%A1%BA%E5%BA%8F">事件触发顺序</a></li>
<li><a href="#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0">事件处理函数</a></li>
<li><a href="#%E5%90%91%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F%E4%BC%A0%E9%80%92%E5%8F%82%E6%95%B0">向事件处理程序传递参数</a></li>
</ul>
</li>
<li><a href="#key">key</a></li>
<li><a href="#ref">ref</a>
<ul>
<li><a href="#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-ref">何时使用 ref</a></li>
<li><a href="#refs-%E4%B8%8E%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6">Refs 与函数组件</a></li>
<li><a href="#%E5%B0%86-dom-refs-%E6%9A%B4%E9%9C%B2%E7%BB%99%E7%88%B6%E7%BB%84%E4%BB%B6">将 DOM Refs 暴露给父组件</a></li>
</ul>
</li>
<li><a href="#context">context</a>
<ul>
<li><a href="#contextconstomer-%E5%92%8C-%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6">Context.Constomer 和 函数式组件</a></li>
<li><a href="#%E5%8A%A8%E6%80%81-context">动态 context</a></li>
<li><a href="#%E5%9C%A8%E5%B5%8C%E5%A5%97%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%9B%B4%E6%96%B0-context">在嵌套组件中更新 Context</a></li>
<li><a href="#%E6%B6%88%E8%B4%B9%E5%A4%9A%E4%B8%AA-context">消费多个 Context</a></li>
<li><a href="#%E6%84%8F%E5%A4%96%E6%B8%B2%E6%9F%93">意外渲染</a></li>
</ul>
</li>
<li><a href="#%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6">高阶组件</a>
<ul>
<li><a href="#%E4%B8%8D%E8%A6%81%E6%94%B9%E5%8F%98%E5%8E%9F%E5%A7%8B%E7%BB%84%E4%BB%B6">不要改变原始组件</a></li>
<li><a href="#%E5%B0%86%E4%B8%8D%E7%9B%B8%E5%85%B3%E7%9A%84-props-%E4%BC%A0%E9%80%92%E7%BB%99%E8%A2%AB%E5%8C%85%E8%A3%B9%E7%9A%84%E7%BB%84%E4%BB%B6">将不相关的 props 传递给被包裹的组件</a></li>
<li><a href="#%E6%9C%80%E5%A4%A7%E5%8C%96%E5%8F%AF%E7%BB%84%E5%90%88%E6%80%A7">最大化可组合性</a></li>
<li><a href="#%E5%8C%85%E8%A3%85%E6%98%BE%E7%A4%BA%E5%90%8D%E7%A7%B0%E4%BB%A5%E4%BE%BF%E8%BD%BB%E6%9D%BE%E8%B0%83%E8%AF%95">包装显示名称以便轻松调试</a></li>
<li><a href="#%E4%B8%8D%E8%A6%81%E5%9C%A8-render-%E6%96%B9%E6%B3%95%E4%B8%AD%E4%BD%BF%E7%94%A8-hoc">不要在 render 方法中使用 HOC</a></li>
<li><a href="#%E5%8A%A1%E5%BF%85%E5%A4%8D%E5%88%B6%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95">务必复制静态方法</a></li>
<li><a href="#refs-%E4%B8%8D%E4%BC%9A%E8%A2%AB%E4%BC%A0%E9%80%92">Refs 不会被传递</a></li>
</ul>
</li>
<li><a href="#render-props">render props</a>
<ul>
<li><a href="#%E5%AF%B9%E6%AF%94%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6">对比高阶组件</a></li>
<li><a href="#render-prop-%E4%BC%98%E5%8C%96">render prop 优化</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="概念篇" tabindex="-1"><a class="header-anchor" href="#概念篇"><span>概念篇</span></a></h2>
<h3 id="react-的核心思想" tabindex="-1"><a class="header-anchor" href="#react-的核心思想"><span>React 的核心思想</span></a></h3>
<p>内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟 DOM，得到一颗新树，然后 Diff 新老虚拟 DOM 树，找到有变化的部分，得到一个 Change(Patch)，将这个 Patch 加入队列，最终批量更新这些 Patch 到 DOM 中。</p>
<h3 id="渲染器" tabindex="-1"><a class="header-anchor" href="#渲染器"><span>渲染器</span></a></h3>
<p>React 最初只是服务于 DOM，但是这之后被改编成也能同时支持原生平台的 <a href="https://reactnative.dev/" target="_blank" rel="noopener noreferrer">React Native</a>。因此，在 React 内部机制中引入了“渲染器”这个概念。</p>
<p><strong>渲染器用于管理一棵 React 树，使其根据底层平台进行不同的调用。</strong></p>
<h3 id="reconcilers" tabindex="-1"><a class="header-anchor" href="#reconcilers"><span>reconcilers</span></a></h3>
<p>即便 React DOM 和 React Native 渲染器的区别很大，但也需要共享一些逻辑。特别是<a href="https://zh-hans.reactjs.org/docs/reconciliation.html" target="_blank" rel="noopener noreferrer">协调</a>算法需要尽可能相似，这样可以让声明式渲染，自定义组件，state，生命周期方法和 refs 等特性，保持跨平台工作一致。</p>
<p>为了解决这个问题，不同的渲染器彼此共享一些代码。我们称 React 的这一部分为 “reconciler”。当处理类似于 <code v-pre>setState()</code> 这样的更新时，reconciler 会调用树中组件上的 <code v-pre>render()</code>，然后决定是否进行挂载，更新或是卸载操作。</p>
<p>Reconciler 没有单独的包，因为他们暂时没有公共 API。相反，它们被如 React DOM 和 React Native 的渲染器排除在外。</p>
<h3 id="stack-reconciler" tabindex="-1"><a class="header-anchor" href="#stack-reconciler"><span>Stack reconciler</span></a></h3>
<p>“stack” reconciler 是 React 15 及更早的解决方案，已经停止使用。<a href="https://zh-hans.reactjs.org/docs/implementation-notes.html" target="_blank" rel="noopener noreferrer">实现说明</a></p>
<h3 id="fiber-reconciler" tabindex="-1"><a class="header-anchor" href="#fiber-reconciler"><span>Fiber reconciler</span></a></h3>
<p>fiber reconciler 是一个新尝试，致力于解决 stack reconciler 中固有的问题，同时解决一些历史遗留问题。Fiber 从 React 16 开始变成了默认的 reconciler。
它的主要目标是：</p>
<ul>
<li>能够把可中断的任务切片处理。</li>
<li>能够调整优先级，重置并复用任务。</li>
<li>能够在父元素与子元素之间交错处理，以支持 React 中的布局。</li>
<li>能够在 <code v-pre>render()</code> 中返回多个元素。</li>
<li>更好地支持错误边界。
虽然这已经在 React 16 中启用了，但是 async 特性还没有默认开启。
<a href="https://github.com/acdlite/react-fiber-architecture" target="_blank" rel="noopener noreferrer">React Fiber 架构</a>、<a href="https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e" target="_blank" rel="noopener noreferrer">深入了解 react 中的新 reconciliation 算法</a></li>
</ul>
<h3 id="fiber-架构" tabindex="-1"><a class="header-anchor" href="#fiber-架构"><span>Fiber 架构</span></a></h3>
<p>React Fiber是对React核心算法的不断重新实现。这是React团队经过两年多研究的结晶。
它的标题功能是<strong>增量渲染</strong>：将渲染工作分成多个块并将其分布到多个帧中的能力。</p>
<h4 id="什么是-fiber" tabindex="-1"><a class="header-anchor" href="#什么是-fiber"><span>什么是 fiber?</span></a></h4>
<p>fiber 的主要目标是使React能够利用调度的优势。具体来说，我们需要能够：</p>
<ul>
<li>暂停工作，稍后再回来。</li>
<li>为不同类型的工作分配优先级。</li>
<li>重用以前完成的工作。</li>
<li>如果不再需要，则中止工作。
为了做到这一点，我们首先需要一种将工作分解成多个单元的方法。从某种意义上讲，这就是 fiber。fiber 代表<strong>工作单元</strong>。</li>
</ul>
<p>但是仅仅是分解为单元也无法做到中断任务，因为函数调用栈就是这样，每个函数为一个工作，每个工作被称为<strong>堆栈帧</strong>，它会一直工作，直到堆栈为空，无法中断。</p>
<p>所以我们需要一种增量渲染的调度，那么就需要重新实现一个堆栈帧的调度，这个堆栈帧可以按照自己的调度算法执行他们。另外由于这些堆栈是可以自己控制的，所以可以加入并发或者错误边界等功能。</p>
<p>因此 Fiber 就是重新实现的堆栈帧，本质上 Fiber 也可以理解为是一个<strong>虚拟的堆栈帧</strong>，将可中断的任务拆分成多个子任务，通过按照优先级来自由调度子任务，分段更新，从而将之前的同步渲染改为异步渲染。</p>
<p>所以我们可以说 Fiber 是一种数据结构(堆栈帧)，也可以说是一种解决可中断的调用任务的一种解决方案，它的特性就是<strong>时间分片(time slicing)<strong>和</strong>暂停(supense)</strong>。</p>
<h4 id="两个阶段的拆分" tabindex="-1"><a class="header-anchor" href="#两个阶段的拆分"><span>两个阶段的拆分</span></a></h4>
<p>每次渲染有两个阶段：<code v-pre>Reconciliation</code>(协调阶段) 和 <code v-pre>Commit</code>(提交阶段).</p>
<h5 id="reconciliation-阶段" tabindex="-1"><a class="header-anchor" href="#reconciliation-阶段"><span>Reconciliation 阶段</span></a></h5>
<p>可以认为是 Diff 阶段, <strong>这个阶段可以被中断</strong>, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为 <code v-pre>副作用</code>(Effect)。以下生命周期钩子会在协调阶段被调用：</p>
<ul>
<li>[UNSAFE_]componentWillMount（弃用）</li>
<li>[UNSAFE_]componentWillReceiveProps（弃用）</li>
<li>getDerivedStateFromProps</li>
<li>shouldComponentUpdate</li>
<li>[UNSAFE_]componentWillUpdate（弃用）</li>
<li>render</li>
</ul>
<p>在协调阶段如果时间片用完，React 就会选择让出控制权。因为协调阶段执行的工作不会导致任何用户可见的变更，所以在这个阶段让出控制权不会有什么问题。</p>
<p>需要注意的是：因为协调阶段可能被中断、恢复，甚至重做，<strong>React 协调阶段的生命周期钩子可能会被调用多次!</strong>, 例如 <code v-pre>componentWillMount</code> 可能会被调用两次。</p>
<p>因此建议 <strong>协调阶段的生命周期钩子不要包含副作用</strong>。索性 React 就废弃了这部分可能包含副作用的生命周期方法，例如<code v-pre>componentWillMount</code>、<code v-pre>componentWillUpdate</code>。</p>
<h5 id="commit-阶段" tabindex="-1"><a class="header-anchor" href="#commit-阶段"><span>Commit 阶段</span></a></h5>
<p>将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行，将 Diff 的结果反映到真实 DOM 的过程。<strong>这个阶段必须同步执行，不能被打断</strong>. 这些生命周期钩子在提交阶段被执行:</p>
<ul>
<li>getSnapshotBeforeUpdate 严格来说，这个是在进入 commit 阶段前调用</li>
<li>componentDidMount</li>
<li>componentDidUpdate</li>
<li>componentWillUnmount</li>
</ul>
<p>提交阶段必须同步执行，不能中断的吧。因为我们要正确地处理各种副作用，包括 DOM 变更、还有在<code v-pre>componentDidMount</code>中发起的异步请求、useEffect 中定义的副作用。因为有副作用，所以必须保证按照次序只调用一次，况且会有用户可以察觉到的变更, 不容差池。</p>
<blockquote>
<p>注意：</p>
<ul>
<li>reconciler 是调和器，是一个名词，可以说是 React 工作的一个模块，协调模块；</li>
<li>reconcile 是调和器调和的动作，是一个动词；</li>
<li>reconciliation 只是 reconcile 过程的第一个阶段。</li>
</ul>
</blockquote>
<h3 id="类组件" tabindex="-1"><a class="header-anchor" href="#类组件"><span>类组件</span></a></h3>
<h4 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h4>
<p><a href="https://zh-hans.reactjs.org/docs/react-component.html#commonly-used-lifecycle-methods" target="_blank" rel="noopener noreferrer">声明周期方法</a></p>
<ul>
<li>constructor</li>
<li>static getDerivedStateFromProps</li>
<li>render</li>
<li>componentDidMount</li>
<li>shouldComponentUpdate</li>
<li>getSnapshotBeforeUpdate</li>
<li>componentDidUpdate</li>
<li>componentWillUnmount</li>
</ul>
<h4 id="setstate" tabindex="-1"><a class="header-anchor" href="#setstate"><span>setState</span></a></h4>
<p><code v-pre>setState()</code> 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。</p>
<p><code v-pre>setState()</code> 并不总是立即更新组件。它会批量推迟更新。这使得在调用 <code v-pre>setState()</code> 后立即读取 <code v-pre>this.state</code> 成为了隐患。为了消除隐患，请使用 <code v-pre>componentDidUpdate</code> 或者 <code v-pre>setState</code> 的回调函数（<code v-pre>setState(updater, callback)</code>），这两种方式都可以保证在应用更新后触发。</p>
<p>除非 <code v-pre>shouldComponentUpdate()</code> 返回 <code v-pre>false</code>，否则 <code v-pre>setState()</code> 将始终执行重新渲染操作。</p>
<p>如需基于之前的 state 来设置当前的 state，updater 可以传递函数</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token literal-property property">quantity</span><span class="token operator">:</span> state<span class="token punctuation">.</span>quantity <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意以下几点：</p>
<ul>
<li>不要直接修改 state</li>
<li>state 的更新可能是异步的</li>
<li>state 的更新会被合并</li>
</ul>
<h4 id="forceupdate" tabindex="-1"><a class="header-anchor" href="#forceupdate"><span>forceUpdate</span></a></h4>
<p>强制让组件重新渲染，一般不要使用，作为最后的手段</p>
<h4 id="static-defaultprops" tabindex="-1"><a class="header-anchor" href="#static-defaultprops"><span>static defaultProps</span></a></h4>
<p>一般封装组件用，设置组件 props 的默认值</p>
<h4 id="static-displayname" tabindex="-1"><a class="header-anchor" href="#static-displayname"><span>static displayName</span></a></h4>
<p>用于调试工具显示的组件名，一般不需要管它。但是在高阶组件、Context.Provider 中需要手动处理。</p>
<p>约定命名：</p>
<ul>
<li>高阶组件，例如：WithAuth(Home)</li>
<li>Context，例如：MyDisplayName.Provider, MyDisplayName.Consumer</li>
<li>React.forwardRef，例如：ForwardRef(myFunction)。</li>
</ul>
<h3 id="函数式组件" tabindex="-1"><a class="header-anchor" href="#函数式组件"><span>函数式组件</span></a></h3>
<p>没有生命周期的组件，函数内容就相当于是 render 方法。</p>
<p>利用 hooks api 可以方便的在函数组件中复用逻辑。</p>
<h3 id="事件处理" tabindex="-1"><a class="header-anchor" href="#事件处理"><span>事件处理</span></a></h3>
<p>React 元素的事件处理和 DOM 原生事件有些区别：</p>
<ul>
<li>React 事件的命名采用小驼峰式（camelCase），而不是纯小写。</li>
<li>使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。</li>
<li>阻止默认行为需要显示调用 <code v-pre>e.preventDefault()</code>，而不是返回 <code v-pre>false</code>。</li>
</ul>
<h4 id="合成事件" tabindex="-1"><a class="header-anchor" href="#合成事件"><span>合成事件</span></a></h4>
<p>在上面，<code v-pre>e</code> 是一个合成事件，称为 <code v-pre>SyntheticEvent</code>，它将被传递给事件处理函数。它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 <code v-pre>stopPropagation()</code> 和 <code v-pre>preventDefault()</code>。需要使用浏览器的底层事件时，使用 <code v-pre>e.nativeEvent</code> 属性来获取即可。</p>
<h4 id="事件触发顺序" tabindex="-1"><a class="header-anchor" href="#事件触发顺序"><span>事件触发顺序</span></a></h4>
<p>React 利用了事件委托机制，将所有事件绑定到了 <code v-pre>document</code> 之上。当一个元素同时绑定原生事件和 react 事件时，原生事件先执行，冒泡到 <code v-pre>document</code> 上再执行 react 事件。</p>
<h4 id="事件处理函数" tabindex="-1"><a class="header-anchor" href="#事件处理函数"><span>事件处理函数</span></a></h4>
<p>事件处理函数中的 <code v-pre>this</code> 需要自行处理，一般使用箭头函数 或者 <code v-pre>bind</code> 来正确绑定 <code v-pre>this</code>。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">LoginButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token comment">// 在构造器中使用 bind 绑定</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>handleClickBinded <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleClick</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token comment">// 这里的 this 是 undefined</span></span>
<span class="line"> <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this is:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token comment">// 直接使用箭头函数定义 handleClick</span></span>
<span class="line"> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this is:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">       Click me</span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般不推荐在 JSX 中绑定 this，每次渲染都会创建不同的回调函数。如果该回调函数作为 prop 传入子组件时，会导致子组件额外的重新渲染。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">LoginButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// 不可取，每次渲染会创建不同的回调函数</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">       Click me</span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="向事件处理程序传递参数" tabindex="-1"><a class="header-anchor" href="#向事件处理程序传递参数"><span>向事件处理程序传递参数</span></a></h4>
<p>在循环中，通常我们会为事件处理函数传递额外的参数。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">deleteRow</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>Delete Row<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line"><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">deleteRow</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>Delete Row<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这两种情况下，React 的事件对象 <code v-pre>e</code> 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 <code v-pre>bind</code> 的方式，事件对象以及更多的参数将会被隐式的进行传递。</p>
<p>除了使用箭头函数和 bind 函数传递参数之外，还可以使用 data-attributes 传递参数。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">deleteRow</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>id<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>deleteRow<span class="token punctuation">}</span> data<span class="token operator">-</span>id<span class="token operator">=</span><span class="token punctuation">{</span>id<span class="token punctuation">}</span><span class="token operator">></span>Delete Row<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="key" tabindex="-1"><a class="header-anchor" href="#key"><span>key</span></a></h3>
<p>key 是在创建元素数组时，需要用到的一个特殊字符串属性。key 帮助 React 识别出被修改、添加或删除的 item。应当给数组内的每个元素都设定 key，以使元素具有固定身份标识。react 会在渲染中复用相同 key 属性的标签。</p>
<h3 id="ref" tabindex="-1"><a class="header-anchor" href="#ref"><span>ref</span></a></h3>
<p>React 支持一个特殊的、可以附加到任何组件上的 <code v-pre>ref</code> 属性。此属性可以是一个由 <code v-pre>React.createRef()</code> 或者 <code v-pre>React.useRef()</code> 创建的对象，也可以是一个回调函数。当 <code v-pre>ref</code> 属性是一个回调函数时，此函数会（根据元素的类型）接收底层 DOM 元素或 class 实例作为其参数。这能够让你直接访问 DOM 元素或组件实例。</p>
<p>ref 的值根据节点的类型而有所不同：</p>
<ul>
<li>当 <code v-pre>ref</code> 属性用于 HTML 元素时，构造函数中使用 <code v-pre>React.createRef()</code> 创建的 <code v-pre>ref</code> 接收底层 DOM 元素作为其 <code v-pre>current</code> 属性。</li>
<li>当 <code v-pre>ref</code> 属性用于自定义 class 组件时，<code v-pre>ref</code> 对象接收组件的挂载实例作为其 <code v-pre>current</code> 属性。</li>
<li><strong>不能在函数组件上使用 <code v-pre>ref</code> 属性</strong>，因为他们没有实例。</li>
</ul>
<h4 id="何时使用-ref" tabindex="-1"><a class="header-anchor" href="#何时使用-ref"><span>何时使用 ref</span></a></h4>
<ul>
<li>管理焦点，文本选择或媒体播放。</li>
<li>触发强制动画。</li>
<li>集成第三方 DOM 库。</li>
</ul>
<p>避免使用 refs 来做任何可以通过声明式实现来完成的事情。</p>
<p>例如，避免在 <code v-pre>Modal</code> 组件里暴露 <code v-pre>open()</code> 和 <code v-pre>close()</code> 方法，最好传递 <code v-pre>visible</code> 属性。</p>
<h4 id="refs-与函数组件" tabindex="-1"><a class="header-anchor" href="#refs-与函数组件"><span>Refs 与函数组件</span></a></h4>
<p><strong>虽然不能在函数组件上使用 <code v-pre>ref</code> 属性，但是函数组件内部可以使用 <code v-pre>ref</code> 属性的</strong>，只要它指向一个 DOM 元素或 class 组件。</p>
<h4 id="将-dom-refs-暴露给父组件" tabindex="-1"><a class="header-anchor" href="#将-dom-refs-暴露给父组件"><span>将 DOM Refs 暴露给父组件</span></a></h4>
<p>有些情况我们需要在父组件引用子组件内的 dom，有两种方法：</p>
<ul>
<li>使用不同于 <code v-pre>ref</code> 名字的键代替</li>
<li>使用 <code v-pre>React.forwardRef()</code> 进行 <code v-pre>ref</code> 转发</li>
</ul>
<p>第一种，一般使用诸如 <code v-pre>inputRef</code> 之类的名字代替 <code v-pre>ref</code></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">CustomTextInput</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">   <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span>input ref<span class="token operator">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>inputRef<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>inputElement <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>CustomTextInput inputRef<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>inputElement<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种，使用 <code v-pre>React.forwardRef()</code>（16.3+ 版本）</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> CustomTextInput <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> ref</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line"> <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">   <span class="token operator">&lt;</span>input ref<span class="token operator">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"> <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>inputElement <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>CustomTextInput ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>inputElement<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="context" tabindex="-1"><a class="header-anchor" href="#context"><span>context</span></a></h3>
<p>Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：UI 尺寸，UI 主题，locale），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。</p>
<p>使用 context, 可以避免通过中间元素传递 props：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。</span></span>
<span class="line"><span class="token comment">// 为当前的 theme 创建一个 context（“light”为默认值）。</span></span>
<span class="line"><span class="token keyword">const</span> ThemeContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token string">'light'</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// 使用一个 Provider 来将当前的 theme 传递给以下的组件树。</span></span>
<span class="line">   <span class="token comment">// 无论多深，任何组件都能读取这个值。</span></span>
<span class="line">   <span class="token comment">// 在这个例子中，我们将 “dark” 作为当前的值传递下去。</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token string">"dark"</span><span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span>Toolbar <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Provider<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 中间的组件再也不必指明往下传递 theme 了。</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Toolbar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">   <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span>ThemedButton <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">ThemedButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token comment">// 指定 contextType 读取当前的 theme context。</span></span>
<span class="line"> <span class="token comment">// React 会往上找到最近的 theme Provider，然后使用它的值。</span></span>
<span class="line"> <span class="token comment">// 在这个例子中，当前的 theme 值为 “dark”。</span></span>
<span class="line"> <span class="token keyword">static</span> contextType <span class="token operator">=</span> ThemeContext <span class="token comment">// 新语法</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token operator">&lt;</span>Button theme<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">ThemedButton<span class="token punctuation">.</span>contextType <span class="token operator">=</span> ThemeContext <span class="token comment">// 旧语法</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本流程：</p>
<ul>
<li>使用 React.createContext(defaultValue) 创建一个 context</li>
<li>使用 Context.Provider 生产组件提供 value 属性</li>
<li>在需要 value 的组件中，将 Context 对象赋值给 class 组件的静态属性 contextType，然后可以通过 this.context 访问到 Context 上的那个值。</li>
</ul>
<h4 id="context-constomer-和-函数式组件" tabindex="-1"><a class="header-anchor" href="#context-constomer-和-函数式组件"><span>Context.Constomer 和 函数式组件</span></a></h4>
<p>函数式组件没有静态属性 contextType，使用 Context.Constomer 消费组件代替。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>MyContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line">  <span class="token punctuation">{</span><span class="token parameter">value</span> <span class="token operator">=></span> <span class="token comment">/* 基于 context 值进行渲染*/</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>MyContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。</p>
<p>这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 <code v-pre>value</code> 值等同于往上组件树离这个 context 最近的 Provider 提供的 <code v-pre>value</code> 值。如果没有对应的 Provider，<code v-pre>value</code> 参数等同于传递给 <code v-pre>createContext()</code> 的 <code v-pre>defaultValue</code>。</p>
<h4 id="动态-context" tabindex="-1"><a class="header-anchor" href="#动态-context"><span>动态 context</span></a></h4>
<p>动态 context 的 value 是变化的，下面是动态的例子：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> themes <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">light</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token literal-property property">foreground</span><span class="token operator">:</span> <span class="token string">'#000000'</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">'#eeeeee'</span></span>
<span class="line"> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"> <span class="token literal-property property">dark</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token literal-property property">foreground</span><span class="token operator">:</span> <span class="token string">'#ffffff'</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">'#222222'</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> ThemeContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>themes<span class="token punctuation">.</span>dark<span class="token comment">/* 默认值 */</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">ThemedButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props</span>
<span class="line">   <span class="token keyword">const</span> theme <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>context</span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>button</span>
<span class="line">       <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span></span>
<span class="line">       style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> theme<span class="token punctuation">.</span>background<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">     <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">ThemedButton<span class="token punctuation">.</span>contextType <span class="token operator">=</span> ThemeContext</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 一个使用 ThemedButton 的中间组件</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Toolbar</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">   <span class="token operator">&lt;</span>ThemedButton onClick<span class="token operator">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>changeTheme<span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">     Change Theme</span>
<span class="line">   <span class="token operator">&lt;</span><span class="token operator">/</span>ThemedButton<span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token literal-property property">theme</span><span class="token operator">:</span> themes<span class="token punctuation">.</span>light</span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">toggleTheme</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">state</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">theme</span><span class="token operator">:</span></span>
<span class="line">         state<span class="token punctuation">.</span>theme <span class="token operator">===</span> themes<span class="token punctuation">.</span>dark</span>
<span class="line">           <span class="token operator">?</span> themes<span class="token punctuation">.</span>light</span>
<span class="line">           <span class="token operator">:</span> themes<span class="token punctuation">.</span>dark</span>
<span class="line">     <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，</span></span>
<span class="line">   <span class="token comment">// 而外部的组件使用默认的 theme 值</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>Page<span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>theme<span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">         <span class="token operator">&lt;</span>Toolbar changeTheme<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>toggleTheme<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Provider<span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span>Section<span class="token operator">></span></span>
<span class="line">         <span class="token operator">&lt;</span>ThemedButton <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span><span class="token operator">/</span>Section<span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>Page<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在嵌套组件中更新-context" tabindex="-1"><a class="header-anchor" href="#在嵌套组件中更新-context"><span>在嵌套组件中更新 Context</span></a></h4>
<p>从一个在组件树中嵌套很深的组件中更新 context 是很常见的。可以通过 context 传递一个函数，使得 consumers 组件更新 context：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！</span></span>
<span class="line"><span class="token keyword">const</span> ThemeContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">theme</span><span class="token operator">:</span> themes<span class="token punctuation">.</span>dark<span class="token punctuation">,</span></span>
<span class="line"> <span class="token function-variable function">toggleTheme</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">ThemeTogglerButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token comment">// Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">   <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line">     <span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>theme<span class="token punctuation">,</span> toggleTheme<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line">       <span class="token operator">&lt;</span>button</span>
<span class="line">         onClick<span class="token operator">=</span><span class="token punctuation">{</span>toggleTheme<span class="token punctuation">}</span></span>
<span class="line">         style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> theme<span class="token punctuation">.</span>background<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">       <span class="token operator">></span></span>
<span class="line">         Toggle Theme</span>
<span class="line">       <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line">     <span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">   <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Content</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">   <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span>ThemeTogglerButton <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">toggleTheme</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">state</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">theme</span><span class="token operator">:</span></span>
<span class="line">         state<span class="token punctuation">.</span>theme <span class="token operator">===</span> themes<span class="token punctuation">.</span>dark</span>
<span class="line">           <span class="token operator">?</span> themes<span class="token punctuation">.</span>light</span>
<span class="line">           <span class="token operator">:</span> themes<span class="token punctuation">.</span>dark</span>
<span class="line">     <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token comment">// State 也包含了更新函数，因此它会被传递进 context provider。</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token literal-property property">theme</span><span class="token operator">:</span> themes<span class="token punctuation">.</span>light<span class="token punctuation">,</span></span>
<span class="line">     <span class="token literal-property property">toggleTheme</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>toggleTheme</span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// 整个 state 都被传递进 provider</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span>Content <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Provider<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>区别于上节的写法，toggleTheme 分别通过 props 和 context 传递。</p>
<h4 id="消费多个-context" tabindex="-1"><a class="header-anchor" href="#消费多个-context"><span>消费多个 Context</span></a></h4>
<p>context 可以嵌套多个使用。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// Theme context</span></span>
<span class="line"><span class="token keyword">const</span> ThemeContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token string">'light'</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 用户登录 context</span></span>
<span class="line"><span class="token keyword">const</span> UserContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Guest'</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> <span class="token punctuation">{</span>signedInUser<span class="token punctuation">,</span> theme<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props</span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 提供初始 context 值的 App 组件</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">      <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span>theme<span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">        <span class="token operator">&lt;</span>UserContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span>signedInUser<span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">          <span class="token operator">&lt;</span>Layout <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">        <span class="token operator">&lt;</span><span class="token operator">/</span>UserContext<span class="token punctuation">.</span>Provider<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Provider<span class="token operator">></span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Layout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token operator">&lt;</span>div<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>Sidebar <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>Content <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 一个组件可能会消费多个 context</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">Content</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line">      <span class="token punctuation">{</span><span class="token parameter">theme</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line">        <span class="token operator">&lt;</span>UserContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line">          <span class="token punctuation">{</span><span class="token parameter">user</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line">            <span class="token operator">&lt;</span>ProfilePage user<span class="token operator">=</span><span class="token punctuation">{</span>user<span class="token punctuation">}</span> theme<span class="token operator">=</span><span class="token punctuation">{</span>theme<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">          <span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token operator">&lt;</span><span class="token operator">/</span>UserContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line">      <span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span></span>
<span class="line">  <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="意外渲染" tabindex="-1"><a class="header-anchor" href="#意外渲染"><span>意外渲染</span></a></h4>
<p>当 Provider 的 <code v-pre>value</code> 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 <code v-pre>shouldComponentUpdate</code> 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
当传递对象给 <code v-pre>value</code> 时，provider 的父组件进行重渲染可能会在 consumers 组件中触发意外的渲染。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// value 属性总是被赋值为新的对象</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>MyContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">something</span><span class="token operator">:</span> <span class="token string">'something'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span>Toolbar <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>MyContext<span class="token punctuation">.</span>Provider<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了防止这种情况，将 value 状态提升到父节点的 state 里：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">something</span><span class="token operator">:</span> <span class="token string">'something'</span><span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>value<span class="token punctuation">}</span><span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span>Toolbar <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高阶组件" tabindex="-1"><a class="header-anchor" href="#高阶组件"><span>高阶组件</span></a></h3>
<p>高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。<strong>高阶组件是参数为组件，返回值为新组件的函数。</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 此函数接收一个组件...</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">withSubscription</span><span class="token punctuation">(</span><span class="token parameter">WrappedComponent<span class="token punctuation">,</span> selectData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token comment">// ...并返回另一个组件...</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token class-name">extends</span> React<span class="token punctuation">.</span>Component <span class="token punctuation">{</span></span>
<span class="line">   <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span>handleChange <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleChange</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token function">selectData</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">,</span> props<span class="token punctuation">)</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token comment">// ...负责订阅相关的操作...</span></span>
<span class="line">     dataSource<span class="token punctuation">.</span><span class="token function">addChangeListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleChange<span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     dataSource<span class="token punctuation">.</span><span class="token function">removeChangeListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleChange<span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token function">handleChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token function">selectData</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span></span>
<span class="line">     <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token comment">// ... 并使用新数据渲染被包装的组件!</span></span>
<span class="line">     <span class="token comment">// 请注意，我们可能还会传递其他属性</span></span>
<span class="line">     <span class="token keyword">return</span> <span class="token operator">&lt;</span>WrappedComponent data<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>data<span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="不要改变原始组件" tabindex="-1"><a class="header-anchor" href="#不要改变原始组件"><span>不要改变原始组件</span></a></h4>
<p>不要试图在 HOC 中修改组件原型（或以其他方式改变它）。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">logProps</span><span class="token punctuation">(</span><span class="token parameter">InputComponent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token class-name">InputComponent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">componentDidUpdate</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">prevProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Current props: '</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span></span>
<span class="line">   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Previous props: '</span><span class="token punctuation">,</span> prevProps<span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token keyword">return</span> InputComponent</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 每次调用 logProps 时，增强组件都会有 log 输出。</span></span>
<span class="line"><span class="token keyword">const</span> EnhancedComponent <span class="token operator">=</span> <span class="token function">logProps</span><span class="token punctuation">(</span>InputComponent<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的做法导致传入组件的 <code v-pre>componentDidUpdate</code> 生命周期被污染，只能覆盖原来的重新写入新的逻辑，对于函数式组件也无法使用。</p>
<h4 id="将不相关的-props-传递给被包裹的组件" tabindex="-1"><a class="header-anchor" href="#将不相关的-props-传递给被包裹的组件"><span>将不相关的 props 传递给被包裹的组件</span></a></h4>
<p>HOC 应该透传与自身无关的 props。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token comment">// 过滤掉非此 HOC 额外的 props，且不要进行透传</span></span>
<span class="line"> <span class="token keyword">const</span> <span class="token punctuation">{</span> extraProp<span class="token punctuation">,</span> <span class="token operator">...</span>restProps <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props</span>
<span class="line"></span>
<span class="line"> <span class="token comment">// 将 props 注入到被包装的组件中。</span></span>
<span class="line"> <span class="token comment">// 通常为 state 的值或者实例方法。</span></span>
<span class="line"> <span class="token keyword">const</span> injectedProp <span class="token operator">=</span> someStateOrInstanceMethod</span>
<span class="line"></span>
<span class="line"> <span class="token comment">// 将 props 传递给被包装组件</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">   <span class="token operator">&lt;</span>WrappedComponent</span>
<span class="line">     injectedProp<span class="token operator">=</span><span class="token punctuation">{</span>injectedProp<span class="token punctuation">}</span></span>
<span class="line">     <span class="token punctuation">{</span><span class="token operator">...</span>restProps<span class="token punctuation">}</span></span>
<span class="line">   <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="最大化可组合性" tabindex="-1"><a class="header-anchor" href="#最大化可组合性"><span>最大化可组合性</span></a></h4>
<p>为了增加 HOC 的组合性，有必要保证它们的签名一致。
React Redux 的 <code v-pre>connect</code> 函数就是最好的例子：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// connect 是一个函数，它的返回值为另外一个函数。</span></span>
<span class="line"><span class="token keyword">const</span> enhance <span class="token operator">=</span> <span class="token function">connect</span><span class="token punctuation">(</span>commentListSelector<span class="token punctuation">,</span> commentListActions<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 返回值为 HOC，它会返回已经连接 Redux store 的组件</span></span>
<span class="line"><span class="token keyword">const</span> ConnectedComment <span class="token operator">=</span> <span class="token function">enhance</span><span class="token punctuation">(</span>CommentList<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像 connect 函数返回的单参数 HOC 具有签名 Component =&gt; Component。 输出类型与输入类型相同的函数很容易组合在一起。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 常规写法</span></span>
<span class="line"><span class="token keyword">const</span> EnhancedComponent <span class="token operator">=</span> <span class="token function">withRouter</span><span class="token punctuation">(</span><span class="token function">connect</span><span class="token punctuation">(</span>commentSelector<span class="token punctuation">)</span><span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 你可以编写自己的组合工具函数，也可以使用第三方 lodash, ramda 的工具函数</span></span>
<span class="line"><span class="token comment">// compose(f, g, h) 等同于 (...args) => f(g(h(...args)))</span></span>
<span class="line"><span class="token keyword">const</span> enhance <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span></span>
<span class="line"> <span class="token comment">// 这些都是单参数的 HOC</span></span>
<span class="line"> withRouter<span class="token punctuation">,</span></span>
<span class="line"> <span class="token function">connect</span><span class="token punctuation">(</span>commentSelector<span class="token punctuation">)</span></span>
<span class="line"> <span class="token comment">// ...更多的 HOC</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> EnhancedComponent <span class="token operator">=</span> <span class="token function">enhance</span><span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用装饰器，代码可以更加简洁。</p>
<h4 id="包装显示名称以便轻松调试" tabindex="-1"><a class="header-anchor" href="#包装显示名称以便轻松调试"><span>包装显示名称以便轻松调试</span></a></h4>
<p>HOC 创建的容器组件会显示在 <code v-pre>React Developer Tools</code> 调试工具中。如果不处理，那么容器组件将显示 <code v-pre>Anonymous</code> 。</p>
<p>最好的做法是主动命名，表明是 HOC 组件。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">withSubscription</span><span class="token punctuation">(</span><span class="token parameter">WrappedComponent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">class</span> <span class="token class-name">WithSubscription</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token comment">/* ... */</span><span class="token punctuation">}</span></span>
<span class="line"> <span class="token comment">// With 开头的 HOC 名字(被包装组件名字)</span></span>
<span class="line"> WithSubscription<span class="token punctuation">.</span>displayName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">WithSubscription(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">getDisplayName</span><span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span></span>
<span class="line"> <span class="token keyword">return</span> WithSubscription</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">getDisplayName</span><span class="token punctuation">(</span><span class="token parameter">WrappedComponent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">return</span> WrappedComponent<span class="token punctuation">.</span>displayName <span class="token operator">||</span> WrappedComponent<span class="token punctuation">.</span>name <span class="token operator">||</span> <span class="token string">'Component'</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="不要在-render-方法中使用-hoc" tabindex="-1"><a class="header-anchor" href="#不要在-render-方法中使用-hoc"><span>不要在 render 方法中使用 HOC</span></a></h4>
<p>每次调用 <code v-pre>render</code> 方法都将返回全新的组件，React 的 diff 算法会将上一次与当前组件视为不相等，导致重新渲染整个组件子树。</p>
<p>从功能来说，重新渲染组件导致该组件及子组件的状态重置，这是不应该的。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token comment">// 每次调用 render 函数都会创建一个新的 EnhancedComponent</span></span>
<span class="line"> <span class="token comment">// EnhancedComponent1 !== EnhancedComponent2</span></span>
<span class="line"> <span class="token keyword">const</span> EnhancedComponent <span class="token operator">=</span> <span class="token function">enhance</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">)</span></span>
<span class="line"> <span class="token comment">// 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token operator">&lt;</span>EnhancedComponent <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="务必复制静态方法" tabindex="-1"><a class="header-anchor" href="#务必复制静态方法"><span>务必复制静态方法</span></a></h4>
<p>有时在 React 组件上定义静态方法很有用。例如，Relay 容器暴露了一个静态方法 getFragment 以方便组合 GraphQL 片段。</p>
<p>但是，当你将 HOC 应用于组件时，原始组件将使用容器组件进行包装。这意味着新组件没有原始组件的任何静态方法。</p>
<p>目前有 3 种主流的解决方法：</p>
<ul>
<li>手动拷贝</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">enhance</span><span class="token punctuation">(</span><span class="token parameter">WrappedComponent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">class</span> <span class="token class-name">Enhance</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token comment">/*...*/</span><span class="token punctuation">}</span></span>
<span class="line"> <span class="token comment">// 必须准确知道应该拷贝哪些方法 :(</span></span>
<span class="line"> Enhance<span class="token punctuation">.</span>staticMethod <span class="token operator">=</span> WrappedComponent<span class="token punctuation">.</span>staticMethod</span>
<span class="line"> <span class="token keyword">return</span> Enhance</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要一个个列举出来，必须特别清楚有哪些方法以及需要哪些方法。</p>
<ul>
<li>使用 hoist-non-react-statics 插件拷贝所有静态方法</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> hoistNonReactStatic <span class="token keyword">from</span> <span class="token string">'hoist-non-react-statics'</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">enhance</span><span class="token punctuation">(</span><span class="token parameter">WrappedComponent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">class</span> <span class="token class-name">Enhance</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token comment">/*...*/</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">hoistNonReactStatic</span><span class="token punctuation">(</span>Enhance<span class="token punctuation">,</span> WrappedComponent<span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">return</span> Enhance</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比较方便，缺点是引入了额外的插件。</p>
<ul>
<li>单独使用</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line">MyComponent<span class="token punctuation">.</span>someFunction <span class="token operator">=</span> someFunction</span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> MyComponent</span>
<span class="line"></span>
<span class="line"><span class="token comment">// 单独导出该方法</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token punctuation">{</span> someFunction <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 在要使用的组件中，import 它们</span></span>
<span class="line"><span class="token keyword">import</span> MyComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span> someFunction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./MyComponent.js'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在第三方库中经常见到。</p>
<h4 id="refs-不会被传递" tabindex="-1"><a class="header-anchor" href="#refs-不会被传递"><span>Refs 不会被传递</span></a></h4>
<p>尽管高阶组件的约定是将所有的 props 传递给被包装组件，但是 refs 是不会被传递的，事实上， ref 并不是一个 prop，和 key 一样，它由 React 专门处理。</p>
<p>如果对 HOC 添加 ref，该 ref 将引用最外层的容器组件，而不是被包裹的组件。</p>
<p>这个问题可以通过 React.forwardRef (React 16.3中新增)来解决。在 React.forwardRef 之前，这个问题，我们可以通过给容器组件添加 forwardedRef (prop的名字自行确定，不过不能是 ref 或者是 key)。</p>
<p>使用 React.forwardRef：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">logProps</span><span class="token punctuation">(</span><span class="token parameter">Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">class</span> <span class="token class-name">LogProps</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token parameter">prevProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'old props:'</span><span class="token punctuation">,</span> prevProps<span class="token punctuation">)</span></span>
<span class="line">     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'new props:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">const</span> <span class="token punctuation">{</span>forwardedRef<span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props</span>
<span class="line"></span>
<span class="line">     <span class="token comment">// 将自定义的 prop 属性 “forwardedRef” 定义为 ref</span></span>
<span class="line">     <span class="token keyword">return</span> <span class="token operator">&lt;</span>Component ref<span class="token operator">=</span><span class="token punctuation">{</span>forwardedRef<span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token operator">...</span>rest<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token comment">// 注意 React.forwardRef 回调的第二个参数 “ref”。</span></span>
<span class="line"> <span class="token comment">// 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”</span></span>
<span class="line"> <span class="token comment">// 然后它就可以被挂载到被 LogProps 包裹的子组件上。</span></span>
<span class="line"> <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> ref</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token operator">&lt;</span>LogProps <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> forwardedRef<span class="token operator">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">FancyButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// ...</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> FancyButtonLogged <span class="token operator">=</span> <span class="token function">logProps</span><span class="token punctuation">(</span>FancyButton<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">DemoComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>buttonElement <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token comment">// ref 可以引用到真正的 FancyButton 组件，可以使用 this.buttonElement.current.focus() 调用 focus 方法</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token operator">&lt;</span>FancyButtonLogged ref<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>buttonElement<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>16.3之前，没有 React.forwardRef：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">logProps</span><span class="token punctuation">(</span><span class="token parameter">Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token class-name">LogProps</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token parameter">prevProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'old props:'</span><span class="token punctuation">,</span> prevProps<span class="token punctuation">)</span></span>
<span class="line">     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'new props:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">const</span> <span class="token punctuation">{</span>forwardedRef<span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props</span>
<span class="line"></span>
<span class="line">     <span class="token comment">// 将自定义的 prop 属性 “forwardedRef” 定义为 ref</span></span>
<span class="line">     <span class="token keyword">return</span> <span class="token operator">&lt;</span>Component ref<span class="token operator">=</span><span class="token punctuation">{</span>forwardedRef<span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token operator">...</span>rest<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">FancyButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token comment">// ...</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> FancyButtonLogged <span class="token operator">=</span> <span class="token function">logProps</span><span class="token punctuation">(</span>FancyButton<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">DemoComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span>buttonElement <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token comment">// 通过 forwardedRef prop 来引用到 FancyButton 组件</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token operator">&lt;</span>FancyButtonLogged forwardedRef<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>buttonElement<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="render-props" tabindex="-1"><a class="header-anchor" href="#render-props"><span>render props</span></a></h3>
<p>一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。</p>
<p>在父组件有个 render 的 prop，然后 render 是一个回调函数，父组件通过调用 render 方法，把父组件里面的数据（一般是 state ）带出来让业务组件使用，然后，这个回调函数返回一个 React 元素，然后渲染在父组件里面。</p>
<p>下面使用 render prop 封装了一个 ToggleModal 组件，用于 Modal 的显示隐藏：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ToggleModal</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> state <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>initialVisible</span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function-variable function">toggle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">     <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>visible</span>
<span class="line">   <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>visible<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>toggle<span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">DemoModal</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>ToggleModal</span>
<span class="line">       initialVisible<span class="token operator">=</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span></span>
<span class="line">       render<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">visible<span class="token punctuation">,</span> toggle</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line">         <span class="token operator">&lt;</span>Button type<span class="token operator">=</span><span class="token string">"primary"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span><span class="token operator">></span>Show Modal<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">></span></span>
<span class="line">         <span class="token operator">&lt;</span>Modal</span>
<span class="line">           title<span class="token operator">=</span><span class="token string">"Demo Modal"</span></span>
<span class="line">           visible<span class="token operator">=</span><span class="token punctuation">{</span>visible<span class="token punctuation">}</span></span>
<span class="line">           onOk<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span></span>
<span class="line">           onCancel<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span></span>
<span class="line">         <span class="token operator">></span></span>
<span class="line">           <span class="token operator">&lt;</span>div<span class="token operator">></span>Content<span class="token operator">...</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">         <span class="token operator">&lt;</span><span class="token operator">/</span>Modal<span class="token operator">></span></span>
<span class="line">       <span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">     <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>render prop 是因为模式才被称为 render prop，不一定要用名为 render 的 prop 来使用这种模式。任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 render prop。</p>
<p>对于上面的例子使用 children prop：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ToggleModal</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> state <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>initialVisible</span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function-variable function">toggle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">     <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>visible</span>
<span class="line">   <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>visible<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>toggle<span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">DemoModal</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token comment">// children 不需要显示添加到 Modal 的属性中，直接放在其内部</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>ToggleModal</span>
<span class="line">       initialVisible<span class="token operator">=</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span></span>
<span class="line">     <span class="token operator">></span></span>
<span class="line">       <span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">visible<span class="token punctuation">,</span> toggle</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line">         <span class="token operator">&lt;</span>Button type<span class="token operator">=</span><span class="token string">"primary"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span><span class="token operator">></span>Show Modal<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">></span></span>
<span class="line">         <span class="token operator">&lt;</span>Modal</span>
<span class="line">           title<span class="token operator">=</span><span class="token string">"Demo Modal"</span></span>
<span class="line">           visible<span class="token operator">=</span><span class="token punctuation">{</span>visible<span class="token punctuation">}</span></span>
<span class="line">           onOk<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span></span>
<span class="line">           onCancel<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span></span>
<span class="line">         <span class="token operator">></span></span>
<span class="line">           <span class="token operator">&lt;</span>div<span class="token operator">></span>Content<span class="token operator">...</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">         <span class="token operator">&lt;</span><span class="token operator">/</span>Modal<span class="token operator">></span></span>
<span class="line">       <span class="token punctuation">)</span><span class="token punctuation">}</span></span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>ToggleModal<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对比高阶组件" tabindex="-1"><a class="header-anchor" href="#对比高阶组件"><span>对比高阶组件</span></a></h4>
<p>能用高阶组件实现的，render props 都可以都可以代替。</p>
<p>高阶组件，本质上是将组件的逻辑提升到了容器组件里面，然后通过 props 传递给当前组件。</p>
<p>render props 是将名为 render 的 prop 作为函数调用，将 state 通过回调参数传递给当前组件。</p>
<p>两者可以结合使用：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// 如果你出于某种原因真的想要 HOC，那么你可以轻松实现</span></span>
<span class="line"><span class="token comment">// 使用具有 render prop 的普通组件创建一个</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">withToggle</span><span class="token punctuation">(</span><span class="token parameter">Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token class-name">extends</span> React<span class="token punctuation">.</span>Component <span class="token punctuation">{</span></span>
<span class="line">   <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">       <span class="token operator">&lt;</span>ToggleModal render<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">visible<span class="token punctuation">,</span> toggle</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span></span>
<span class="line">         <span class="token operator">&lt;</span>Component <span class="token punctuation">{</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">}</span> visible<span class="token operator">=</span><span class="token punctuation">{</span>visible<span class="token punctuation">}</span> toggle<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">       <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">     <span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="render-prop-优化" tabindex="-1"><a class="header-anchor" href="#render-prop-优化"><span>render prop 优化</span></a></h4>
<p>因为 render prop 是一个函数，所以每次组件 render 都会生成新的 render prop 函数，这将导致子组件的不必要渲染。</p>
<p>一般将 prop 声明为实例方法：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">DemoModal</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token function">renderModal</span><span class="token punctuation">(</span><span class="token parameter">visible<span class="token punctuation">,</span> toggle</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>Button type<span class="token operator">=</span><span class="token string">"primary"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span><span class="token operator">></span>Show Modal<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span>Modal</span>
<span class="line">       title<span class="token operator">=</span><span class="token string">"Demo Modal"</span></span>
<span class="line">       visible<span class="token operator">=</span><span class="token punctuation">{</span>visible<span class="token punctuation">}</span></span>
<span class="line">       onOk<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span></span>
<span class="line">       onCancel<span class="token operator">=</span><span class="token punctuation">{</span>toggle<span class="token punctuation">}</span></span>
<span class="line">     <span class="token operator">></span></span>
<span class="line">       <span class="token operator">&lt;</span>div<span class="token operator">></span>Content<span class="token operator">...</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">     <span class="token operator">&lt;</span><span class="token operator">/</span>Modal<span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">     <span class="token operator">&lt;</span>ToggleModal</span>
<span class="line">       initialVisible<span class="token operator">=</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span></span>
<span class="line">       render<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>renderModal<span class="token punctuation">}</span></span>
<span class="line">     <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


