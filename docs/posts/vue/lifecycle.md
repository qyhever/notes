- [Vue 生命周期](#vue-生命周期)
  - [父子组件](#父子组件)
    - [总结](#总结)
  - [兄弟组件](#兄弟组件)
    - [总结](#总结-1)
  - [mixin](#mixin)
    - [总结](#总结-2)


# Vue 生命周期
分 3 个角度来分析下生命周期的执行顺序。

## 父子组件
父组件：
```vue
<template>
  <div>
    <h2>Parent</h2>
    <button @click="count += 1">更新data {{count}}</button>
    <p></p>
    <button @click="propCount += 1">更新props {{propCount}}</button>
    <p></p>
    <button @click="handleDestroy">销毁</button>
    <Son :propCount="propCount"></Son>
  </div>
</template>

<script>
import Son from './son.vue'
export default {
  name: 'Parent',
  components: {
    Son
  },
  data() {
    return {
      count: 1,
      propCount: 1
    }
  },
  beforeCreate() {
    this.componentName = 'Parent'
    console.log(`${this.componentName}: `, 'beforeCreate')
  },
  created() {
    console.log(`${this.componentName}: `, 'created')
  },
  beforeMount() {
    console.log(`${this.componentName}: `, 'beforeMount')
  },
  mounted() {
    console.log(`${this.componentName}: `, 'mounted')
  },
  beforeUpdate() {
    console.log(`${this.componentName}: `, 'beforeUpdate')
  },
  updated() {
    console.log(`${this.componentName}: `, 'updated')
  },
  beforeDestroy() {
    console.log(`${this.componentName}: `, 'beforeDestroy')
  },
  destroyed() {
    console.log(`${this.componentName}: `, 'destroyed')
  },
  methods: {
    handleDestroy() {
      this.$destroy()
    }
  }
}
</script>
```

子组件：
```vue
<template>
  <div class="son">
    <h3>{{this.name}}</h3>
    <button @click="count += 1">更新 {{count}}</button>
    <p>propCount: {{propCount}}</p>
    <button @click="handleDestroy">销毁</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  props: {
    name: {
      type: String,
      default: 'Son'
    },
    propCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      count: 1
    }
  },
  beforeCreate() {
    console.log('Son: ', 'beforeCreate')
  },
  created() {
    console.log(`${this.name}: `, 'created')
  },
  beforeMount() {
    console.log(`${this.name}: `, 'beforeMount')
  },
  mounted() {
    console.log(`${this.name}: `, 'mounted')
  },
  beforeUpdate() {
    console.log(`${this.name}: `, 'beforeUpdate')
  },
  updated() {
    console.log(`${this.name}: `, 'updated')
  },
  beforeDestroy() {
    console.log(`${this.name}: `, 'beforeDestroy')
  },
  destroyed() {
    console.log(`${this.name}: `, 'destroyed')
  },
  methods: {
    handleDestroy() {
      this.$destroy()
    }
  }
}
</script>

<style scoped>
.son {
  padding: 20px;
  border: 1px solid #eee;
}
</style>
```

- 初始化组件，打印：
```
Parent:  beforeCreate
Parent:  created
Parent:  beforeMount
Son:  beforeCreate
Son:  created
Son:  beforeMount
Son:  mounted
Parent:  mounted
```

- 父组件更新 `data` 中的值，打印：
```
Parent:  beforeUpdate
Parent:  updated
```

- 子组件更新 `data` 中的值，打印：
```
Son:  beforeUpdate
Son:  updated
```

- 父组件更新 `props` 值（子组件接受的 `props` 没有在页面渲染），打印：
```
Parent:  beforeUpdate
Parent:  updated
```

- 父组件更新 `props` 值（子组件接受的 `props` 在页面渲染），打印：
```
Parent:  beforeUpdate
Son:  beforeUpdate
Son:  updated
Parent:  updated
```

- 父组件销毁，打印：
```
Parent:  beforeDestroy
Son:  beforeDestroy
Son:  destroyed
Parent:  destroyed
```

- 子组件销毁，打印：
```
Son:  beforeDestroy
Son:  destroyed
```

### 总结
- 父组件会在子组件调用 `mounted` 后，才会调用自己的 `mounted`。
- 更新组件内 `data` 中的值，只会调用本组件的 `beforeUpdate`、`updated`。
> `react` 调用 `setState` 更新 `state` 中的值，会以本组件为根，整个组件子树都会调用 `render` 方法。 `vue` 不会有这类问题，因为 `vue` 的响应式是精准劫持，而 `react` 则是对比上传数据 和 本次数据的引用 `diff` 来触发渲染。通常 `react` 会使用 `PureComponent` 和 `memo` 来避免此类问题。
- 父组件更新 `props` 值，如果子组件没有使用在页面中，则子组件不会调用 `updated`。
- 父组件会在子组件调用 `updated` 后，才会调用自己的 `updated`。
- 父组件会在子组件调用 `destroyed` 后，才会调用自己的 `destroyed`。

## 兄弟组件
父组件稍微调整：
```vue
<template>
  <Son name="Son1" :propCount="propCount"></Son>
  <Son name="Son2" :propCount="propCount"></Son>
</template>
```

- 初始化组件，打印：
```
Parent:  beforeCreate
Parent:  created
Parent:  beforeMount
Son:  beforeCreate
Son1:  created
Son1:  beforeMount
Son:  beforeCreate
Son2:  created
Son2:  beforeMount
Son1:  mounted
Son2:  mounted
Parent:  mounted
```

- 父组件更新 `props` 值（子组件接受的 `props` 在页面渲染），打印：
```
Parent:  beforeUpdate
Son1:  beforeUpdate
Son2:  beforeUpdate
Son2:  updated
Son1:  updated
Parent:  updated
```

- 父组件销毁，打印：
```
Parent:  beforeDestroy
Son1:  beforeDestroy
Son1:  destroyed
Son2:  beforeDestroy
Son2:  destroyed
Parent:  destroyed
```

### 总结
- 组件的初始化（ `mounted` 之前）分开进行，挂载是从上到下依次进行。
- 当没有数据关联时，兄弟组件之间的更新和销毁互不关联。

## mixin
新增 `mixin.js` 文件，然后保留一个 `Son` 组件
- 初始化组件，打印：
```
mixin:  beforeCreate
Parent:  beforeCreate
mixin:  created
Parent:  created
mixin:  beforeMount
Parent:  beforeMount
Son:  beforeCreate
Son:  created
Son:  beforeMount
Son:  mounted
mixin:  mounted
Parent:  mounted
```

- 父组件更新 `data` 中的值，打印：
```
mixin:  beforeUpdate
Parent:  beforeUpdate
mixin:  updated
Parent:  updated
```

- 子组件更新 `data` 中的值，打印：
```
Son:  beforeUpdate
Son:  updated
```

- 父组件更新 `props` 值（子组件接受的 `props` 没有在页面渲染），打印：
```
mixin:  beforeUpdate
Parent:  beforeUpdate
mixin:  updated
Parent:  updated
```

- 父组件更新 `props` 值（子组件接受的 `props` 在页面渲染），打印：
```
mixin:  beforeUpdate
Parent:  beforeUpdate
Son:  beforeUpdate
Son:  updated
mixin:  updated
Parent:  updated
```

- 父组件销毁，打印：
```
mixin:  beforeDestroy
Parent:  beforeDestroy
Son:  beforeDestroy
Son:  destroyed
mixin:  destroyed
Parent:  destroyed
```

- 子组件销毁，打印：
```
Son:  beforeDestroy
Son:  destroyed
```

### 总结
- `mixin` 中的生命周期方法仅在引入本组件调用。
- `mixin` 中的生命周期优先执行。
