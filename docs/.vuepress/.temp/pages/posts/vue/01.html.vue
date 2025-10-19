<template><div><ul>
<li><a href="#vue-%E6%A6%82%E5%BF%B5%E7%AF%87">Vue 概念篇</a>
<ul>
<li><a href="#%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86">响应式原理</a></li>
<li><a href="#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9">检测变化的注意事项</a></li>
<li><a href="#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97">异步更新队列</a></li>
<li><a href="#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7vs%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7">计算属性vs侦听属性</a></li>
<li><a href="#%E6%8C%87%E4%BB%A4">指令</a>
<ul>
<li><a href="#v-if-%E5%92%8C-v-show">v-if 和 v-show</a></li>
<li><a href="#v-for-%E5%92%8C-v-if-%E4%BC%98%E5%85%88%E7%BA%A7">v-for 和 v-if 优先级</a></li>
</ul>
</li>
<li><a href="#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6">事件修饰符</a></li>
<li><a href="#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model">在组件上使用 v-model</a></li>
<li><a href="#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6">.sync 修饰符</a></li>
<li><a href="#%E7%BC%93%E5%AD%98%E7%BB%84%E4%BB%B6-keep-alive">缓存组件 keep-alive</a></li>
<li><a href="#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6-component">动态组件 component</a></li>
<li><a href="#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6">异步组件</a></li>
</ul>
</li>
<li><a href="#%E5%BC%80%E5%8F%91%E5%AE%9E%E6%88%98%E7%AF%87">开发实战篇</a>
<ul>
<li><a href="#%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98">跨域问题</a>
<ul>
<li><a href="#cors">CORS</a></li>
<li><a href="#%E4%BB%A3%E7%90%86">代理</a></li>
</ul>
</li>
<li><a href="#%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E8%A7%A3%E8%80%A6">路由参数解耦</a></li>
<li><a href="#%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C">组件的自动化全局注册</a></li>
<li><a href="#%E7%BB%91%E5%AE%9A-key-%E5%80%BC">绑定 key 值</a></li>
<li><a href="#%E6%A0%B7%E5%BC%8F%E7%A9%BF%E9%80%8F%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8">样式穿透（深度作用选择器）</a></li>
<li><a href="#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8">程序化的事件侦听器</a></li>
<li><a href="#%E5%91%BD%E4%BB%A4%E5%BC%8F%E8%B0%83%E7%94%A8%E7%BB%84%E4%BB%B6">命令式调用组件</a></li>
</ul>
</li>
<li><a href="#%E4%BB%A3%E7%A0%81%E5%B1%82%E9%9D%A2%E4%BC%98%E5%8C%96">代码层面优化</a></li>
<li><a href="#vue-%E5%8F%AF%E7%94%A8%E7%9A%84%E6%B8%B2%E6%9F%93%E4%BC%98%E5%8C%96">Vue 可用的渲染优化</a></li>
<li><a href="#%E6%9E%84%E5%BB%BA%E4%BC%98%E5%8C%96">构建优化</a></li>
<li><a href="#%E9%80%9A%E7%94%A8%E4%BC%98%E5%8C%96">通用优化</a></li>
</ul>
<h2 id="vue-概念篇" tabindex="-1"><a class="header-anchor" href="#vue-概念篇"><span>Vue 概念篇</span></a></h2>
<h3 id="响应式原理" tabindex="-1"><a class="header-anchor" href="#响应式原理"><span>响应式原理</span></a></h3>
<p>Vue 将遍历 data 选项所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。
每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。</p>
<h3 id="检测变化的注意事项" tabindex="-1"><a class="header-anchor" href="#检测变化的注意事项"><span>检测变化的注意事项</span></a></h3>
<p>对于对象，Vue 无法检测 property 的添加或移除；对于数组，Vue 无法检测到直接修改数组项。
解决方法：</p>
<ul>
<li>使用 Vue.set() 方法</li>
<li>对于数组，可以使用变异方法</li>
</ul>
<h3 id="异步更新队列" tabindex="-1"><a class="header-anchor" href="#异步更新队列"><span>异步更新队列</span></a></h3>
<p>Vue 在更新 DOM 时是<strong>异步</strong>执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 <code v-pre>Promise.then</code>、<code v-pre>MutationObserver</code> 和 <code v-pre>setImmediate</code>，如果执行环境不支持，则会采用 <code v-pre>setTimeout(fn, 0)</code> 代替。</p>
<p>例如，当你设置 <code v-pre>vm.someData = 'new value'</code>，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 <code v-pre>Vue.nextTick(callback)</code>。这样回调函数将在 DOM 更新完成后被调用。</p>
<h3 id="计算属性vs侦听属性" tabindex="-1"><a class="header-anchor" href="#计算属性vs侦听属性"><span>计算属性vs侦听属性</span></a></h3>
<p>虽然在某些使用方面可以通用，但是两者有明显的区别。</p>
<ul>
<li>computed 计算属性，当前属性通过另外几个属性计算出来，具有缓存性。</li>
<li>watch 侦听属性，在当前属性变化时，主动执行异步或开销较大的操作。</li>
</ul>
<h3 id="指令" tabindex="-1"><a class="header-anchor" href="#指令"><span>指令</span></a></h3>
<p>常用的指令，v-bind、v-on、v-model、v-for、v-if、v-show、v-html
特别注意：</p>
<h4 id="v-if-和-v-show" tabindex="-1"><a class="header-anchor" href="#v-if-和-v-show"><span>v-if 和 v-show</span></a></h4>
<p>v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；v-show 只是简单切换元素的 css 属性。
v-if 也是惰性的：如果在初始渲染时条件为假，一直到条件第一次变为真时，才会开始渲染条件块；v-show 不管初始条件是什么，元素总是会被渲染。
v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。</p>
<h4 id="v-for-和-v-if-优先级" tabindex="-1"><a class="header-anchor" href="#v-for-和-v-if-优先级"><span>v-for 和 v-if 优先级</span></a></h4>
<p>当处于同一节点时，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。在 vscode 编辑器中，如果在一个节点上同时使用 v-for 和 v-if，编辑器会报错，这对性能是不利的。
正确做法：</p>
<ul>
<li>如果可以，将 v-if 提升到外层节点</li>
<li>先将列表数据过滤出来，使用数组 filter 方法返回需要的数据</li>
</ul>
<h3 id="事件修饰符" tabindex="-1"><a class="header-anchor" href="#事件修饰符"><span>事件修饰符</span></a></h3>
<p>常用的事件修饰符</p>
<ul>
<li>.stop</li>
<li>.prevent</li>
<li>.captrue</li>
<li>.self</li>
<li>.enter</li>
<li>.esc</li>
<li>.number: v-model 专用</li>
<li>.trim: v-model 专用</li>
</ul>
<h3 id="在组件上使用-v-model" tabindex="-1"><a class="header-anchor" href="#在组件上使用-v-model"><span>在组件上使用 v-model</span></a></h3>
<p>在组件上使用 v-model，组件内的 <code v-pre>&lt;input&gt;</code>（可能是别的表单标签） 必须：</p>
<ul>
<li>将其 <code v-pre>value</code> attribute 绑定到一个名叫 <code v-pre>value</code> 的 prop 上</li>
<li>在其 <code v-pre>input</code> 事件被触发时，将新的值通过自定义的 <code v-pre>input</code> 事件抛出</li>
</ul>
<h3 id="sync-修饰符" tabindex="-1"><a class="header-anchor" href="#sync-修饰符"><span>.sync 修饰符</span></a></h3>
<p>在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件都没有明显的变更来源。
推荐以 <code v-pre>update:myPropName</code> 的模式触发事件取而代之。例如，在一个包含 <code v-pre>title</code> prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'update:title'</span><span class="token punctuation">,</span> newTitle<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>text<span class="token operator">-</span>document</span>
<span class="line"> v<span class="token operator">-</span>bind<span class="token operator">:</span>title<span class="token operator">=</span><span class="token string">"doc.title"</span></span>
<span class="line"> v<span class="token operator">-</span>on<span class="token operator">:</span>update<span class="token operator">:</span>title<span class="token operator">=</span><span class="token string">"doc.title = $event"</span></span>
<span class="line"><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>text<span class="token operator">-</span>document<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了方便，这种模式提供一个缩写，即 <code v-pre>.sync</code> 修饰符：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>text<span class="token operator">-</span>document v<span class="token operator">-</span>bind<span class="token operator">:</span>title<span class="token punctuation">.</span>sync<span class="token operator">=</span><span class="token string">"doc.title"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>text<span class="token operator">-</span>document<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="缓存组件-keep-alive" tabindex="-1"><a class="header-anchor" href="#缓存组件-keep-alive"><span>缓存组件 keep-alive</span></a></h3>
<p>keep-alive 主要是为了保持组件的状态，以避免反复重渲染导致的性能问题。使用 keep-alive 包裹后的组件，会多出
<code v-pre>activated</code>、<code v-pre>deactivated</code> 两个生命周期。</p>
<h3 id="动态组件-component" tabindex="-1"><a class="header-anchor" href="#动态组件-component"><span>动态组件 component</span></a></h3>
<p>渲染一个“元组件”为动态组件。依 <code v-pre>is</code> 的值，来决定哪个组件被渲染。</p>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token comment">&lt;!-- 动态组件由 vm 实例的 `componentName` property 控制 --></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>componentName<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异步组件" tabindex="-1"><a class="header-anchor" href="#异步组件"><span>异步组件</span></a></h3>
<p>在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。我们可以使用工厂函数定义组件，这个工厂函数会异步解析组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。
老语法：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line">Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'async-webpack-example'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 这个特殊的 `require` 语法将会告诉 webpack</span></span>
<span class="line">  <span class="token comment">// 自动将你的构建代码切割成多个包，这些包会通过 Ajax 请求加载</span></span>
<span class="line">  <span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'./my-async-component'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> resolve<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack2+ 新语法：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line">Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span></span>
<span class="line">   <span class="token string">'async-webpack-example'</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token comment">// 这个动态导入会返回一个 `Promise` 对象。</span></span>
<span class="line">   <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./my-async-component'</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开发实战篇" tabindex="-1"><a class="header-anchor" href="#开发实战篇"><span>开发实战篇</span></a></h2>
<h3 id="跨域问题" tabindex="-1"><a class="header-anchor" href="#跨域问题"><span>跨域问题</span></a></h3>
<p>开发中首要问题，解决跨域。主流方案一般两种： CORS 和 代理</p>
<h4 id="cors" tabindex="-1"><a class="header-anchor" href="#cors"><span>CORS</span></a></h4>
<p>由后端配置，前端不用做任何配置，正常调用接口即可。
node express 配置示例：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line">app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line"> res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Origin'</span><span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">)</span></span>
<span class="line"> res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Methods'</span><span class="token punctuation">,</span> <span class="token string">'OPTIONS,GET,PUT,POST,DELETE,PATCH'</span><span class="token punctuation">)</span></span>
<span class="line"> res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Headers'</span><span class="token punctuation">,</span> <span class="token string">'Content-Type,X-Requested-With,Authorization'</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="代理" tabindex="-1"><a class="header-anchor" href="#代理"><span>代理</span></a></h4>
<p>后端不用处理，由前端进行配置。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// vue.config.js</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token string-property property">'/api'</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">'http://localhost:3000'</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">         <span class="token string-property property">'^/api'</span><span class="token operator">:</span> <span class="token string">'/'</span></span>
<span class="line">       <span class="token punctuation">}</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// axios 封装文件，request.js</span></span>
<span class="line"><span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token string">'/api'</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上只是针对于开发环境的配置，如果是生产环境，静态服务器也需要配置。
nginx 示例：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line"># 对于后端接口没有统一前缀的情况</span>
<span class="line">location /api/ {</span>
<span class="line">   proxy_pass http://localhost:3000/;</span>
<span class="line">}</span>
<span class="line"># 对于后端接口有统一前缀的情况</span>
<span class="line">location /api {</span>
<span class="line">   proxy_pass http://localhost:3000/api;</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="路由参数解耦" tabindex="-1"><a class="header-anchor" href="#路由参数解耦"><span>路由参数解耦</span></a></h3>
<p>在组件中使用 <code v-pre>$route</code> 接收参数会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。</p>
<p>$route 接收参数:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;div>User {{ $route.params.id }}&lt;/div>'</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/user/:id'</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> User <span class="token punctuation">}</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>props</code> 解耦：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'id'</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;div>User {{ id }}&lt;/div>'</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line"> <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">   <span class="token comment">// props 支持布尔值，对象，函数多种方式</span></span>
<span class="line">   <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/user/:id'</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> User<span class="token punctuation">,</span> <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">   <span class="token comment">// 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：</span></span>
<span class="line">   <span class="token punctuation">{</span></span>
<span class="line">     <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/user/:id'</span><span class="token punctuation">,</span></span>
<span class="line">     <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token keyword">default</span><span class="token operator">:</span> User<span class="token punctuation">,</span> <span class="token literal-property property">sidebar</span><span class="token operator">:</span> Sidebar <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">     <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组件的自动化全局注册" tabindex="-1"><a class="header-anchor" href="#组件的自动化全局注册"><span>组件的自动化全局注册</span></a></h3>
<p>大量的引用和注册全局组件太麻烦，可以通过 webpack 的 require.context 来自动导入。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span></span>
<span class="line"><span class="token keyword">import</span> upperFirst <span class="token keyword">from</span> <span class="token string">'lodash/upperFirst'</span></span>
<span class="line"><span class="token keyword">import</span> camelCase <span class="token keyword">from</span> <span class="token string">'lodash/camelCase'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> requireComponent <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span></span>
<span class="line"> <span class="token comment">// 其组件目录的路径</span></span>
<span class="line"> <span class="token string">'./components'</span><span class="token punctuation">,</span></span>
<span class="line"> <span class="token comment">// 是否查询其子目录</span></span>
<span class="line"> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line"> <span class="token comment">// 匹配基础组件文件名的正则表达式</span></span>
<span class="line"> <span class="token operator">/</span>\w<span class="token operator">+</span>\<span class="token punctuation">.</span><span class="token punctuation">(</span>vue<span class="token operator">|</span>js<span class="token punctuation">)</span>$<span class="token operator">/</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">requireComponent<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fileName</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token comment">// 获取组件配置</span></span>
<span class="line"> <span class="token keyword">const</span> componentConfig <span class="token operator">=</span> <span class="token function">requireComponent</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"> <span class="token comment">// 获取组件的 PascalCase 命名</span></span>
<span class="line"> <span class="token keyword">const</span> componentName <span class="token operator">=</span> <span class="token function">upperFirst</span><span class="token punctuation">(</span></span>
<span class="line">   <span class="token function">camelCase</span><span class="token punctuation">(</span></span>
<span class="line">     <span class="token comment">// 获取和目录深度无关的文件名</span></span>
<span class="line">     fileName</span>
<span class="line">       <span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span></span>
<span class="line">       <span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">       <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.\w+$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"> <span class="token comment">// 全局注册组件</span></span>
<span class="line"> Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span></span>
<span class="line">   <span class="token comment">// 加上统一前缀，表明是全局组件</span></span>
<span class="line">   <span class="token string">'Com'</span> <span class="token operator">+</span> componentName<span class="token punctuation">,</span></span>
<span class="line">   <span class="token comment">// 如果这个组件选项是通过 `export default` 导出的，</span></span>
<span class="line">   <span class="token comment">// 那么就会优先使用 `.default`，</span></span>
<span class="line">   <span class="token comment">// 否则回退到使用模块的根。</span></span>
<span class="line">   componentConfig<span class="token punctuation">.</span>default <span class="token operator">||</span> componentConfig</span>
<span class="line"> <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="绑定-key-值" tabindex="-1"><a class="header-anchor" href="#绑定-key-值"><span>绑定 key 值</span></a></h3>
<p>在使用 v-for 进行列表渲染时，需要同时加上 key 值，Vue 会复用 key 值相同的标签，以提高渲染效率。</p>
<p>不同路由使用同一个组件，Vue 会复用这个组件，在路由跳转时，不会重新渲染组件。如果需要触发重新渲染，可以在 router-view 上加上不同的 key，可以是路由路径 <code v-pre>:key=&quot;$route.path&quot;</code>，这样每次路由跳转组件都会重新渲染。</p>
<h3 id="样式穿透-深度作用选择器" tabindex="-1"><a class="header-anchor" href="#样式穿透-深度作用选择器"><span>样式穿透（深度作用选择器）</span></a></h3>
<p>当 <code v-pre>&lt;style&gt;</code> 标签有 <code v-pre>scoped</code> 属性时，它的 CSS 只作用于当前组件中的元素。当我们使用 scoped 时，样式只会作用到当前组件，如果要修改当前组件的子组件的样式，那么就要用到样式穿透。</p>
<p>使用 <code v-pre>&gt;&gt;&gt;</code> 操作符：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">&lt;style scoped></span>
<span class="line">.a >>> .b { /* ... */ }</span>
<span class="line">&lt;/style></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将会编译成：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">.a[data-v-587b5356] .b { /* ... */ }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>sass 预处理器无法正确解析 <code v-pre>&gt;&gt;&gt;</code> 操作符，会抛出编译错误。可以使用 <code v-pre>/deep/</code> 或 <code v-pre>::v-deep</code> 操作符代替，两者都是 <code v-pre>&gt;&gt;&gt;</code> 的别名，都可以正常工作。</p>
<blockquote>
<p>推荐使用 ::v-deep ， /deep/ 已经是废弃的标准，不建议使用了</p>
</blockquote>
<h3 id="程序化的事件侦听器" tabindex="-1"><a class="header-anchor" href="#程序化的事件侦听器"><span>程序化的事件侦听器</span></a></h3>
<p>Vue 实例在其事件接口中提供了一系列方法：</p>
<ul>
<li><code v-pre>$on(eventName, eventHandler)</code> 侦听一个事件</li>
<li><code v-pre>$once(eventName, eventHandler)</code> 一次性侦听一个事件</li>
<li><code v-pre>$off(eventName, eventHandler)</code> 停止侦听一个事件</li>
</ul>
<p>一般不会用到这些，但是如果需要在一个组件实例上手动侦听事件时，它们是派得上用场的。</p>
<p>例如，经常使用第三方插件的代码可能是：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line">   <span class="token comment">// 一次性将这个日期选择器附加到一个输入框上</span></span>
<span class="line">   <span class="token comment">// 它会被挂载到 DOM 上。</span></span>
<span class="line">   <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token comment">// Pikaday 是一个第三方日期选择器的库</span></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span>picker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Pikaday</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">field</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>input<span class="token punctuation">,</span></span>
<span class="line">       <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">'YYYY-MM-DD'</span></span>
<span class="line">     <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token comment">// 在组件被销毁之前，也销毁这个日期选择器。</span></span>
<span class="line">   <span class="token function">beforeDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span>picker<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是一般插件的使用模式，存在两个潜在问题：</p>
<ul>
<li>需要在组件实例中保存 <code v-pre>picker</code>，如果可以的话最好只有生命周期钩子可以访问到它。</li>
<li>我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。</li>
</ul>
<p>可以通过一个程序化的侦听器解决这两个问题：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line">   <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">const</span> picker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Pikaday</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">field</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>input<span class="token punctuation">,</span></span>
<span class="line">       <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">'YYYY-MM-DD'</span></span>
<span class="line">     <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">     <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$once</span><span class="token punctuation">(</span><span class="token string">'hook:beforeDestroy'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">       picker<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">     <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令式调用组件" tabindex="-1"><a class="header-anchor" href="#命令式调用组件"><span>命令式调用组件</span></a></h3>
<p>这种组件类似于 element-ui 的 Message 组件，它并不是在模板中写好 html 结构通过状态切换，而是在 js 里使用 Message.success() 这种命令式的方式调用。这种简单的提示类组件，通过命令式的方式来调用更方便。
使用 Vue.extend() 实现：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span></span>
<span class="line"><span class="token keyword">import</span> MessageComponent <span class="token keyword">from</span> <span class="token string">'./message'</span></span>
<span class="line"><span class="token comment">// 构造子类</span></span>
<span class="line"><span class="token keyword">const</span> MessageConstructor <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>MessageComponent<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">Message</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> options <span class="token operator">=</span> options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> options <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   options <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token literal-property property">message</span><span class="token operator">:</span> options</span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token comment">// 实例化组件</span></span>
<span class="line"> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MessageConstructor</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">   <span class="token literal-property property">data</span><span class="token operator">:</span> options</span>
<span class="line"> <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token comment">// 设置 visible 状态，v-show将会显示组件</span></span>
<span class="line"> instance<span class="token punctuation">.</span>visible <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"> <span class="token comment">// 类似 document.createElement() 在内存中生成 dom</span></span>
<span class="line"> instance<span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> <span class="token comment">// 将真实 dom 插入到父节点中</span></span>
<span class="line"> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>$el<span class="token punctuation">)</span></span>
<span class="line"> <span class="token keyword">return</span> instance</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 添加快捷方法到 Message 函数上</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token string">'success'</span><span class="token punctuation">,</span> <span class="token string">'warning'</span><span class="token punctuation">,</span> <span class="token string">'info'</span><span class="token punctuation">,</span> <span class="token string">'error'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line"> Message<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token parameter">options</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> options <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     options <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token literal-property property">message</span><span class="token operator">:</span> options</span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line">   options<span class="token punctuation">.</span>type <span class="token operator">=</span> type</span>
<span class="line">   <span class="token keyword">return</span> <span class="token function">Message</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> Message</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码层面优化" tabindex="-1"><a class="header-anchor" href="#代码层面优化"><span>代码层面优化</span></a></h2>
<ul>
<li>能用 computed 不用 watch</li>
<li>v-for 和 v-if 不要同时使用</li>
<li>prop 尽量声明完整，至少应该指明类型</li>
<li>当同一个属性在大量使用 v-if 时，考虑使用 render 函数或者 <a href="https://github.com/vuejs/jsx" target="_blank" rel="noopener noreferrer">JSX</a></li>
<li>使用 mixin 复用公共逻辑</li>
<li>多个组件使用 v-if 切换时，考虑使用 动态组件，通过 :is 属性绑定组件名</li>
<li>当路由配置过多时，考虑按模块拆分路由</li>
</ul>
<h2 id="vue-可用的渲染优化" tabindex="-1"><a class="header-anchor" href="#vue-可用的渲染优化"><span>Vue 可用的渲染优化</span></a></h2>
<ul>
<li>合理使用 keep-alive，避免组件重新渲染</li>
<li>适当使用 v-once 渲染大量的静态内容</li>
</ul>
<h2 id="构建优化" tabindex="-1"><a class="header-anchor" href="#构建优化"><span>构建优化</span></a></h2>
<ul>
<li>开启 gzip</li>
<li>静态服务器配置缓存，配合文件 hash 值提高缓存利用率</li>
<li>合理使用 preload 和 prefetch 预加载，但会增加带宽，对于访问速度要求高的页面可以关闭</li>
<li>bundle spliting，将一个大文件拆分成多个小文件，充分利用浏览器并行下载能力，提高下载速度</li>
<li>路由懒加载，按需加载，避免无用的加载</li>
<li>路由懒加载使用魔法注释（webpackChunkName），将一些体积小的文件合并到一个 chunk，避免小文件过多而导致过多的 http 请求</li>
<li>UI 组件库和工具库的按需加载，babel-plugin-component/babel-plugin-import</li>
<li>图片压缩，image-webpack-loader</li>
<li>moment 减少体积，配置webpack只保留 zh-cn 语言包 或者 使用 dayjs 代替</li>
<li>icon 图标使用 svg 方案</li>
<li>使用频率少的公共方法或者第三方插件不要挂到 Vue.prototype 上，应该哪里用哪里引入</li>
</ul>
<h2 id="通用优化" tabindex="-1"><a class="header-anchor" href="#通用优化"><span>通用优化</span></a></h2>
<ul>
<li>节流防抖</li>
<li>图片懒加载</li>
<li>虚拟列表</li>
<li>减少异步请求，代码层面合理缓存数据</li>
<li>路由跳转取消上个路由还未完成的请求</li>
<li>耗时操作放入web worker</li>
<li>cdn 加速</li>
</ul>
</div></template>


