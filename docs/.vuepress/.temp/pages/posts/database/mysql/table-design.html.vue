<template><div><h3 id="中间表" tabindex="-1"><a class="header-anchor" href="#中间表"><span>中间表</span></a></h3>
<p>多对多关系的中间表通常用于连接两个主表（如 role和 resource），并记录两者之间的关联关系。</p>
<p>中间表的字段设计需注意：</p>
<ul>
<li>
<p>主键：无需添加无需自增主键 id（避免冗余存储，且浪费空间（每条记录多存一个 INT）），而使用复合主键（<code v-pre>(userId, roleId)</code>），确保唯一性；</p>
</li>
<li>
<p>外键：外键字段应非空，且需为 <code v-pre>userId</code> 和 <code v-pre>roleId</code> 分别添加外键约束，关联到 <code v-pre>userId.id</code> 和 <code v-pre>role.id</code>；</p>
</li>
<li>
<p>索引：</p>
<ul>
<li>userId作为联合主键的第一列，主键索引（(userId, roleId)）已经能够高效支持基于 userId的查询，无需额外创建索引。</li>
<li>InnoDB 外键约束依赖索引来保证性能，若外键列未显式创建索引，InnoDB 会自动创建一个（但命名可能不友好）。而手动创建的索引可以使用有意义的名称（如 idx_role_id），方便后续维护。</li>
<li>为 roleId单独创建 idx_role_id索引，若已建表可后面再补充(<code v-pre>CREATE INDEX idx_role_id ON user_role(roleId);</code>)
<ul>
<li>roleId不是主键的一部分：主键索引的排序是 (userId, roleId)，因此 roleId的值在主键索引中是<strong>无序</strong>的（仅作为主键的第二列）。</li>
<li>反向查询需要高效索引：如果业务中需要频繁通过 roleId查询关联的用户（例如<strong>查询角色 X 被哪些用户拥有</strong>），即 WHERE roleId = Y，此时主键索引无法直接利用（因为主键的第一列是 userId，不是 roleId），必须通过 roleId的单独索引快速定位。</li>
</ul>
</li>
</ul>
</li>
<li>
<p>时间字段的类型选择</p>
<ul>
<li>当前选择：TIMESTAMP类型，占用 4 字节，时间范围为 1970-01-01 00:00:01到 2038-01-19 03:14:07。</li>
<li>可选方案：若业务需要更早或更晚的时间（如记录历史数据），可改用 DATETIME类型（占用 8 字节，时间范围 1000-01-01 00:00:00到 9999-12-31 23:59:59）。</li>
</ul>
</li>
<li>
<p>软删除字段的查询过滤</p>
<ul>
<li>问题：isDeleted字段用于逻辑删除，但需确保应用层在查询时主动过滤已删除的记录（如 WHERE isDeleted = 0）。若忘记过滤，可能导致查询到无效数据。</li>
<li>建议：通过视图或触发器自动过滤，或在应用层统一封装查询逻辑（推荐）。</li>
</ul>
</li>
<li>
<p>可选字段：若需记录额外信息（如创建人），可添加 <code v-pre>createByName</code>、<code v-pre>createById</code> 等字段，但需避免过度设计。</p>
<ul>
<li><code v-pre>ALTER TABLE user_role ADD createByName varchar(100) AFTER createdAt</code></li>
</ul>
</li>
</ul>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>user_role<span class="token punctuation">`</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>user_role<span class="token punctuation">`</span></span> <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>createdAt<span class="token punctuation">`</span></span> <span class="token keyword">timestamp</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">COMMENT</span> <span class="token string">'关联创建时间'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>updatedAt<span class="token punctuation">`</span></span> <span class="token keyword">timestamp</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">COMMENT</span> <span class="token string">'关联最后更新时间'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>isDeleted<span class="token punctuation">`</span></span> <span class="token keyword">tinyint</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'是否删除（0-未删除，1-已删除）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>userId<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户ID（关联user表id）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>roleId<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'角色ID（关联role表id）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>userId<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>roleId<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token keyword">COMMENT</span> <span class="token string">'联合主键保证用户-角色关联唯一性'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">INDEX</span> <span class="token identifier"><span class="token punctuation">`</span>idx_role_id<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>roleId<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token keyword">COMMENT</span> <span class="token string">'优化角色ID的反向查询'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">CONSTRAINT</span> <span class="token identifier"><span class="token punctuation">`</span>fk_user_role_user<span class="token punctuation">`</span></span> </span>
<span class="line"></span>
<span class="line">    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>userId<span class="token punctuation">`</span></span><span class="token punctuation">)</span> </span>
<span class="line"></span>
<span class="line">    <span class="token keyword">REFERENCES</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span> </span>
<span class="line"></span>
<span class="line">    <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户删除时级联删除关联记录'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">CONSTRAINT</span> <span class="token identifier"><span class="token punctuation">`</span>fk_user_role_role<span class="token punctuation">`</span></span> </span>
<span class="line"></span>
<span class="line">    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>roleId<span class="token punctuation">`</span></span><span class="token punctuation">)</span> </span>
<span class="line"></span>
<span class="line">    <span class="token keyword">REFERENCES</span> <span class="token identifier"><span class="token punctuation">`</span>role<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span> </span>
<span class="line"></span>
<span class="line">    <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span> <span class="token keyword">COMMENT</span> <span class="token string">'角色删除时级联删除关联记录'</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4 <span class="token keyword">COLLATE</span><span class="token operator">=</span>utf8mb4_0900_ai_ci <span class="token keyword">COMMENT</span> <span class="token string">'用户-角色关联表（多对多关系，记录用户拥有的角色）'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> role_resource <span class="token punctuation">(</span></span>
<span class="line"></span>
<span class="line">  role_id <span class="token keyword">BIGINT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'角色ID（关联role表id，非空）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  resource_id <span class="token keyword">BIGINT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'资源ID（关联resource表id，非空）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  create_time <span class="token keyword">DATETIME</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">COMMENT</span> <span class="token string">'角色与资源关联的创建时间（自动填充，不可修改）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  is_deleted <span class="token keyword">TINYINT</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span> <span class="token keyword">COMMENT</span> <span class="token string">'是否删除（0-未删除，1-已删除，可选软删除）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>role_id<span class="token punctuation">,</span> resource_id<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">INDEX</span> idx_resource_id <span class="token punctuation">(</span>resource_id<span class="token punctuation">)</span> <span class="token keyword">COMMENT</span> <span class="token string">'优化resource_id反向查询的索引'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>role_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> role<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span> <span class="token keyword">COMMENT</span> <span class="token string">'角色ID级联删除（角色删除时，关联记录自动删除）'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>resource_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> resource<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span> <span class="token keyword">COMMENT</span> <span class="token string">'资源ID级联删除（资源删除时，关联记录自动删除）'</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'角色-资源关联表（多对多关系，记录角色可访问的资源）'</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


