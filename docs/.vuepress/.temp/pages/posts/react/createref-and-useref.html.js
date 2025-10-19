import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/react/createref-and-useref.html.vue"
const data = JSON.parse("{\"path\":\"/posts/react/createref-and-useref.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"createRef vs useRef\",\"slug\":\"createref-vs-useref\",\"link\":\"#createref-vs-useref\",\"children\":[]},{\"level\":3,\"title\":\"FC每次渲染获取到的状态不是实时状态？\",\"slug\":\"fc每次渲染获取到的状态不是实时状态\",\"link\":\"#fc每次渲染获取到的状态不是实时状态\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/react/createref-and-useref.md\",\"excerpt\":\"<ul>\\n<li><a href=\\\"#createref-vs-useref\\\">createRef vs useRef</a></li>\\n<li><a href=\\\"#fc%E6%AF%8F%E6%AC%A1%E6%B8%B2%E6%9F%93%E8%8E%B7%E5%8F%96%E5%88%B0%E7%9A%84%E7%8A%B6%E6%80%81%E4%B8%8D%E6%98%AF%E5%AE%9E%E6%97%B6%E7%8A%B6%E6%80%81\\\">FC每次渲染获取到的状态不是实时状态？</a></li>\\n</ul>\\n<p>在class时代，由于组件节点是通过class实例化而得，因此可以在类实例上存放内容，这些内容随着实例化产生，随着componentWillUnmount销毁。但是在hook的范围下，函数组件并没有this和对应的实例，因此useRef作为这一能力的弥补，扮演着跨多次渲染存放内容的角色。</p>\"}")
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
