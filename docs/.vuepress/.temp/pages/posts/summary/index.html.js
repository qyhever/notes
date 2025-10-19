import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/summary/index.html.vue"
const data = JSON.parse("{\"path\":\"/posts/summary/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"posts/summary/index.md\",\"excerpt\":\"<ol>\\n<li>JavaScript 基础深度对闭包、事件循环（Event Loop）、原型链等核心概念理解模糊</li>\\n<li>框架原理理解停留在 API 使用层面，对虚拟 DOM Diff 算法、Hooks 依赖收集原理、响应式原理等理解不深</li>\\n<li>项目经验表述多停留在\\\"用了什么技术\\\"，缺乏对技术选型原因、遇到的复杂问题及解决方案、量化成果的深入阐述</li>\\n<li>工程化能力 对构建工具（如 Webpack、Vite）、CI/CD、自动化测试、代码规范等接触较少或理解不深</li>\\n<li>浏览器与网络对浏览器渲染机制、性能优化（如减少重绘回流、懒加载、预加载等）、HTTP/HTTPS 协议、缓存策略等理解不够全面</li>\\n<li>计算机基础知识对数据结构、算法、操作系统、计算机网络等基础概念</li>\\n</ol>\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
