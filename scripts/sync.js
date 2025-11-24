/**
 * 将 obn 笔记文件 同步到 当前目录下
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// ESM 兼容的 __dirname/__filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 源与目标目录
const srcDir = '/Users/await/notes/obn'
const destDir = path.join(__dirname, '../docs/posts')

if (!fs.existsSync(srcDir)) {
  console.error(`源目录不存在: ${srcDir}`)
  process.exit(1)
}

// 确保目标目录存在
fs.mkdirSync(destDir, { recursive: true })

// 复制源目录下的所有内容到目标目录
const entries = fs.readdirSync(srcDir, { withFileTypes: true })
if (entries.length === 0) {
  console.warn(`源目录为空: ${srcDir}`)
}

for (const entry of entries) {
  if (entry.name === '.DS_Store') continue
  const src = path.join(srcDir, entry.name)
  const dest = path.join(destDir, entry.name)
  try {
    fs.cpSync(src, dest, { recursive: true })
    console.log(`复制: ${src} -> ${dest}`)
  } catch (err) {
    console.error(`复制失败: ${src} -> ${dest}`, err)
  }
}

console.log(`已将 ${srcDir} 的所有内容复制到 ${destDir} ✓`)
