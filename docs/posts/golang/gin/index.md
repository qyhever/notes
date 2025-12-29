
### 获取参数
### 获取 路径 参数
```go
idStr := c.Param("id")
id, err := strconv.ParseUint(idStr, 10, 64)
```

### 获取 query 参数
```go
currentPage, _ := strconv.Atoi(c.DefaultQuery("currentPage", "1"))
pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))
sortField := c.DefaultQuery("sortField", "createdAt")
sortValue := c.DefaultQuery("sortValue", "desc")
name := c.Query("name")
code := c.Query("code")
```

### 获取 body 参数
```go
type ResourceCreateParam struct {
	Code            string `json:"code" binding:"required"`
	Name            string `json:"name" binding:"required"`
	Type            string `json:"type" binding:"required"`
	ParentCode      string `json:"parentCode"`
	IsDeleted       int    `json:"isDeleted"`
	IsEnabled       int    `json:"isEnabled"`
	IsSystemDefault int    `json:"isSystemDefault"`
}

var param models.ResourceCreateParam
if err := c.ShouldBindJSON(&param); err != nil {
  ResponseErrorWithMsg(c, CodeInvalidParam, "请求参数错误: "+err.Error())
  return
}
// 调用服务创建资源（默认值在服务层设置）
insertId, err := rc.resourceService.Create(&param)
```