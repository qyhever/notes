import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/nginx/safe.html.vue"
const data = JSON.parse("{\"path\":\"/posts/nginx/safe.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Reference\",\"slug\":\"reference\",\"link\":\"#reference\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/nginx/safe.md\",\"excerpt\":\"<h2>Reference</h2>\\n<ul>\\n<li><a href=\\\"https://my.oschina.net/lenve/blog/16491847\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">如何让 Nginx 更安全？</a></li>\\n<li><a href=\\\"\\\"></a></li>\\n<li><a href=\\\"\\\"></a></li>\\n</ul>\\n\"}")
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
