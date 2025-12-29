- [nodejs](#nodejs)
- [bash](#bash)

### nodejs
```javascript
import child_process from 'child_process'

function getNow () {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()
  return `${year}/${month}/${date} ${hour}:${minute}:${second}`
}
try {
  const [, , commitTitle] = process.argv
  const commands = [
    'git config user.name',
    'git config user.email',
    'git add .',
    `git commit -m "${commitTitle || 'mac2021 commit: ' + getNow()}"`,
    'git pull',
    'git push'
  ]
  child_process.execSync(commands.join(' && '), {
    stdio: 'inherit'
  })
} catch (error) {
  console.log('error: ', error)
}
```

### bash
```bash
#!/bin/bash
# 保留所有 Git 命令的输出（stdout 和 stderr）

# 获取提交标题（第一个参数）
commit_title="$1"

# 设置默认提交信息（如果未提供标题）
if [ -z "$commit_title" ]; then
  commit_title="commit: $(date +'%Y-%m-%d %H:%M:%S')"
fi

# 定义要执行的 Git 命令序列（用 && 连接，任意一步失败则终止）
commands=(
  'git config user.name'                # 获取/设置用户名（继承输出）
  'git config user.email'               # 获取/设置邮箱（继承输出）
  'git add .'                           # 暂存所有变更（继承输出）
  "git commit -m \"$commit_title\""     # 创建提交（继承输出）
  'git pull'                            # 拉取远程更新（继承输出）
  'git push'                            # 推送本地提交（继承输出）
)

# 执行命令序列（stdio 继承父进程，保留所有输出）
try() {
  local cmd
  for cmd in "${commands[@]}"; do
    echo "🚀 执行命令: $cmd"  # 可选：提示当前执行的命令（非必须）
    eval "$cmd" || return 1   # 任意命令失败则终止并返回错误
  done
}

# 捕获执行结果
if try; then
  echo "✅ 所有操作成功完成！"
else
  echo "❌ 操作失败（具体错误已在上方输出）" >&2
  exit 1
fi
```
