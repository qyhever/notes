import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/linux/index.html.vue"
const data = JSON.parse("{\"path\":\"/posts/linux/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"系统信息\",\"slug\":\"系统信息\",\"link\":\"#系统信息\",\"children\":[]},{\"level\":2,\"title\":\"文件目录\",\"slug\":\"文件目录\",\"link\":\"#文件目录\",\"children\":[]},{\"level\":2,\"title\":\"alias\",\"slug\":\"alias\",\"link\":\"#alias\",\"children\":[]},{\"level\":2,\"title\":\"上传下载\",\"slug\":\"上传下载\",\"link\":\"#上传下载\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/linux/index.md\",\"excerpt\":\"<h2>系统信息</h2>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"sh\\\"><pre><code><span class=\\\"line\\\"><span class=\\\"token function\\\">uname</span> <span class=\\\"token parameter variable\\\">-a</span> <span class=\\\"token comment\\\"># 显示操作系统名称、主机名、内核版本、硬件架构等信息</span></span>\\n<span class=\\\"line\\\">lsb_release <span class=\\\"token parameter variable\\\">-a</span> <span class=\\\"token comment\\\"># 提供Linux 发行版的详细信息，包括名称、版本号和代号</span></span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\"}")
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
