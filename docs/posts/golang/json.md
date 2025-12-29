# json 的序列化和反序列化

### 核心函数
- **序列化**：`json.Marshal(v interface{}) ([]byte, error)`  
将任意数据类型（通常是结构体、map、切片等）转换为 JSON 字节流。
- **反序列化**：`json.Unmarshal(data []byte, v interface{}) error`  
将 JSON 字节流解析到目标变量（需传入变量指针）。

### 1. 基本用法（结构体与 JSON 互转）
结构体是最常用的 JSON 处理载体，通过**结构体标签（tag）** 控制 JSON 字段的名称、格式等。

#### 示例：序列化（结构体 → JSON）
```go
package main

import (
    "encoding/json"
    "fmt"
)

// 定义结构体，通过 tag 指定 JSON 字段名
type User struct {
    Name     string `json:"name"`   // 序列化后字段名为 "name"
    Age      int    `json:"age"`    // 字段名为 "age"
    Email    string `json:"email"`
    IsActive bool   `json:"is_active"` // 驼峰转下划线示例
    // 小写字段默认不序列化（未导出）
    password string `json:"-"` // 显式指定 "-" 表示不序列化该字段
}

func main() {
    user := User{
        Name:     "Alice",
        Age:      30,
        Email:    "alice@example.com",
        IsActive: true,
        password: "secret", // 不会被序列化
    }

    // 序列化：结构体 → JSON 字节流
    jsonData, err := json.Marshal(user)
    if err != nil {
        fmt.Println("序列化失败：", err)
        return
    }

    fmt.Println("JSON 字符串：", string(jsonData))
    // 输出：{"name":"Alice","age":30,"email":"alice@example.com","is_active":true}
}
```

#### 示例：反序列化（JSON → 结构体）
```go
func main() {
    jsonStr := `{"name":"Bob","age":25,"email":"bob@example.com","is_active":false}`
    
    var user User
    // 反序列化：JSON 字节流 → 结构体（需传入指针）
    err := json.Unmarshal([]byte(jsonStr), &user)
    if err != nil {
        fmt.Println("反序列化失败：", err)
        return
    }

    fmt.Printf("解析结果：%+v\n", user)
    // 输出：解析结果：{Name:Bob Age:25 Email:bob@example.com IsActive:false password:}
}
```

### 2. 其他数据类型的 JSON 处理
除了结构体，map、切片、基本类型也可直接序列化 / 反序列化。

#### 示例：map 与 JSON 互转
```go
// 序列化 map
m := map[string]interface{}{
    "name": "Charlie",
    "age":  28,
    "hobbies": []string{"reading", "coding"},
}
jsonData, _ := json.Marshal(m)
fmt.Println(string(jsonData)) // {"age":28,"hobbies":["reading","coding"],"name":"Charlie"}

// 反序列化到 map
var m2 map[string]interface{}
json.Unmarshal(jsonData, &m2)
fmt.Println(m2["name"]) // Charlie
```

#### 示例：切片与 JSON 互转
```go
// 序列化切片
nums := []int{1, 2, 3, 4}
jsonData, _ := json.Marshal(nums)
fmt.Println(string(jsonData)) // [1,2,3,4]

// 反序列化到切片
var nums2 []int
json.Unmarshal(jsonData, &nums2)
fmt.Println(nums2) // [1 2 3 4]
```

### 3. 常用结构体标签（tag）参数
通过结构体字段后的 `json:"参数"` 标签控制序列化行为：

- `json:"name"`：指定 JSON 字段名为 `name`（默认用结构体字段名）。
- `json:"-"`：忽略该字段，不参与序列化 / 反序列化。
- `json:"name,omitempty"`：若字段值为零值（如 `""`、`0`、`false`），则不序列化该字段。
- `json:"name,string"`：将数值类型序列化为字符串（如 `age int` 序列化为 `"30"`）。

示例：
```go
type Data struct {
    ID    int    `json:"id,omitempty"` // 若 ID=0，则不序列化
    Score int    `json:"score,string"` // 序列化为字符串类型
    Msg   string `json:"-"`            // 始终忽略
}

d := Data{ID: 0, Score: 90, Msg: "hidden"}
jsonData, _ := json.Marshal(d)
fmt.Println(string(jsonData)) // {"score":"90"}
```

### 4. 注意事项
1. **字段可见性：**
只有**导出字段**（首字母大写）才会被序列化 / 反序列化，小写字段会被忽略。
2. **零值处理：**
反序列化时，若 JSON 中缺少某字段，结构体中对应字段会被设为零值（如 int 为 0，string 为 ""）。
3. **类型匹配：**
反序列化时，JSON 字段类型需与目标结构体字段类型兼容（如 JSON 数字可转为 int/float64，但字符串不能直接转为 int）。
4. **嵌套结构体：**
嵌套结构体的导出字段会被递归序列化，若需扁平化处理，可使用 json:"field,omitempty" 标签。
5. **错误处理：**
务必检查 Marshal 和 Unmarshal 的返回错误（如类型不匹配、JSON 格式错误等）。

### 5. 高级用法：自定义序列化 / 反序列化
若需自定义字段的 JSON 处理逻辑（如时间格式转换），可实现 `json.Marshaler` 和 `json.Unmarshaler` 接口：
```go
import "time"

type MyTime struct {
    time.Time
}

// 自定义序列化：将时间转为 "2006-01-02" 格式
func (t MyTime) MarshalJSON() ([]byte, error) {
    return json.Marshal(t.Format("2006-01-02"))
}

// 自定义反序列化：解析 "2006-01-02" 格式的时间
func (t *MyTime) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    parsed, err := time.Parse("2006-01-02", s)
    if err != nil {
        return err
    }
    t.Time = parsed
    return nil
}

// 使用示例
type Event struct {
    Name string  `json:"name"`
    Date MyTime  `json:"date"`
}
```

### 总结
- 标准库 encoding/json 提供 Marshal（序列化）和 Unmarshal（反序列化）核心函数。
- 结构体通过标签（tag）控制 JSON 字段的名称、可见性等。
- 支持 map、切片、基本类型的 JSON 处理。
- 注意字段导出性、类型匹配和错误处理，复杂场景可通过自定义接口实现特殊逻辑。
