## 自动生成excel文件

```javascript create-excel.js
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ExcelJS from 'exceljs'
import Mock from 'mockjs'

// 准备模板文件（template.xlsx），表头示例

// 姓名（{{name}}）年龄（{{age}}）邮箱（{{email}}）加入时间（{{joinDate}}）

function generateRandomPhoneNumber() {
  // 随机生成第二个数字（号段）
  const phoneSegments = ['3', '5', '7', '8']; // 可选的第二位数字段
  const randomSegment = phoneSegments[Math.floor(Math.random() * phoneSegments.length)];

  // 生成后9位数字
  let remainingNumber = '';
  for (let i = 0; i < 9; i++) {
    remainingNumber += Math.floor(Math.random() * 10);
  }

  // 拼接成完整的手机号码
  return '1' + randomSegment + remainingNumber;
}

const __dirname = dirname(fileURLToPath(import.meta.url))

// 配置路径
const templatePath = path.resolve(__dirname, 'batch-import.xlsx');
const outputPath = path.resolve(__dirname, 'batch-output100.xlsx');

// 模拟批量数据
// https://github.com/nuysoft/Mock/wiki/Getting-Started
const mockData = []

for (let i = 0; i < 100; i++) {
  mockData.push({
    name: Mock.Random.cname(),
    age: Mock.Random.integer(18, 28),
    mobile: generateRandomPhoneNumber(),
    email: Mock.Random.string('number', 10, 10 ) + '@qq.com',
    joinDate: Mock.Random.date('yyyy-MM-dd'),
    remark: 'test' + (i + 1)
  })
}

async function main() {
  try {
    // 1. 读取模板
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);
    const worksheet = workbook.getWorksheet(1);

    // 2. 设置表头
    const headerRow = worksheet.getRow(1);
    // 替换表头（默认生成的会有变量占位符）
    headerRow.values = ['姓名', '年龄', '手机', '邮箱', '加入时间', '备注'];
    // // 设置表头样式
    // headerRow.font = { name: '微软雅黑', size: 12, bold: true };
    // headerRow.fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFE0E0E0' },
    // };

    // 3. 填充数据（行级填充）
    const startRow = 2; // 假设第一行是表头，从第二行开始填充
    mockData.forEach((item, index) => {
      const row = worksheet.getRow(startRow + index);
      row.values = [
        item.name,
        item.age,
        item.mobile,
        item.email,
        item.joinDate,
        item.remark,
      ];
    });
    // // 追加（如果有空行不会替换）
    // mockData.forEach(item => {
    //   worksheet.addRow([item.name, item.age, item.email, item.joinDate]);
    // });

    // 4. 保存文件
    await workbook.xlsx.writeFile(outputPath);
    console.log(`成功生成文件：${outputPath}`);
  } catch (error) {
    console.error('生成失败:', error.message);
  }
}

main();
```

## 重命名
```javascript
const fs = require('fs/promises'); // 使用 promise 版 fs，支持 async/await
const path = require('path');

// 配置参数
const CONFIG = {
  targetDir: 'wwd3', // 目标目录名（当前目录下的 wwd 文件夹）
  prefix: 'wwd',    // 文件名前缀
};

/**
 * 批量重命名文件
 */
async function batchRenameFiles() {
  try {
    // 1. 拼接目标目录的完整路径
    const targetDirPath = path.resolve(__dirname, CONFIG.targetDir);

    // 2. 检查目录是否存在
    try {
      await fs.access(targetDirPath);
    } catch (err) {
      console.error(`❌ 错误：目录 "${CONFIG.targetDir}" 不存在于当前路径`);
      process.exit(1); // 退出程序
    }

    // 3. 读取目录下的所有文件/文件夹
    const files = await fs.readdir(targetDirPath, { withFileTypes: true });

    // 4. 筛选出仅文件（排除子目录）
    const fileList = files.filter(file => file.isFile());

    if (fileList.length === 0) {
      console.log(`ℹ️  提示：目录 "${CONFIG.targetDir}" 下没有可重命名的文件`);
      return;
    }

    // 5. 按文件创建时间排序（可选：也可按名称排序，将 mtime 改为 name）
    // fileList.sort((a, b) => a.mtime.getTime() - b.mtime.getTime());

    // 6. 批量重命名
    let successCount = 0;
    for (const [index, file] of fileList.entries()) {
      try {
        // 获取原文件完整路径
        const oldFilePath = path.join(targetDirPath, file.name);
        
        // 获取文件扩展名（保留原文件格式）
        const fileExt = path.extname(file.name);
        
        // 构建新文件名：prefix + (index+1) + 扩展名
        // const newFileName = `${CONFIG.prefix}${index + 1}${fileExt}`;
        const newFileName = CONFIG.prefix + file.name.split('.')[0].slice(-6) + fileExt;
        const newFilePath = path.join(targetDirPath, newFileName);

        // 检查新文件名是否已存在（避免覆盖）
        try {
          await fs.access(newFilePath);
          console.warn(`⚠️  跳过：新文件名 "${newFileName}" 已存在，原文件 "${file.name}" 未重命名`);
          continue;
        } catch (err) {
          // 新文件名不存在，执行重命名
          await fs.rename(oldFilePath, newFilePath);
          console.log(`✅ 成功：${file.name} → ${newFileName}`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ 失败：重命名 "${file.name}" 时出错 - ${err.message}`);
      }
    }

    // 7. 输出统计结果
    console.log('\n📊 重命名完成');
    console.log(`总文件数：${fileList.length}`);
    console.log(`成功数：${successCount}`);
    console.log(`失败数：${fileList.length - successCount}`);

  } catch (err) {
    console.error(`❌ 程序执行出错：${err.message}`);
  }
}

