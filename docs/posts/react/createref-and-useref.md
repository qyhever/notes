- [createRef vs useRef](#createref-vs-useref)
- [FC每次渲染获取到的状态不是实时状态？](#fc每次渲染获取到的状态不是实时状态)


在class时代，由于组件节点是通过class实例化而得，因此可以在类实例上存放内容，这些内容随着实例化产生，随着componentWillUnmount销毁。但是在hook的范围下，函数组件并没有this和对应的实例，因此useRef作为这一能力的弥补，扮演着跨多次渲染存放内容的角色。

每一个希望深入hook实践的开发者都必须记住这个结论，无法自如地使用useRef会让你失去hook将近一半的能力。

ref是一个与组件对应的React节点生命周期相同的，可用于存放自定义内容的容器。

### createRef vs useRef

都可以用来获取 dom 或者 组件实例，但 useRef 明显可以做的更多。

**createRef 每次渲染都会返回一个新的引用，而 useRef 每次渲染始终都是一个引用。**

```javascript
import React, { useState, useRef, createRef } from 'react'

const Demo = () => {
  const [count, setCount] = useState(0)
  const refFromCreateRef = createRef()
  const refFromUseRef = useRef()

  if (!refFromCreateRef.current) { // 每次渲染都为 null
    refFromCreateRef.current = count
  }

  if (!refFromUseRef.current) { // 第一次渲染为 null，后面渲染都为 1
    refFromUseRef.current = count
  }

  const handleClick = () => {
    setCount(v => v + 1)
  }

  return (
    <div>
      <p>current count {count}</p>
      <p>refFromCreateRef.current {refFromCreateRef.current}</p>
      <p>refFromUseRef.current {refFromUseRef.current}</p>
      <button onClick={handleClick}>click</button>
    </div>
  )
}
```

点击按钮，refFromCreateRef.current每次渲染最新的 count， refFromUseRef.current 每次都渲染 1

### FC每次渲染获取到的状态不是实时状态？

看下面的这个例子。它在两秒后会alert点击次数`count`：

```javascript
import React, { useState } from 'react'

const Demo = () => {
  const [count, setCount] = useState(0)

  const handleAddClick = () => {
    setCount(count + 1)
  }

  const handleAlertClick = () => {
    setTimeout(() => {
      alert('you clicked on: ' + count)
    }, 2000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleAddClick}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  )
}
```

按以下步骤操作：

- **点击增加**count到3
- **点击一下** “Show alert”
- **点击增加** count到5并且在定时器回调触发前完成

alert 会弹出什么? 

会是5吗？— 这个值是alert的时候count的实时状态。或者会是3吗？— 这个值是点击时候的状态。

结果是3



**为什么 alert 的不是 count 的实时状态?** 

实际上，每一次渲染都有一个“新版本”的`handleAlertClick`。每一个版本的`handleAlertClick`“记住” 了它自己的 `count`



**如何修改 让 alert 的是 count 的实时状态**

```javascript
import React, { useState, useRef } from 'react'

const Demo = () => {
  const [count, setCount] = useState(0)
  const latestCount = useRef(count)
  latestCount.current = count

  const handleAddClick = () => {
    setCount(count + 1)
  }

  const handleAlertClick = () => {
    setTimeout(() => {
      alert('you clicked on: ' + latestCount.current)
    }, 2000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleAddClick}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  )
}
```

useRef 每次都会返回同一个引用，每次渲染都会把最新 count 赋值给这个引用，在 alert 的时候访问的引用保存的是最新的 count。

React官方称useRef为“hook中的作弊器”，所谓的“作弊”，是指它打破了类似useCallback、useEffect对闭包的约束，使用一个“可变的容器”让ref不需要成为闭包的依赖也可以在闭包中获得最新的内容。
