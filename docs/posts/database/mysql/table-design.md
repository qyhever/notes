

### 中间表

多对多关系的中间表通常用于连接两个主表（如 role和 resource），并记录两者之间的关联关系。

中间表的字段设计需注意：

- 主键：无需添加无需自增主键 id（避免冗余存储，且浪费空间（每条记录多存一个 INT）），而使用复合主键（`(userId, roleId)`），确保唯一性；

- 外键：外键字段应非空，且需为 `userId` 和 `roleId` 分别添加外键约束，关联到 `userId.id` 和 `role.id`；

- 索引：
  - userId作为联合主键的第一列，主键索引（(userId, roleId)）已经能够高效支持基于 userId的查询，无需额外创建索引。
  - InnoDB 外键约束依赖索引来保证性能，若外键列未显式创建索引，InnoDB 会自动创建一个（但命名可能不友好）。而手动创建的索引可以使用有意义的名称（如 idx_role_id），方便后续维护。
  - 为 roleId单独创建 idx_role_id索引，若已建表可后面再补充(`CREATE INDEX idx_role_id ON user_role(roleId);`)
    - roleId不是主键的一部分：主键索引的排序是 (userId, roleId)，因此 roleId的值在主键索引中是**无序**的（仅作为主键的第二列）。
    - 反向查询需要高效索引：如果业务中需要频繁通过 roleId查询关联的用户（例如**查询角色 X 被哪些用户拥有**），即 WHERE roleId = Y，此时主键索引无法直接利用（因为主键的第一列是 userId，不是 roleId），必须通过 roleId的单独索引快速定位。

- 时间字段的类型选择
  - 当前选择：TIMESTAMP类型，占用 4 字节，时间范围为 1970-01-01 00:00:01到 2038-01-19 03:14:07。
  - 可选方案：若业务需要更早或更晚的时间（如记录历史数据），可改用 DATETIME类型（占用 8 字节，时间范围 1000-01-01 00:00:00到 9999-12-31 23:59:59）。

- 软删除字段的查询过滤
  - 问题：isDeleted字段用于逻辑删除，但需确保应用层在查询时主动过滤已删除的记录（如 WHERE isDeleted = 0）。若忘记过滤，可能导致查询到无效数据。
  - 建议：通过视图或触发器自动过滤，或在应用层统一封装查询逻辑（推荐）。

- 可选字段：若需记录额外信息（如创建人），可添加 `createByName`、`createById` 等字段，但需避免过度设计。
  - `ALTER TABLE user_role ADD createByName varchar(100) AFTER createdAt`

```sql
DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (

  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '关联创建时间',

  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '关联最后更新时间',

  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除（0-未删除，1-已删除）',

  `userId` int NOT NULL COMMENT '用户ID（关联user表id）',

  `roleId` int NOT NULL COMMENT '角色ID（关联role表id）',

  PRIMARY KEY (`userId`, `roleId`) COMMENT '联合主键保证用户-角色关联唯一性',

  INDEX `idx_role_id` (`roleId`) COMMENT '优化角色ID的反向查询',

  CONSTRAINT `fk_user_role_user` 

    FOREIGN KEY (`userId`) 

    REFERENCES `user` (`id`) 

    ON DELETE CASCADE COMMENT '用户删除时级联删除关联记录',

  CONSTRAINT `fk_user_role_role` 

    FOREIGN KEY (`roleId`) 

    REFERENCES `role` (`id`) 

    ON DELETE CASCADE COMMENT '角色删除时级联删除关联记录'

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT '用户-角色关联表（多对多关系，记录用户拥有的角色）';

```

```sql

CREATE TABLE role_resource (

  role_id BIGINT NOT NULL COMMENT '角色ID（关联role表id，非空）',

  resource_id BIGINT NOT NULL COMMENT '资源ID（关联resource表id，非空）',

  create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '角色与资源关联的创建时间（自动填充，不可修改）',

  is_deleted TINYINT(1) DEFAULT 0 COMMENT '是否删除（0-未删除，1-已删除，可选软删除）',

  PRIMARY KEY (role_id, resource_id),

  INDEX idx_resource_id (resource_id) COMMENT '优化resource_id反向查询的索引',

  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE COMMENT '角色ID级联删除（角色删除时，关联记录自动删除）',

  FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE COMMENT '资源ID级联删除（资源删除时，关联记录自动删除）'

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色-资源关联表（多对多关系，记录角色可访问的资源）';
```
