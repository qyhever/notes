import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/docker/pros/README.docker.html.vue"
const data = JSON.parse("{\"path\":\"/posts/docker/pros/README.docker.html\",\"title\":\"Docker多项目部署指南\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"项目结构\",\"slug\":\"项目结构\",\"link\":\"#项目结构\",\"children\":[]},{\"level\":2,\"title\":\"文件说明\",\"slug\":\"文件说明\",\"link\":\"#文件说明\",\"children\":[]},{\"level\":2,\"title\":\"部署步骤\",\"slug\":\"部署步骤\",\"link\":\"#部署步骤\",\"children\":[{\"level\":3,\"title\":\"1. 安装Docker和Docker Compose\",\"slug\":\"_1-安装docker和docker-compose\",\"link\":\"#_1-安装docker和docker-compose\",\"children\":[]},{\"level\":3,\"title\":\"2. 构建和启动容器\",\"slug\":\"_2-构建和启动容器\",\"link\":\"#_2-构建和启动容器\",\"children\":[]},{\"level\":3,\"title\":\"3. 访问应用\",\"slug\":\"_3-访问应用\",\"link\":\"#_3-访问应用\",\"children\":[]}]},{\"level\":2,\"title\":\"配置说明\",\"slug\":\"配置说明\",\"link\":\"#配置说明\",\"children\":[{\"level\":3,\"title\":\"Nginx配置\",\"slug\":\"nginx配置\",\"link\":\"#nginx配置\",\"children\":[]},{\"level\":3,\"title\":\"各项目配置\",\"slug\":\"各项目配置\",\"link\":\"#各项目配置\",\"children\":[]}]},{\"level\":2,\"title\":\"自定义配置\",\"slug\":\"自定义配置\",\"link\":\"#自定义配置\",\"children\":[{\"level\":3,\"title\":\"修改端口\",\"slug\":\"修改端口\",\"link\":\"#修改端口\",\"children\":[]},{\"level\":3,\"title\":\"修改项目路径\",\"slug\":\"修改项目路径\",\"link\":\"#修改项目路径\",\"children\":[]}]},{\"level\":2,\"title\":\"故障排除\",\"slug\":\"故障排除\",\"link\":\"#故障排除\",\"children\":[{\"level\":3,\"title\":\"/r3/api/ 路径请求失败问题排查\",\"slug\":\"r3-api-路径请求失败问题排查\",\"link\":\"#r3-api-路径请求失败问题排查\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"posts/docker/pros/README.docker.md\",\"excerpt\":\"\\n<p>本文档提供了使用Docker部署多个项目的详细说明，包括qyhever博客、r3-admin-front前端和r3-admin-server后端服务。</p>\\n<h2>项目结构</h2>\\n<ul>\\n<li><strong>nginx</strong>: 主 nginx，统一处理所有路由和 API 代理，访问路径为根目录 <code>http://localhost/</code></li>\\n<li><strong>qyhever</strong>: 博客项目，访问路径为 <code>http://localhost/blog/</code></li>\\n<li><strong>r3-admin-front</strong>: 管理前端项目，访问路径为 <code>http://localhost/r3-admin/</code></li>\\n<li><strong>r3-admin-server</strong>: 管理后端API服务，为r3-admin-front提供API支持</li>\\n</ul>\"}")
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
