

使用 fetch 手动解析 SSE 流  

更灵活，适用于需要自定义请求方式，自定义请求头  

### 普通版

```javascript
export const createFetchSSE = (url) => {
  const decoder = new TextDecoder()
  const controller = new AbortController()
  fetch(url, {
    method: 'GET',
    signal: controller.signal,
    // headers: {},
  }).then((res) => {
    // 创建一个 ReadableStreamDefaultReader 去读取字节流数据
    const reader = res.body.getReader()
    const processHandle = ({ done, value }) => {
      if (done) {
        controller.abort()
        return
      }
      // value 为 Uint8Array 二进制数组
      const decodeValue = decoder.decode(value)
      const data = parseMessage(decodeValue)
      if (data.type === 'close') {
        controller.abort()
        return
      }
      // 读取下一个流数据
      return reader.read().then(processHandle)
    }
    reader.read().then(processHandle)
  })
}

function parseMessage(rawMessage) {
  const lines = rawMessage.split('\n')
  const message = {
    id: '',
    event: 'message',
    data: '',
    parsedData: null,
  }

  lines.forEach((line) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) return
    const field = line.slice(0, colonIndex).trim()
    const value = line.slice(colonIndex + 1).trim()
    switch (field) {
      case 'data':
        // data 字段可以有多行，用 \n 连接
        message.data += (message.data ? '\n' : '') + value
        break
      case 'event':
        message.event = value
        break
      case 'id':
        message.id = value
        break
    }
  })
  // 尝试解析 JSON 数据
  if (message.data) {
    try {
      message.parsedData = JSON.parse(message.data)
    } catch (error) {
      message.parsedData = message.data
    }
  }
  return message
}
```


### 进阶版

```javascript
export async function connectSSE(url, options = {}) {
  const { onMessage, onClose, onError, headers = {} } = options
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'text/event-stream',
        ...headers,
      },
    })
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      // 解码数据块
      buffer += decoder.decode(value, { stream: true })
      // 按双换行符分割事件
      const parts = buffer.split('\n\n')
      buffer = parts.pop() // 保留未完成的部分
      // 解析每个完整的事件
      for (const part of parts) {
        if (part.trim()) {
          const events = parseSSEMessage(part + '\n\n')
          events.forEach((event) => {
            console.log('event: ', event.data)
            try {
              // 尝试解析 JSON 数据
              const data = JSON.parse(event.data)
              if (event.event === 'close' && onClose) {
                onClose(data, event)
              } else if (onMessage) {
                onMessage(data, event)
              }
            } catch (e) {
              // 如果不是 JSON，直接传递原始数据
              if (onMessage) {
                onMessage(event.data, event)
              }
            }
          })
        }
      }
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}

function parseSSEMessage(text) {
  const events = []
  const lines = text.split('\n')
  let currentEvent = {
    id: null,
    event: 'message', // 默认事件类型
    data: '',
    retry: null,
  }
  for (let line of lines) {
    line = line.trim()
    // 空行表示一个事件结束
    if (line === '') {
      if (currentEvent.data) {
        events.push({ ...currentEvent })
        currentEvent = {
          id: null,
          event: 'message',
          data: '',
          retry: null,
        }
      }
      continue
    }
    // 注释行（以冒号开头）
    if (line.startsWith(':')) {
      continue
    }
    // 解析字段
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    const field = line.substring(0, colonIndex)
    let value = line.substring(colonIndex + 1)
    // 去掉值开头的空格
    if (value.startsWith(' ')) {
      value = value.substring(1)
    }
    switch (field) {
      case 'id':
        currentEvent.id = value
        break
      case 'event':
        currentEvent.event = value
        break
      case 'data':
        // data 字段可以有多行，用 \n 连接
        currentEvent.data += (currentEvent.data ? '\n' : '') + value
        break
      case 'retry':
        currentEvent.retry = parseInt(value, 10)
        break
    }
  }
  return events
}

```

### nodejs 实现简单 sse 接口

```javascript
import http from 'http'

const server = http.createServer((req, res) => {
  if (req.url === '/sse') {
    const allowHeaders = [
      'x-requested-with',
      'content-type',
      'cache-control',
      // ...其他需要的 header
    ]
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': allowHeaders.join(','),
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache'
    })
    let count = 0
    const str =

    'SSE (Server-Sent Events) 协议是一种基于 HTTP 的单向通信技术，允许服务器主动、实时地向客户端推送数据（事件流），而无需客户端不断轮询，非常适合新闻推送、股票更新、实时通知等场景。它通过建立一个持久连接实现，支持自动重连、自定义事件，并且是 HTML5 标准的一部分，由浏览器内置的 EventSource API 支持，简单易用。 ' +
          `核心特点
    单向通信: 只有服务器可以主动向客户端发送数据。
    基于 HTTP: 利用 HTTP 长连接和流式传输机制。
    事件流 (Event Stream): 数据以 text/event-stream 格式持续传输。
    自动重连: 连接断开后，客户端能自动尝试重新连接。
    轻量简单: 比 WebSocket 简单，更适合服务器到客户端单向推送。
    支持自定义事件: 可以通过 event: 字段指定事件类型。
    工作原理
    客户端发起请求: 浏览器通过 EventSource API 发起一个标准的 HTTP GET 请求。
    服务器保持连接: 服务器接收请求后，保持连接不断开，并以事件流方式持续发送数据。
    客户端接收事件: 客户端接收数据并使用 JavaScript 处理，如监听 onmessage 事件。
    连接关闭: 所有数据推送完毕后，连接才会关闭。
    适用场景
    实时新闻或体育比分更新。
    股票价格实时监控。
    用户实时通知。`
    const timer = setInterval(() => {
      if (count < str.length) {
        const chunk = str.slice(count, count + 20)
        res.write(`id: ${Date.now()}\n`)
        res.write('event: message\n')
        res.write(`data: ${JSON.stringify({ type: 'keep-alive', msg: chunk })}\n\n`)
        count += 20
      } else {
        res.write(`id: ${Date.now()}\n`)
        res.write('event: close\n')
        res.write(`data: ${JSON.stringify({ type: 'close', msg: '' })}\n\n`)
        clearInterval(timer)
        res.end()
      }
    }, 600)
  }
})

server.listen(4399, 'localhost', () => {
  console.log('Server is running at 4399')
})
```

