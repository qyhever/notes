import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/react/set-state.html.vue"
const data = JSON.parse("{\"path\":\"/posts/react/set-state.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"setState 是同步还是异步相关问题\",\"slug\":\"setstate-是同步还是异步相关问题\",\"link\":\"#setstate-是同步还是异步相关问题\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/react/set-state.md\",\"excerpt\":\"<ul>\\n<li><a href=\\\"#setstate-%E6%98%AF%E5%90%8C%E6%AD%A5%E8%BF%98%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98\\\">setState 是同步还是异步相关问题</a>\\n<ul>\\n<li><a href=\\\"#setstate-%E6%98%AF%E5%90%8C%E6%AD%A5%E8%BF%98%E6%98%AF%E5%BC%82%E6%AD%A5\\\">setState 是同步还是异步？</a></li>\\n<li><a href=\\\"#%E4%BD%95%E6%97%B6%E6%98%AF%E5%90%8C%E6%AD%A5%E4%BD%95%E6%97%B6%E6%98%AF%E5%BC%82%E6%AD%A5%E5%91%A2\\\">何时是同步，何时是异步呢？</a></li>\\n<li><a href=\\\"#%E9%82%A3%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E5%87%BA%E7%8E%B0%E5%BC%82%E6%AD%A5%E7%9A%84%E6%83%85%E5%86%B5%E5%91%A2\\\">那为什么会出现异步的情况呢？</a></li>\\n<li><a href=\\\"#%E9%82%A3%E5%A6%82%E4%BD%95%E5%9C%A8%E8%A1%A8%E7%8E%B0%E5%87%BA%E5%BC%82%E6%AD%A5%E7%9A%84%E5%87%BD%E6%95%B0%E9%87%8C%E5%8F%AF%E4%BB%A5%E5%87%86%E7%A1%AE%E6%8B%BF%E5%88%B0%E6%9B%B4%E6%96%B0%E5%90%8E%E7%9A%84-state-%E5%91%A2\\\">那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？</a></li>\\n<li><a href=\\\"#%E9%82%A3%E8%A1%A8%E7%8E%B0%E5%87%BA%E5%BC%82%E6%AD%A5%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84%E5%91%A2\\\">那表现出异步的原理是怎么样的呢？</a></li>\\n</ul>\\n</li>\\n</ul>\"}")
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
