- [setState 是同步还是异步相关问题](#setstate-是同步还是异步相关问题)
	- [setState 是同步还是异步？](#setstate-是同步还是异步)
	- [何时是同步，何时是异步呢？](#何时是同步何时是异步呢)
	- [那为什么会出现异步的情况呢？](#那为什么会出现异步的情况呢)
	- [那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？](#那如何在表现出异步的函数里可以准确拿到更新后的-state-呢)
	- [那表现出异步的原理是怎么样的呢？](#那表现出异步的原理是怎么样的呢)

### setState 是同步还是异步相关问题
#### setState 是同步还是异步？
严格来讲，useState不是像 Promise 那样的异步 API；但更新不会立刻应用。可以把 setState 理解为向 React 发出的请求：
`“请把这个值改成 X，等合适的时机再更新 UI。”`
React 会在下一次渲染周期里应用更新，而不是在当前函数调用过程中立刻改写变量。因此，在 setState 后立刻读取，看到的仍是更新前的值。

执行过程代码同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，所以表现出来有时是同步，有时是“异步”。

#### 何时是同步，何时是异步呢？

只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout/setInterval等原生 API 中都是同步的。简单的可以理解为被 React 控制的函数里面就会表现出“异步”，反之表现为同步。

#### 那为什么会出现异步的情况呢？

为了做性能优化，将 state 的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实 dom，那么它将带来巨大的性能消耗。

#### 那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？

通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

或者可以通过给 setState 传递函数来表现出同步的情况：

```javascript
this.setState((state) => {
	return { val: newVal }
})
```

#### 那表现出异步的原理是怎么样的呢？

直接讲源码肯定篇幅不够，可以看这篇文章：[你真的理解setState吗](https://juejin.im/post/6844903636749778958)。

我这里还是用最简单的语言让你理解：在 React 的 setState 函数实现中，会根据 isBatchingUpdates(默认是 false) 变量判断是否直接更新 this.state 还是放到队列中稍后更新。然后有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 true，当 React 调用事件处理函数之前，或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新。

这样你就可以理解为什么原生事件和 setTimeout/setinterval 里面调用 this.state 会同步更新了吧，因为通过这些函数调用的 React 没办法去调用 batchedUpdate 函数将 isBatchingUpdates 设置为 true，那么这个时候 setState 的时候默认就是 false，那么就会同步更新。
