
# map 的值类型如何使用 string | int 这种联合类型 union type
在 Go 语言中，**map 的值类型不能直接使用 `string | int` 这种联合类型（union type）**，因为 Go 是一门强类型语言，且在 Go 1.18 引入泛型之前，并不支持联合类型；即便有了泛型，map 的值类型也必须是一个确定的类型（或通过泛型参数约束的类型集合）。

## 具体原因：
### 1. Go 不支持原生联合类型
Go 语法中没有 `string | int` 这样的联合类型表示方式（不同于 TypeScript 等语言）。变量、函数返回值、集合元素的类型必须是**单一确定的类型**（如 string、int、自定义结构体等），或通过泛型参数定义的 “类型集合”。

### 2. map 的值类型必须明确
map 的定义格式是 map[K]V，其中 K（键类型）和 V（值类型）都必须是确定的类型。例如：
```go
// 合法：值类型为 string
m1 := map[int]string{}

// 合法：值类型为 int
m2 := map[int]int{}

// 非法：不存在 string|int 类型
m3 := map[int]string|int{} // 编译报错
```

## 如何实现 “值可以是 string 或 int”？
如果需要 map 的值支持多种类型，可以通过以下方式间接实现：
### 1. 使用 interface{} 作为值类型（最常见）
interface{} 是 Go 中的空接口，任何类型都实现了空接口，因此可以作为 “万能类型” 存储：
```go
m := map[int]interface{}{}
m[1] = "hello"   // 存 string
m[2] = 123       // 存 int

// 取值时需要类型断言
v1, ok := m[1].(string)
if ok {
    fmt.Println("string value:", v1)
}

v2, ok := m[2].(int)
if ok {
    fmt.Println("int value:", v2)
}
```

### 2. 使用自定义结构体封装（更安全）
通过结构体显式标记类型，避免类型断言出错，需手动处理类型转换
```go
type Value struct {
    StrVal string
    IntVal int
    IsStr  bool // 标记当前值是 string 还是 int
}

m := map[int]Value{}
m[1] = Value{StrVal: "hello", IsStr: true}
m[2] = Value{IntVal: 123, IsStr: false}

// 取值时通过 IsStr 判断类型
if m[1].IsStr {
    fmt.Println("string value:", m[1].StrVal)
}
if !m[2].IsStr {
    fmt.Println("int value:", m[2].IntVal)
}
```
### 3. 使用泛型（Go 1.18+，类型安全但稍复杂）
通过泛型约束限制值类型为 string 或 int：
```go
package main

import "fmt"

// 定义泛型类型，约束为 string 或 int
type MyMap[K comparable, V string | int] map[K]V

func main() {
    // 可以实例化为 map[int]string
    m1 := MyMap[int, string]{}
    m1[1] = "hello"
    
    // 可以实例化为 map[int]int
    m2 := MyMap[int, int]{}
    m2[2] = 123
    
    fmt.Println(m1[1], m2[2]) // 输出：hello 123
}
```
但注意：**泛型实例化后的值类型仍然是单一类型**（要么全是 string，要么全是 int），无法在同一个 map 中混合存储两种类型。

## 总结
| **方法**         | **优点**                     | **缺点**                     |
|------------------|-----------------------------|-----------------------------|
| `interface{}`    | 灵活，支持任意类型           | 类型不安全，需手动断言       |
| 自定义类型封装   | 结构清晰，部分类型安全       | 代码冗余，仍需类型断言       |
| 泛型（同构类型） | 类型安全，编译期检查         | 不能混合存储不同类型         |

根据需求选择方案：**快速实现用 `interface{}`，追求类型安全用自定义封装**。