// 执行重命名函数
batchRenameFiles();
```

## 复制文件
### 基础版
```javascript copy.js
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// ESM 兼容的 __dirname/__filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 源与目标目录
const srcDir = 'D:\\apro\\haiku\\src'
const destDir = 'D:\\apro\\local-server\\haiku\\src'

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
```

### 进阶版
```javascript
import path from 'path'
import fs from 'fs/promises' // 引入 promise 版本的 fs
import { fileURLToPath } from 'url'

// 禁用 Node.js 日志缓冲，确保实时输出
process.stdout._handle?.setBlocking(true)
process.stderr._handle?.setBlocking(true)

// ESM 兼容的 __dirname/__filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 源与目标目录（支持命令行参数覆盖）
// 使用示例: node copy.mjs --src "E:\\迅雷下载\\dm\\wwd1" --dest "E:\\迅雷下载\\dm1\\wwd1"
let srcDir = 'E:\\迅雷下载\\dm\\wwd1'
let destDir = 'E:\\迅雷下载\\dm1\\wwd1'
// 简单解析命令行参数以支持覆盖
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i]
  if (arg === '--src' && process.argv[i + 1]) {
    srcDir = process.argv[i + 1]
    i++
  } else if (arg === '--dest' && process.argv[i + 1]) {
    destDir = process.argv[i + 1]
    i++
  }
}

/**
 * 格式化耗时（毫秒转成 mm分ss秒 格式）
 * @param {number} ms - 耗时毫秒数
 * @returns {string} 格式化后的耗时字符串（例如：03分45秒）
 */
