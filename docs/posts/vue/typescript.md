- [两种设置 props 默认值的方法](#两种设置-props-默认值的方法)
  - [props 解构赋值默认值](#props-解构赋值默认值)
  - [withDefaults](#withdefaults)
- [(Array\<Foo | Bar\>) and (Foo\[\] | Bar\[\])](#arrayfoo--bar-and-foo--bar)
- [...rest 剩余参数或者 arguments 参数传递的类型错误](#rest-剩余参数或者-arguments-参数传递的类型错误)


### 两种设置 props 默认值的方法
#### props 解构赋值默认值
```javascript
interface IProps {
  type?: 'foo' | 'bar'
}

const { info = 'foo' } = defineProps<IProps>()
```

#### withDefaults
```javascript
interface IProps {
  type?: 'foo' | 'bar'
}

withDefaults(defineProps<IProps>(), {
  type: 'foo'
})
```

### (Array<Foo | Bar>) and (Foo[] | Bar[])
两者在类型上是不同的，这点在使用 map 方法时很明显的报错  
https://github.com/microsoft/TypeScript/issues/33591#issuecomment-786443978  

### ...rest 剩余参数或者 arguments 参数传递的类型错误
```javascript
function foo(a: number, b: number, c: number) {
  return a + b + c
}

// 编译异常
function bar(...rest: number[]) {
  return foo(...rest) // error: Expected 3 arguments, but got 0 or more.
}

// 正确方式
type RestParamType = Parameters<typeof foo> // 使用 Parameters 将 foo 的参数类型挖出来

function bar(...rest: RestParamType) {
  return foo(...rest) // success
}
```
