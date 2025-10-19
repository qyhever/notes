- [原生 nodejs 下载](#原生-nodejs-下载)
  - [预览](#预览)
  - [下载](#下载)

## 原生 nodejs 下载
```javascript
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  // 设置下载文件名
  res.setHeader('Content-Disposition', 'attachment; filename="l.png"')
  // 设置响应头，告诉客户端这是一个文件下载
  // application/octet-stream 表示这是一个二进制流文件。浏览器遇到这种类型时，会将其视为二进制文件并触发下载行为
  // res.setHeader('Content-Type', 'application/octet-stream')
  // res.setHeader('Content-Type', 'image/png')
  // 方式一：读取文件直接返回
  fs.readFile('./logo.png', (err, data) => {
    if (err) {
      res.end('error')
    } else {
      res.end(data)
    }
  })
  // // 方式二：文件流式传输
  // const fileStream = fs.createReadStream('./logo.png')
  // // 将文件流管道到响应对象，实现自动传输
  // fileStream.pipe(res)
}).listen(4000, () => {
	console.log('running...')
})
```

### 预览
如果是预览，不设置任何 header，浏览器可能正确显示预览文件，保险起见，还是设置 header 头 Content-Type 为文件对应的 mineType

### 下载
如果只设置 header 头 `'Content-Type': 'application/octet-stream'`，那么可以触发下载，但是文件下载名为默认的 “下载”，没有后缀名。

如果只设置 header 头 `'Content-Disposition', 'attachment; filename="l.png"'`，那么可以触发下载，下载文件名也是设置的文件名，但保险起见，还是设置 header 头 `'Content-Type': 'application/octet-stream'`.
