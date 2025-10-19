<template><div><ol>
<li>JavaScript 基础深度对闭包、事件循环（Event Loop）、原型链等核心概念理解模糊</li>
<li>框架原理理解停留在 API 使用层面，对虚拟 DOM Diff 算法、Hooks 依赖收集原理、响应式原理等理解不深</li>
<li>项目经验表述多停留在&quot;用了什么技术&quot;，缺乏对技术选型原因、遇到的复杂问题及解决方案、量化成果的深入阐述</li>
<li>工程化能力 对构建工具（如 Webpack、Vite）、CI/CD、自动化测试、代码规范等接触较少或理解不深</li>
<li>浏览器与网络对浏览器渲染机制、性能优化（如减少重绘回流、懒加载、预加载等）、HTTP/HTTPS 协议、缓存策略等理解不够全面</li>
<li>计算机基础知识对数据结构、算法、操作系统、计算机网络等基础概念</li>
</ol>
<p>蚂蚁金服(React)</p>
<ol>
<li>闭包作用、缺点</li>
<li>深浅拷贝的区别和用途</li>
<li>css 有哪些实现布局的方式</li>
<li>css 命名冲突如何解决</li>
<li>ES 里的 Generator 的运行机制？和 async + await 有何区别</li>
<li>React 的 key 的作用</li>
<li>React 里什么时候用 context</li>
<li>render props 是什么？什么时候用？</li>
<li>路由如何做权限校验?</li>
<li>SSR 的原理是什么?</li>
</ol>
<p>字节跳动
一面</p>
<ol>
<li>先聊了一通项目，问了我 decorator 的实现原理，扯了一大堆，感觉良好。</li>
<li>如何判断是不是完全二叉树（没答出来）</li>
<li>编程题：判断一个链表是否有环</li>
<li>一道考异步执行顺序的题，只要了解micro task 和 macro task 应该就可以答出来</li>
<li>编程题：写个函数反转字符串</li>
<li>TCP 握手，分手，拥塞控制，流量控制</li>
<li>https的原理</li>
<li>DHCP 的实现基于啥协议（UDP）</li>
<li>Vue 的双向绑定实现原理</li>
<li>Vue 如何监听一个不会触发 render 的数据</li>
</ol>
<p>剩下的记不清了</p>
<p>二面
先聊项目</p>
<ol>
<li>TCP 握手，分手，拥塞控制，流量控制</li>
<li>有哪些缓存策略（只答出了 LRU）</li>
<li>简单介绍进程与线程</li>
<li>简单介绍 node 中的 child_process 模块，父子进程的通信机制（没答好）</li>
<li>介绍基本的数据结构及其应用，队列，栈，堆。函数的执行栈和堆内存</li>
<li>又是一道考异步执行顺序的题，需要了解 Node 的 nexttick 以及事件循环每个 stage 做了啥。比如 poll 阶段， timer阶段， check阶段之间的差异，有点难，最后还是错了一点</li>
<li>编程题：实现一个简单的 EventEmitter，然后基于此聊了一会</li>
<li>二叉树的前中后序遍历，已知前中序，求原有的二叉树</li>
<li>各类排序算法介绍，冒泡，快排，堆排，以及相应的算法复杂度</li>
</ol>
<p>三面
这面没问算法题，聊了很久项目，问了一些开放性的问题，也问了一些基础题，感觉发挥的不是很好，有些很简单的题没答出来。</p>
<ol>
<li>简单介绍一下 body-parser 的作用和原理（没答好）</li>
<li>基于 http 模块，写一个 http server，并且处理 POST 请求
这里 req 实际上是个 stream，获取 body 的方法是基于注册 on data 事件实现的，当时脑子短路没说上来。。错了整道题</li>
<li>跨域相关的问题</li>
<li>介绍CSRF。CSRF会不会有跨域的问题（不会，这里涉及到跨域的一些原理，跨域请求会被后端接口执行，但是返回的时候会被浏览器拦截）</li>
<li>希望 全栈还是专注做 Node.js</li>
<li>基于你学的信息安全专业你对现在的 web 安全有什么看法，有什么改进意见（没有看法。。。）</li>
<li>一堆开放式问题。。</li>
</ol>
<p>阿里 淘宝搜索推荐
算法机试
函数实现一个大位数乘法，可以计算出诸如1865459497823＊6349526719336的结果</p>
<p>一面</p>
<ol>
<li>vue/react开发与jQuery开发有什么区别</li>
<li>vue/react的dom diff过程，二者有什么差异</li>
<li>react hooks的useState相对于有状态组件state区别</li>
<li>DNS解析流程</li>
<li>TCP/IP协议分层，三次握手四次挥手的状态码，服务端连接队列拥堵时怎么处理，客户端第四次挥手后为什么要等待2MSL时间才转换为close状态</li>
<li>网络通信中引入滑动窗口的作用</li>
<li>http1.1/2/3差异，有做什么优化</li>
<li>https详细流程，为什么最后会使用对称加密，而不是全过程使用非对称加密</li>
<li>服务器如何得知浏览器发送了http请求</li>
<li>服务端高并发问题怎么解决</li>
<li>redis如何得知缓存失效</li>
<li>xss/csrf/SQL注入，在前端和后台分别要做什么安全防范工作</li>
<li>从获得HTML到解析页面全流程，为什么栅格线程使用GPU计算而不是CPU计算</li>
<li>影响首屏加载的因素有哪些，分别如何进行优化，performance有哪些相关的指标</li>
<li>js原型链/执行上下文/闭包/eventloop机制，class的继承和prototype是完全一样的吗，new操作符做了哪些事情</li>
<li>js常见几种异步代码编写的方式对比（promise/generator/async-await/rxjs）</li>
<li>js内存回收机制，如何避免内存泄漏</li>
<li>v8引擎解释执行js代码的详细流程</li>
<li>WebAssembly有听说过吗？它的优点是什么，使用时需要注意哪些问题</li>
<li>项目中可以通过什么方法来避免出现错误</li>
</ol>
</div></template>


