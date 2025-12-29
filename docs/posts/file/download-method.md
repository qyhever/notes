
### 服务端下载
服务端返回文件并设置请求头 `'Content-Disposition', 'attachment; filename="foo.png"'`

客户端通过 a 标签直接链接到服务端接口地址即可
```html
<a href="/api/foo">下载</a>
```

需要同源

### 客户端下载
如果服务端返回文件，但是没有设置 `Content-Disposition` 头

客户端还是通过 a 标签链接到服务端接口地址，不过还需要加上 `download` 属性，设置的属性值就是下载的文件名
```html
<a href="/api/foo" download="foo.png">下载</a>
```

需要同源

#### 通过异步请求下载
有时候在下载前需要做一些基于用户的校验，那么可以通过先请求接口返回 blob，再生成链接通过模拟 a 点击来下载
```javascript
async function downloadFoo () {
  const r = await fetch('/api/foo', {
    headers: {
      Authorization: 'Bearer' + localStorage.getItem('token')
    }
  })
  const blob = await r.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'foo.png'
  a.click()
}
```

上面的代码可用，但是会有性能问题

本身通过 a 标签直接下载，是服务端直接下载到本地。异步下载需要先将文件二进制下载到浏览器内存，再下载到本地，浏览器承担了更多。

改进方案
- 第一次通过 ajax 请求带上 token 请求服务端第一个接口地址，这个接口收到 token 后，设置一个有效期极短的 cookie
- a 标签链接一个服务端第二个接口地址，浏览器默认带上 cookie，服务端这时候就能做校验了，通过校验后，下载文件
  