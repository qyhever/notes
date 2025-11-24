
### 强制关闭某个端口
1. 打开 cmd 命令窗口，根据端口号查询这个端口号的 PID
```bash
netstat -ano|findstr "9000"
```

查询到端口 9000 对应的 pid 为 28624

2. 根据查出来的pid 强制关闭这个端口号
参数 -F 是强制关闭
```bash
taskkill  -F -PID 28624
```
