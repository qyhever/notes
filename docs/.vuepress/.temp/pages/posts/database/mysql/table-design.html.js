import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/database/mysql/table-design.html.vue"
const data = JSON.parse("{\"path\":\"/posts/database/mysql/table-design.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"中间表\",\"slug\":\"中间表\",\"link\":\"#中间表\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/database/mysql/table-design.md\",\"excerpt\":\"<h3>中间表</h3>\\n<p>多对多关系的中间表通常用于连接两个主表（如 role和 resource），并记录两者之间的关联关系。</p>\\n<p>中间表的字段设计需注意：</p>\\n<ul>\\n<li>\\n<p>主键：无需添加无需自增主键 id（避免冗余存储，且浪费空间（每条记录多存一个 INT）），而使用复合主键（<code>(userId, roleId)</code>），确保唯一性；</p>\\n</li>\\n<li>\\n<p>外键：外键字段应非空，且需为 <code>userId</code> 和 <code>roleId</code> 分别添加外键约束，关联到 <code>userId.id</code> 和 <code>role.id</code>；</p>\\n</li>\\n<li>\\n<p>索引：</p>\\n<ul>\\n<li>userId作为联合主键的第一列，主键索引（(userId, roleId)）已经能够高效支持基于 userId的查询，无需额外创建索引。</li>\\n<li>InnoDB 外键约束依赖索引来保证性能，若外键列未显式创建索引，InnoDB 会自动创建一个（但命名可能不友好）。而手动创建的索引可以使用有意义的名称（如 idx_role_id），方便后续维护。</li>\\n<li>为 roleId单独创建 idx_role_id索引，若已建表可后面再补充(<code>CREATE INDEX idx_role_id ON user_role(roleId);</code>)\\n<ul>\\n<li>roleId不是主键的一部分：主键索引的排序是 (userId, roleId)，因此 roleId的值在主键索引中是<strong>无序</strong>的（仅作为主键的第二列）。</li>\\n<li>反向查询需要高效索引：如果业务中需要频繁通过 roleId查询关联的用户（例如<strong>查询角色 X 被哪些用户拥有</strong>），即 WHERE roleId = Y，此时主键索引无法直接利用（因为主键的第一列是 userId，不是 roleId），必须通过 roleId的单独索引快速定位。</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li>\\n<p>时间字段的类型选择</p>\\n<ul>\\n<li>当前选择：TIMESTAMP类型，占用 4 字节，时间范围为 1970-01-01 00:00:01到 2038-01-19 03:14:07。</li>\\n<li>可选方案：若业务需要更早或更晚的时间（如记录历史数据），可改用 DATETIME类型（占用 8 字节，时间范围 1000-01-01 00:00:00到 9999-12-31 23:59:59）。</li>\\n</ul>\\n</li>\\n<li>\\n<p>软删除字段的查询过滤</p>\\n<ul>\\n<li>问题：isDeleted字段用于逻辑删除，但需确保应用层在查询时主动过滤已删除的记录（如 WHERE isDeleted = 0）。若忘记过滤，可能导致查询到无效数据。</li>\\n<li>建议：通过视图或触发器自动过滤，或在应用层统一封装查询逻辑（推荐）。</li>\\n</ul>\\n</li>\\n<li>\\n<p>可选字段：若需记录额外信息（如创建人），可添加 <code>createByName</code>、<code>createById</code> 等字段，但需避免过度设计。</p>\\n<ul>\\n<li><code>ALTER TABLE user_role ADD createByName varchar(100) AFTER createdAt</code></li>\\n</ul>\\n</li>\\n</ul>\"}")
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
