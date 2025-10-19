import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/obs/ish.html.vue"
const data = JSON.parse("{\"path\":\"/posts/obs/ish.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"iSH\",\"slug\":\"ish\",\"link\":\"#ish\",\"children\":[{\"level\":3,\"title\":\"创建 ssh 秘钥\",\"slug\":\"创建-ssh-秘钥\",\"link\":\"#创建-ssh-秘钥\",\"children\":[]},{\"level\":3,\"title\":\"挂载文件\",\"slug\":\"挂载文件\",\"link\":\"#挂载文件\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"posts/obs/ish.md\",\"excerpt\":\"<p>iSH 是免费开源的软件，能满足基本终端使用需求，如 git 拉取项目、通过 ssh 管理服务器等。</p>\\n<h2>iSH</h2>\\n<h3>创建 ssh 秘钥</h3>\\n<p>无法通过 rsa 创建秘钥，支持部分模式，如 ed255191 ：</p>\\n<div class=\\\"language-text line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"text\\\"><pre><code><span class=\\\"line\\\">ssh-keygen -t ed255191</span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\"}")
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
