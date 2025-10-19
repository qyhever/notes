- [查日志](#查日志)
  - [基本](#基本)
  - [vi](#vi)
  - [组合拳](#组合拳)
    - [场景一：查异常堆栈，绝不能只看一行！](#场景一查异常堆栈绝不能只看一行)
    - [场景二：实时看新日志](#场景二实时看新日志)
    - [场景三：翻历史日志 \& 压缩日志](#场景三翻历史日志--压缩日志)
    - [场景四：统计异常数量](#场景四统计异常数量)
  - [常用 grep 参数](#常用-grep-参数)
- [Reference](#reference)


## 查日志
### 基本
实时监控 a.log 文件，并筛选出包含 "java.lang.NullPointerException" 内容的日志行。
```shell
tail -f a.log | grep "java.lang.NullPointerException"
```

使用 grep 的 -C 选项，例如显示前后各 5 行：
```shell
tail -f a.log | grep -C 5 "java.lang.NullPointerException"
```

### vi
在Vim 中，按下 / 并输入关键字后按回车开始搜索，按 n 可以查找下一个匹配项。若要反向查找，可按下 ? 或 N。

### 组合拳
#### 场景一：查异常堆栈，绝不能只看一行！
`-A 50` 匹配到的行+后面 50 行，堆栈信息一览无余。
```shell
grep -A 50 "java.lang.NullPointerException" a.log
```

怕刷屏？加 less 分页：
```shell
grep -A 50 "java.lang.NullPointerException" a.log | less
```
在 less 里你可以：
- ↑↓ / PageUp PageDown 滚动
- G 直达末尾
- /Exception 继续搜索
- q 退出

#### 场景二：实时看新日志
应用正在跑，随时可能报错？这时候直接 tail 跟进：
```shell
tail -f a.log | grep -A 50 "java.lang.NullPointerException"
```

报错一来，堆栈直接推到你面前。  
大小写怕拼错？加 -i 忽略大小写。  
想停止，Ctrl + C 可退出。

#### 场景三：翻历史日志 & 压缩日志
线上日志常常被分片+压缩，变成 a.log.2025-07-02.gz。这时候别傻傻解压。

查所有 .log 文件：
```shell
grep -H -A 50 "java.lang.NullPointerException" *.log
```

查 .gz 文件：
```shell
zgrep -H -A 50 "java.lang.NullPointerException" *.gz
```
-H 会打印文件名，帮你知道异常在哪一天爆的。

#### 场景四：统计异常数量
如果想知道异常是偶发还是疯狂刷屏
```shell
grep -c "java.lang.NullPointerException" a.log
```

多文件：
```shell
grep -c "java.lang.NullPointerException" *.log
```

### 常用 grep 参数
- -A N 显示匹配行之后 N 行

- -B N 显示匹配行之前 N 行

- -C N 显示匹配行上下文 N 行

- -H 打印文件名

- -i 忽略大小写

- -r 递归搜索子目录

- -c 统计匹配数量

## Reference
- [同事查日志太慢，我现场教他一套 grep 组合拳](https://www.toutiao.com/article/7545429680254370342/)
- []()
- []()