function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes.toString().padStart(2, '0')}分${seconds.toString().padStart(2, '0')}秒`
}

/**
 * 生成本地时区的时间戳（格式：YYYY-MM-DD HH:mm:ss）
 * @returns {string} 本地时间戳字符串
 */
function getLocalTimestamp() {
  const date = new Date()
  // 补零工具函数
  const padZero = (num) => num.toString().padStart(2, '0')
  
  const year = date.getFullYear()
  const month = padZero(date.getMonth() + 1) // 月份从 0 开始，需 +1
  const day = padZero(date.getDate())
  const hours = padZero(date.getHours()) // 24 小时制
  const minutes = padZero(date.getMinutes())
  const seconds = padZero(date.getSeconds())
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 异步主函数（带实时日志、正确时区和指定格式）
async function copyDirectory() {
  // 记录全局开始时间
  const globalStartTime = Date.now()

  try {
    // 检查源目录是否存在
    try {
      await fs.access(srcDir)
    } catch {
      console.error(`[${getLocalTimestamp()}] ❌ 源目录不存在: ${srcDir}`)
      process.exit(1)
    }

    // 确保目标目录存在（异步版本）
    await fs.mkdir(destDir, { recursive: true })
    console.log(`[${getLocalTimestamp()}] ✅ 目标目录准备完成: ${destDir}`)
    console.log('----------------------------------------')

    // 读取源目录内容（异步版本）
    const entries = await fs.readdir(srcDir, { withFileTypes: true })
    
    if (entries.length === 0) {
      console.warn(`[${getLocalTimestamp()}] ⚠️  源目录为空: ${srcDir}`)
      const globalEndTime = Date.now()
      console.log(`----------------------------------------`)
      console.log(`[${getLocalTimestamp()}] 总耗时: ${formatDuration(globalEndTime - globalStartTime)}`)
      return
    }

    // 过滤掉 .DS_Store 文件，执行复制任务（逐文件复制并实时打印日志）
    const results = []
    // 先计算总文件数用于进度显示
    const toCopy = entries.filter(entry => entry.name !== '.DS_Store')
    let totalFiles = 0
    async function countFilesRecursive(entryPath) {
      try {
        const stat = await fs.stat(entryPath)
        if (stat.isDirectory()) {
          const children = await fs.readdir(entryPath, { withFileTypes: true })
          for (const child of children) {
            if (child.name === '.DS_Store') continue
            await countFilesRecursive(path.join(entryPath, child.name))
          }
        } else if (stat.isFile()) {
          totalFiles++
        }
      } catch (err) {
        // 忽略计数中的错误，继续
      }
    }
    for (const entry of toCopy) {
      await countFilesRecursive(path.join(srcDir, entry.name))
    }

    let copiedFiles = 0
    // 逐条处理（也可以并发），但逐文件复制能保证更细粒度的日志
    async function copyRecursiveWithLogging(src, dest) {
      const taskStartTime = Date.now()
      try {
        const stat = await fs.stat(src)
        if (stat.isDirectory()) {
          await fs.mkdir(dest, { recursive: true })
          const children = await fs.readdir(src, { withFileTypes: true })
          for (const child of children) {
            if (child.name === '.DS_Store') continue
            await copyRecursiveWithLogging(path.join(src, child.name), path.join(dest, child.name))
          }
        } else if (stat.isFile()) {
          await fs.copyFile(src, dest)
          const taskDuration = Date.now() - taskStartTime
          copiedFiles++
          console.log(`[${getLocalTimestamp()}] ✅ 已复制文件 [${formatDuration(taskDuration)}] (${copiedFiles}/${totalFiles}) - ${src} -> ${dest}`)
          results.push({ success: true, src, dest, duration: taskDuration })
        }
      } catch (err) {
        const taskDuration = Date.now() - taskStartTime
        console.error(`[${getLocalTimestamp()}] ❌ 复制失败 [${formatDuration(taskDuration)}] - ${src} -> ${dest}`, err.message)
        results.push({ success: false, src, dest, duration: taskDuration, error: err.message })
      }
    }

    // // 启动复制任务（按 entry 逐个目录复制）
    // for (const entry of toCopy) {
    //   const src = path.join(srcDir, entry.name)
    //   const dest = path.join(destDir, entry.name)
    //   // 为目录创建目标目录（必要）
    //   await fs.mkdir(path.dirname(dest), { recursive: true })
    //   await copyRecursiveWithLogging(src, dest)
    // }
    const pros = toCopy.map(async entry => {
      const src = path.join(srcDir, entry.name)
      const dest = path.join(destDir, entry.name)
      // 为目录创建目标目录（必要）
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await copyRecursiveWithLogging(src, dest)
    })
    await Promise.all(pros)

    // 统计结果
    const totalItems = results.length
    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length
    const totalTaskDuration = results.reduce((sum, r) => sum + r.duration, 0)

    // 全局结束时间
    const globalEndTime = Date.now()
    const globalDuration = globalEndTime - globalStartTime

    console.log('----------------------------------------')
    console.log(`[${getLocalTimestamp()}] 📊 复制任务统计报告`)
    console.log('----------------------------------------')
    console.log(`总项目数: ${totalItems}`)
    console.log(`成功: ${successCount} 个`)
    console.log(`失败: ${failCount} 个`)
    console.log('----------------------------------------')
    console.log(`单个任务总耗时（累加）: ${formatDuration(totalTaskDuration)}`)
    console.log(`程序总耗时（实际运行时间）: ${formatDuration(globalDuration)}`)
    console.log('----------------------------------------')
    console.log(`📁 源目录: ${srcDir}`)
    console.log(`📁 目标目录: ${destDir}`)
    console.log('----------------------------------------')

  } catch (globalErr) {
    const globalEndTime = Date.now()
    const globalDuration = globalEndTime - globalStartTime
    console.error('----------------------------------------')
    console.error(`[${getLocalTimestamp()}] ❌ 全局错误 [总耗时: ${formatDuration(globalDuration)}]`, globalErr)
    console.error('----------------------------------------')
    process.exit(1)
  }
}

// 执行异步复制函数
copyDirectory()
```

### 调用 rsync
```javascript
// Node.js 调用 rsync（示例）
import childProcess from 'child_process'
import fs from 'fs'

const src = './dm/wwd1'
const dest = './dm2/wwd1'

fs.mkdirSync(dest, { recursive: true })

const rsync = childProcess.spawn('rsync', [
  '-avz',
  '--progress',
  '--partial',
  '--exclude', '.DS_Store',
  src,
  dest
], { stdio: 'inherit' })

// // 实时打印 rsync 输出（进度/日志）
// rsync.stdout.on('data', (data) => console.log(data.toString()))
// rsync.stderr.on('data', (data) => console.error(data.toString()))

// rsync -avz --progress --partial --exclude=".DS_Store" "./dm/wwd1" "./dm1/wwd1"
```
