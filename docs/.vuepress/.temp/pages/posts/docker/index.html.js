import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/docker/index.html.vue"
const data = JSON.parse("{\"path\":\"/posts/docker/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"安装\",\"slug\":\"安装\",\"link\":\"#安装\",\"children\":[{\"level\":3,\"title\":\"linux\",\"slug\":\"linux\",\"link\":\"#linux\",\"children\":[]}]},{\"level\":2,\"title\":\"docker\",\"slug\":\"docker\",\"link\":\"#docker\",\"children\":[{\"level\":3,\"title\":\"启动\",\"slug\":\"启动\",\"link\":\"#启动\",\"children\":[]},{\"level\":3,\"title\":\"image 镜像\",\"slug\":\"image-镜像\",\"link\":\"#image-镜像\",\"children\":[]},{\"level\":3,\"title\":\"container 容器\",\"slug\":\"container-容器\",\"link\":\"#container-容器\",\"children\":[]}]},{\"level\":2,\"title\":\"docker-compose\",\"slug\":\"docker-compose-1\",\"link\":\"#docker-compose-1\",\"children\":[]},{\"level\":2,\"title\":\"docker 容器如何访问宿主机网络\",\"slug\":\"docker-容器如何访问宿主机网络\",\"link\":\"#docker-容器如何访问宿主机网络\",\"children\":[{\"level\":3,\"title\":\"方案一\",\"slug\":\"方案一\",\"link\":\"#方案一\",\"children\":[]},{\"level\":3,\"title\":\"方案二\",\"slug\":\"方案二\",\"link\":\"#方案二\",\"children\":[]}]},{\"level\":2,\"title\":\"Alpine Linux 与传统Linux的区别\",\"slug\":\"alpine-linux-与传统linux的区别\",\"link\":\"#alpine-linux-与传统linux的区别\",\"children\":[]},{\"level\":2,\"title\":\"相关文档\",\"slug\":\"相关文档\",\"link\":\"#相关文档\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/docker/index.md\",\"excerpt\":\"<h2>安装</h2>\\n<h3>linux</h3>\\n<h4>docker-compose</h4>\\n<ol>\\n<li>下载安装包</li>\\n</ol>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"sh\\\"><pre><code><span class=\\\"line\\\"><span class=\\\"token function\\\">sudo</span> <span class=\\\"token function\\\">curl</span> <span class=\\\"token parameter variable\\\">-L</span> https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-<span class=\\\"token variable\\\"><span class=\\\"token variable\\\">`</span><span class=\\\"token function\\\">uname</span> <span class=\\\"token parameter variable\\\">-s</span><span class=\\\"token variable\\\">`</span></span>-<span class=\\\"token variable\\\"><span class=\\\"token variable\\\">`</span><span class=\\\"token function\\\">uname</span> <span class=\\\"token parameter variable\\\">-m</span><span class=\\\"token variable\\\">`</span></span> <span class=\\\"token parameter variable\\\">-o</span> usr/local/bin/docker-compose</span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\"}")
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
