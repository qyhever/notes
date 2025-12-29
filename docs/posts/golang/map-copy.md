
# map 类型如何复制
在 Go 语言中，**map 是引用类型**（类似切片、通道），直接赋值只会复制引用（即两个变量指向同一个底层数据结构），修改其中一个会影响另一个。因此，若需要真正复制一个 map（即创建独立的副本，修改副本不影响原 map），需要手动遍历原 map 并将键值对逐一复制到新 map 中。

## 1. 错误的复制方式（仅复制引用）
直接赋值会导致两个 map 共享底层数据，修改任一都会相互影响：
```go
package main

import "fmt"

func main() {
    original := map[string]int{"a": 1, "b": 2}
    copyMap := original // 仅复制引用，不是真正的复制

    copyMap["a"] = 100  // 修改副本
    fmt.Println(original["a"]) // 输出 100（原 map 也被修改了）
}
```

## 2. 正确的复制方式（深度复制）
需要手动创建新 map，然后遍历原 map 的键值对，逐一存入新 map：
```go
package main

import "fmt"

func copyMap(original map[string]int) map[string]int {
    // 创建新 map，容量可指定为原 map 大小（可选，提升性能）
    newMap := make(map[string]int, len(original))
    // 遍历原 map，复制键值对到新 map
    for k, v := range original {
        newMap[k] = v
    }
    return newMap
}

func main() {
    original := map[string]int{"a": 1, "b": 2}
    copyMap := copyMap(original) // 真正的复制

    copyMap["a"] = 100          // 修改副本
    fmt.Println(original["a"])  // 输出 1（原 map 不受影响）
    fmt.Println(copyMap["a"])   // 输出 100
}
```

## 3. 特殊情况：嵌套 map 的复制
如果 map 的值是**嵌套 map**（即 map[K]map[K]V），上述方法只能复制外层 map，内层 map 仍然是引用类型。此时需要**递归复制**内层 map 才能完全独立：
```go
package main

import "fmt"

// 递归复制嵌套 map
func deepCopy(original map[string]map[int]string) map[string]map[int]string {
    newMap := make(map[string]map[int]string, len(original))
    for k, v := range original {
        // 对内层 map 也进行复制
        innerMap := make(map[int]string, len(v))
        for k2, v2 := range v {
            innerMap[k2] = v2
        }
        newMap[k] = innerMap
    }
    return newMap
}

func main() {
    original := map[string]map[int]string{
        "group1": {1: "a", 2: "b"},
    }
    copyMap := deepCopy(original)

    // 修改副本的内层 map
    copyMap["group1"][1] = "x"
    fmt.Println(original["group1"][1]) // 输出 a（原 map 不受影响）
}
```

## 总结：
- map 是引用类型，直接赋值不会复制数据，只会共享底层结构。
- 浅复制（单一层次 map）：创建新 map 并遍历复制键值对。
- 深复制（嵌套 map）：需要递归复制所有层级的 map，确保所有数据独立。
- 复制时指定新 map 的初始容量（make(map[K]V, len(original))）可减少动态扩容，提升性能。
