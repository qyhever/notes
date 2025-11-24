- [表结构](#表结构)
- [角色](#角色)
  - [创建](#创建)
  - [修改](#修改)
  - [分页查询](#分页查询)
  - [删除](#删除)

## 表结构
```sql
CREATE TABLE `resource` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `code` varchar(50) NOT NULL COMMENT '权限码',
  `name` varchar(50) NOT NULL COMMENT '权限名',
  `type` varchar(1) NOT NULL COMMENT '权限类型 1目录/2资源',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `parentCode` varchar(60) NOT NULL COMMENT '父级',
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
  `isEnabled` tinyint NOT NULL DEFAULT '1' COMMENT '启用/禁用',
  `isSystemDefault` tinyint NOT NULL DEFAULT '0' COMMENT '系统默认',
  PRIMARY KEY (`id`),
  KEY `idx_resource_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `name` varchar(50) NOT NULL COMMENT 'Role name',
  `description` varchar(255) DEFAULT NULL COMMENT 'Role description',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
  `code` varchar(50) NOT NULL COMMENT 'Role code',
  `isEnabled` tinyint NOT NULL DEFAULT '1' COMMENT '启用/禁用',
  `isSystemDefault` tinyint NOT NULL DEFAULT '0' COMMENT '系统默认',
  PRIMARY KEY (`id`),
  KEY `idx_role_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role_resource` (
  `roleId` int NOT NULL COMMENT 'Role ID',
  `resourceId` int NOT NULL COMMENT 'Resource ID',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`roleId`,`resourceId`),
  KEY `idx_resource_id` (`resourceId`),
  CONSTRAINT `FK_8e41fa151bd158bc1ef96f7056c` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`id`),
  CONSTRAINT `FK_eb3b0d193525d121cd3dc549acb` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `username` varchar(50) NOT NULL COMMENT 'Login username',
  `password` varchar(255) NOT NULL COMMENT 'Hashed password',
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
  `avatar` varchar(255) NOT NULL COMMENT '头像URL',
  `isEnabled` tinyint NOT NULL DEFAULT '1' COMMENT '启用/禁用',
  `isSystemDefault` tinyint NOT NULL DEFAULT '0' COMMENT '系统默认',
  `mobile` varchar(11) NOT NULL COMMENT '手机号',
  PRIMARY KEY (`id`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_role` (
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
  `userId` int NOT NULL COMMENT 'User ID',
  `roleId` int NOT NULL COMMENT 'Role ID',
  PRIMARY KEY (`userId`,`roleId`),
  KEY `idx_role_id` (`roleId`),
  CONSTRAINT `FK_ab40a6f0cd7d3ebfcce082131fd` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_dba55ed826ef26b5b22bd39409b` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## 角色
### 创建
```javascript
const {
  id, name, code, description, isEnabled, isSystemDefault, resourceCodes
} = req.body
// 检查角色编码是否已存在
const existingRole = await executeQuery(
  'SELECT id FROM role WHERE code = ? AND isDeleted = 0', 
  [code]
)
// 检查角色名称是否已存在
const existingName = await executeQuery(
  'SELECT id FROM role WHERE name = ? AND isDeleted = 0', 
  [name]
)
// 验证资源是否存在
const resourceCheckSql = `
  SELECT id, code FROM resource 
  WHERE code IN (${resourceCodes.map(() => '?').join(',')}) AND isDeleted = 0
`
const existingResources = await executeQuery(resourceCheckSql, resourceCodes)
if (existingResources.length !== resourceCodes.length) {
  const foundCodes = existingResources.map(r => r.code)
  const missingCodes = resourceCodes.filter(code => !foundCodes.includes(code))
  console.log(`以下资源编码不存在: ${missingCodes.join(', ')}`)
}
const validResourceIds = existingResources.map(r => r.id)
// 创建角色
const sql = `
  INSERT INTO role (name, code, description, isEnabled, isSystemDefault) 
  VALUES (?, ?, ?, ?, ?)
`
const createData = [name, code, description, isEnabled, isSystemDefault]
const insertResult = await executeQuery(sql, createData)
const roleId = insertResult.insertId
// 保存关联关系
const roleResourceSql = `
  INSERT INTO role_resource (roleId, resourceId) 
  VALUES ${validResourceIds.map(() => '(?, ?)').join(', ')}
`
const roleResourceParams = []
validResourceIds.forEach(resourceId => {
  roleResourceParams.push(roleId, resourceId)
})
await executeQuery(roleResourceSql, roleResourceParams)
res.send({
  id: roleId
})
```

### 修改
```javascript
const {
  id, name, code, description, isEnabled, resourceCodes
} = req.body
// 校验目标是否存在
const exists = await executeQuery('SELECT id, code, isSystemDefault FROM role WHERE id = ? AND isDeleted = 0', [id])
// 如果更新 code，检查唯一性
if (code) {
  const dup = await executeQuery(
    'SELECT COUNT(*) AS count FROM role WHERE code = ? AND id <> ? AND isDeleted = 0',
    [code, id]
  )
  if (dup[0].count > 0) {
    // 'code编码已存在'
  }
}
// 如果更新 name，检查唯一性
if (name) {
  const duplicateName = await executeQuery(
    'SELECT COUNT(*) AS count FROM role WHERE name = ? AND id <> ? AND isDeleted = 0', 
    [name, id]
  )
  if (duplicateName[0].count > 0) {
    // '角色名称已存在'
  }
}
// 如果提供了资源编码，验证资源是否存在
let validResourceIds = []
if (resourceCodes !== undefined) {
  if (resourceCodes && resourceCodes.length > 0) {
    const resourceCheckSql = `
      SELECT id, code FROM resource 
      WHERE code IN (${resourceCodes.map(() => '?').join(',')}) AND isDeleted = 0
    `
    const existingResources = await executeQuery(resourceCheckSql, resourceCodes)
    
    if (existingResources.length !== resourceCodes.length) {
      const foundCodes = existingResources.map(r => r.code)
      const missingCodes = resourceCodes.filter(code => !foundCodes.includes(code))
      return res.json({
        code: 400,
        message: `以下资源编码不存在: ${missingCodes.join(', ')}`
      })
    }
    
    validResourceIds = existingResources.map(r => r.id)
  }
  
  // 更新角色资源关联
  // 先删除旧的关联关系
  await executeQuery('DELETE FROM role_resource WHERE roleId = ?', [id])
  
  // 插入新的关联关系
  if (validResourceIds.length > 0) {
    const roleResourceSql = `
      INSERT INTO role_resource (roleId, resourceId) 
      VALUES ${validResourceIds.map(() => '(?, ?)').join(', ')}
    `
    const roleResourceParams = []
    validResourceIds.forEach(resourceId => {
      roleResourceParams.push(id, resourceId)
    })
    
    await executeQuery(roleResourceSql, roleResourceParams)
  }
}
// 动态构建更新字段
const updateFields = []
const updateValues = []

if (typeof name !== 'undefined') {
  updateFields.push('name = ?')
  updateValues.push(name)
}

if (typeof code !== 'undefined') {
  updateFields.push('code = ?')
  updateValues.push(code)
}

if (typeof description !== 'undefined') {
  updateFields.push('description = ?')
  updateValues.push(description)
}

if (typeof isEnabled !== 'undefined') {
  updateFields.push('isEnabled = ?')
  updateValues.push(isEnabled)
}

// 如果有要更新的字段，执行更新
if (updateFields.length > 0) {
  updateFields.push('updatedAt = NOW()')
  const updateSql = `UPDATE role SET ${updateFields.join(', ')} WHERE id = ? AND isDeleted = 0`
  updateValues.push(id)
  
  const updateResult = await executeQuery(updateSql, updateValues)
  if (!updateResult || updateResult.affectedRows === 0) {
    return res.json({
      code: 404,
      message: '资源不存在或已被删除'
    })
  }
}
```

### 分页查询
```javascript
// 查询总数
const countSql = `SELECT COUNT(*) as total FROM role`
const countResult = await executeQuery(countSql)
const total = countResult[0].total

// 查询分页数据
const dataSql = `
  SELECT id, name, description, code, isEnabled, isSystemDefault, createdAt, updatedAt 
  FROM role 
  ORDER BY isSystemDefault DESC, createdAt DESC 
  LIMIT ? OFFSET ?
`
const rows = await executeQuery(dataSql, [size, offset])

// 查询每个角色关联的资源列表
const roleIds = rows.map(r => r.id)
if (roleIds.length > 0) {
  const placeholders = roleIds.map(() => '?').join(', ')
  const rrSql = `
    SELECT 
      rr.roleId,
      r.id AS resourceId,
      r.code,
      r.name,
      r.type,
      r.parentCode,
      r.isEnabled,
      r.isDeleted,
      r.isSystemDefault,
      r.createdAt,
      r.updatedAt
    FROM role_resource rr
    JOIN resource r ON rr.resourceId = r.id
    WHERE rr.isDeleted = 0 AND r.isDeleted = 0 AND rr.roleId IN (${placeholders})
  `
  const rrRows = await executeQuery(rrSql, roleIds)
  const map = new Map()
  for (const it of rrRows) {
    if (!map.has(it.roleId)) map.set(it.roleId, [])
    map.get(it.roleId).push({
      ...omit(it, ['roleId', 'resourceId'])
      id: it.resourceId
    })
  }
  for (const r of rows) {
    r.resources = map.get(r.id) || []
  }
}
res.send({
  rows,
  total
})
```

### 删除
```javascript
const { id } = req.params

// 检查角色是否存在
const existingRole = await getOneRowInternal(id)
if (!existingRole) {
  // '资源不存在或已被删除'
}

// 检查系统默认角色是否可以删除
if (existingRole.isSystemDefault === 1) {
  // '系统内置资源不能删除'
}

// 检查是否有用户关联此角色
const userRoles = await executeQuery(
  'SELECT COUNT(*) as count FROM user_role WHERE roleId = ? AND isDeleted = 0',
  [id]
)

if (userRoles[0].count > 0) {
  // '该角色下还有用户，无法删除'
}

// 软删除角色
const sql = 'UPDATE role SET isDeleted = 1, updatedAt = NOW() WHERE id = ? AND isDeleted = 0'
const result = await executeQuery(sql, [id])

if (!result || result.affectedRows === 0) {
  return res.json({
    code: 404,
    message: '资源不存在或已被删除'
  })
}

// 硬删除关联资源列表
await executeQuery('DELETE FROM role_resource WHERE roleId = ?', [id])
```