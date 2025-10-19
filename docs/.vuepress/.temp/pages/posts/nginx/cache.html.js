import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/nginx/cache.html.vue"
const data = JSON.parse("{\"path\":\"/posts/nginx/cache.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"前端部署\",\"slug\":\"前端部署\",\"link\":\"#前端部署\",\"children\":[{\"level\":3,\"title\":\"常规做法\",\"slug\":\"常规做法\",\"link\":\"#常规做法\",\"children\":[]},{\"level\":3,\"title\":\"精细化 Nginx 缓存策略\",\"slug\":\"精细化-nginx-缓存策略\",\"link\":\"#精细化-nginx-缓存策略\",\"children\":[]},{\"level\":3,\"title\":\"CDN设置\",\"slug\":\"cdn设置\",\"link\":\"#cdn设置\",\"children\":[]}]},{\"level\":2,\"title\":\"Reference\",\"slug\":\"reference\",\"link\":\"#reference\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/nginx/cache.md\",\"excerpt\":\"<ul>\\n<li><a href=\\\"#%E5%89%8D%E7%AB%AF%E9%83%A8%E7%BD%B2\\\">前端部署</a>\\n<ul>\\n<li><a href=\\\"#%E5%B8%B8%E8%A7%84%E5%81%9A%E6%B3%95\\\">常规做法</a>\\n<ul>\\n<li><a href=\\\"#%E6%89%93%E5%8C%85%E6%96%87%E4%BB%B6%E5%90%8D-hash-%E5%8C%96\\\">打包文件名 hash 化</a></li>\\n<li><a href=\\\"#html-%E5%85%A5%E5%8F%A3%E6%96%87%E4%BB%B6%E9%98%B2%E7%BC%93%E5%AD%98\\\">HTML 入口文件防缓存</a></li>\\n<li><a href=\\\"#%E8%A2%AB%E5%BF%BD%E7%95%A5%E7%9A%84%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5\\\">被忽略的缓存策略</a></li>\\n</ul>\\n</li>\\n<li><a href=\\\"#%E7%B2%BE%E7%BB%86%E5%8C%96-nginx-%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5\\\">精细化 Nginx 缓存策略</a></li>\\n<li><a href=\\\"#cdn%E8%AE%BE%E7%BD%AE\\\">CDN设置</a></li>\\n</ul>\\n</li>\\n<li><a href=\\\"#reference\\\">Reference</a></li>\\n</ul>\"}")
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
