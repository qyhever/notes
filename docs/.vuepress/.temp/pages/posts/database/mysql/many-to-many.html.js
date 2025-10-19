import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/database/mysql/many-to-many.html.vue"
const data = JSON.parse("{\"path\":\"/posts/database/mysql/many-to-many.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"在 MySQL 中处理 role 表与 resource 表的多对多关系查询方案\",\"slug\":\"在-mysql-中处理-role-表与-resource-表的多对多关系查询方案\",\"link\":\"#在-mysql-中处理-role-表与-resource-表的多对多关系查询方案\",\"children\":[{\"level\":3,\"title\":\"方案 1：直接 JOIN 关联（推荐）\",\"slug\":\"方案-1-直接-join-关联-推荐\",\"link\":\"#方案-1-直接-join-关联-推荐\",\"children\":[]},{\"level\":3,\"title\":\"方案 2：先查角色 IDs，再用 IN 关联（特定场景适用）\",\"slug\":\"方案-2-先查角色-ids-再用-in-关联-特定场景适用\",\"link\":\"#方案-2-先查角色-ids-再用-in-关联-特定场景适用\",\"children\":[]},{\"level\":3,\"title\":\"方案 3：子查询关联（避免应用层多次交互）\",\"slug\":\"方案-3-子查询关联-避免应用层多次交互\",\"link\":\"#方案-3-子查询关联-避免应用层多次交互\",\"children\":[]},{\"level\":3,\"title\":\"性能优化建议\",\"slug\":\"性能优化建议\",\"link\":\"#性能优化建议\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结\",\"link\":\"#总结\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"posts/database/mysql/many-to-many.md\",\"excerpt\":\"<ul>\\n<li><a href=\\\"#%E5%9C%A8-mysql-%E4%B8%AD%E5%A4%84%E7%90%86-role-%E8%A1%A8%E4%B8%8E-resource-%E8%A1%A8%E7%9A%84%E5%A4%9A%E5%AF%B9%E5%A4%9A%E5%85%B3%E7%B3%BB%E6%9F%A5%E8%AF%A2%E6%96%B9%E6%A1%88\\\">在 MySQL 中处理 role 表与 resource 表的多对多关系查询方案</a>\\n<ul>\\n<li><a href=\\\"#%E6%96%B9%E6%A1%88-1%E7%9B%B4%E6%8E%A5-join-%E5%85%B3%E8%81%94%E6%8E%A8%E8%8D%90\\\">方案 1：直接 JOIN 关联（推荐）</a></li>\\n<li><a href=\\\"#%E6%96%B9%E6%A1%88-2%E5%85%88%E6%9F%A5%E8%A7%92%E8%89%B2-ids%E5%86%8D%E7%94%A8-in-%E5%85%B3%E8%81%94%E7%89%B9%E5%AE%9A%E5%9C%BA%E6%99%AF%E9%80%82%E7%94%A8\\\">方案 2：先查角色 IDs，再用 IN 关联（特定场景适用）</a></li>\\n<li><a href=\\\"#%E6%96%B9%E6%A1%88-3%E5%AD%90%E6%9F%A5%E8%AF%A2%E5%85%B3%E8%81%94%E9%81%BF%E5%85%8D%E5%BA%94%E7%94%A8%E5%B1%82%E5%A4%9A%E6%AC%A1%E4%BA%A4%E4%BA%92\\\">方案 3：子查询关联（避免应用层多次交互）</a></li>\\n<li><a href=\\\"#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E5%BB%BA%E8%AE%AE\\\">性能优化建议</a></li>\\n<li><a href=\\\"#%E6%80%BB%E7%BB%93\\\">总结</a></li>\\n</ul>\\n</li>\\n</ul>\"}")
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