### go 实现简单 sse 接口

```go

gopackage main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type SSEMessage struct {
	Type string `json:"type"`
	Msg  string `json:"msg"`
}

func sseHandler(w http.ResponseWriter, r *http.Request) {
	// 设置允许的请求头
	allowHeaders := []string{
		"x-requested-with",
		"content-type",
		"cache-control",
		// ...其他需要的 header
	}
	// 设置响应头
	w.Header().Set("Content-Type", "text/event-stream; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", joinHeaders(allowHeaders))
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Cache-Control", "no-cache")
	// 处理 OPTIONS 预检请求
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	// 确保支持 Flush
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}
	str := "SSE (Server-Sent Events) 协议是一种基于 HTTP 的单向通信技术，允许服务器主动、实时地向客户端推送数据（事件流），而无需客户端不断轮询，非常适合新闻推送、股票更新、实时通知等场景。它通过建立一个持久连接实现，支持自动重连、自定义事件，并且是 HTML5 标准的一部分，由浏览器内置的 EventSource API 支持，简单易用。 " +
		"核心特点\n    单向通信: 只有服务器可以主动向客户端发送数据。\n    基于 HTTP: 利用 HTTP 长连接和流式传输机制。\n    事件流 (Event Stream): 数据以 text/event-stream 格式持续传输。\n    自动重连: 连接断开后，客户端能自动尝试重新连接。\n    轻量简单: 比 WebSocket 简单，更适合服务器到客户端单向推送。\n    支持自定义事件: 可以通过 event: 字段指定事件类型。\n    工作原理\n    客户端发起请求: 浏览器通过 EventSource API 发起一个标准的 HTTP GET 请求。\n    服务器保持连接: 服务器接收请求后，保持连接不断开，并以事件流方式持续发送数据。\n    客户端接收事件: 客户端接收数据并使用 JavaScript 处理，如监听 onmessage 事件。\n    连接关闭: 所有数据推送完毕后，连接才会关闭。\n    适用场景\n    实时新闻或体育比分更新。\n    股票价格实时监控。\n    用户实时通知。\n    // 大数据模型（LLM）的流式输出。 "

	count := 0
	chunkSize := 20
	ticker := time.NewTicker(300 * time.Millisecond)
	defer ticker.Stop()
	for range ticker.C {
		if count < len([]rune(str)) {
			// 使用 rune 切片来正确处理中文字符
			runes := []rune(str)
			end := count + chunkSize
			if end > len(runes) {
				end = len(runes)
			}
			chunk := string(runes[count:end])
			msg := SSEMessage{
				Type: "keep-alive",
				Msg:  chunk,
			}
			data, _ := json.Marshal(msg)
			fmt.Fprintf(w, "id: %d\n", time.Now().UnixMilli())
			fmt.Fprintf(w, "event: message\n")
			fmt.Fprintf(w, "data: %s\n\n", string(data))
			flusher.Flush()
			count += chunkSize
		} else {
			// 发送关闭事件
			msg := SSEMessage{
				Type: "close",
				Msg:  "",
			}
			data, _ := json.Marshal(msg)
			fmt.Fprintf(w, "id: %d\n", time.Now().UnixMilli())
			fmt.Fprintf(w, "event: close\n")
			fmt.Fprintf(w, "data: %s\n\n", string(data))
			flusher.Flush()
			break
		}
	}
}

func joinHeaders(headers []string) string {
	result := ""
	for i, header := range headers {
		if i > 0 {
			result += ","
		}
		result += header
	}
	return result
}

func main() {
	http.HandleFunc("/sse", sseHandler)
	log.Println("Server is running at http://0.0.0.0:4399")
	log.Println("Local: http://localhost:4399")
	log.Println("Network: http://<your-ip>:4399")
	if err := http.ListenAndServe("0.0.0.0:4399", nil); err != nil {
		log.Fatal(err)
	}
}
```

### 使用 curl 测试接口

```bash
# 测试本地模拟接口
curl -N -H "Accept: text/event-stream" http://localhost:4399/sse

# 添加 header
curl -N -H "Accept: text/event-stream" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:4399/sse
```