## 自动生成excel文件

```javascript
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