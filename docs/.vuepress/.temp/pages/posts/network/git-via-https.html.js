import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/network/git-via-https.html.vue"
const data = JSON.parse("{\"path\":\"/posts/network/git-via-https.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"测试 HTTPS 端口的 SSH 是否可行\",\"slug\":\"测试-https-端口的-ssh-是否可行\",\"link\":\"#测试-https-端口的-ssh-是否可行\",\"children\":[]},{\"level\":3,\"title\":\"启用通过 HTTPS 的 SSH 链接\",\"slug\":\"启用通过-https-的-ssh-链接\",\"link\":\"#启用通过-https-的-ssh-链接\",\"children\":[]},{\"level\":3,\"title\":\"再次验证是否有效\",\"slug\":\"再次验证是否有效\",\"link\":\"#再次验证是否有效\",\"children\":[]},{\"level\":3,\"title\":\"最后\",\"slug\":\"最后\",\"link\":\"#最后\",\"children\":[]},{\"level\":2,\"title\":\"Reference\",\"slug\":\"reference\",\"link\":\"#reference\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/network/git-via-https.md\",\"excerpt\":\"<p>在<a href=\\\"/posts/network/best-proxy-way.html\\\" target=\\\"_blank\\\">最佳代理实践</a>中， 代理主要有两种：</p>\\n<ol>\\n<li>一种主要是 Trojain， 配合 Clash 实现自动代理， 主要服务于浏览器上网查资料</li>\\n<li>第二种通过 sshuttle 来实现全局代理， 主要是保障命令行的工具一定可以工作， 比如 git、 goget、 yay 等场景</li>\\n</ol>\\n<p>sshuttle 这个工具非常稳定， 各种恶劣的环境都可以保证命令行工具正常运行， 但是它有两个缺点：</p>\\n<ol>\\n<li>全局的特性会干扰浏览器的正常运行， 会让一些不用代理的网站访问速度变慢， 或者让微信无法接受新消息</li>\\n<li>每次都需要开一个终端输入密码， 很麻烦\\n其实， 我平常用的最多的命令就是 Git， 访问 git https 一般都没有问题， 主要是 git ssh 容易被干扰， 原因是防火墙有时会完全拒绝 SSH 链接。</li>\\n</ol>\"}")
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
