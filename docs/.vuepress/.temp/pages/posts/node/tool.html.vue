<template><div><h2 id="自动生成excel文件" tabindex="-1"><a class="header-anchor" href="#自动生成excel文件"><span>自动生成excel文件</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">'path'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> fileURLToPath <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'url'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> dirname <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'path'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> ExcelJS <span class="token keyword">from</span> <span class="token string">'exceljs'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> Mock <span class="token keyword">from</span> <span class="token string">'mockjs'</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 准备模板文件（template.xlsx），表头示例</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 姓名（{{name}}）年龄（{{age}}）邮箱（{{email}}）加入时间（{{joinDate}}）</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">generateRandomPhoneNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 随机生成第二个数字（号段）</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> phoneSegments <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'3'</span><span class="token punctuation">,</span> <span class="token string">'5'</span><span class="token punctuation">,</span> <span class="token string">'7'</span><span class="token punctuation">,</span> <span class="token string">'8'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 可选的第二位数字段</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> randomSegment <span class="token operator">=</span> phoneSegments<span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> phoneSegments<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 生成后9位数字</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">let</span> remainingNumber <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">9</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    remainingNumber <span class="token operator">+=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 拼接成完整的手机号码</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token string">'1'</span> <span class="token operator">+</span> randomSegment <span class="token operator">+</span> remainingNumber<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> __dirname <span class="token operator">=</span> <span class="token function">dirname</span><span class="token punctuation">(</span><span class="token function">fileURLToPath</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 配置路径</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> templatePath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'batch-import.xlsx'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> outputPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'batch-output100.xlsx'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 模拟批量数据</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// https://github.com/nuysoft/Mock/wiki/Getting-Started</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> mockData <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  mockData<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token literal-property property">name</span><span class="token operator">:</span> Mock<span class="token punctuation">.</span>Random<span class="token punctuation">.</span><span class="token function">cname</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token literal-property property">age</span><span class="token operator">:</span> Mock<span class="token punctuation">.</span>Random<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token literal-property property">mobile</span><span class="token operator">:</span> <span class="token function">generateRandomPhoneNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token literal-property property">email</span><span class="token operator">:</span> Mock<span class="token punctuation">.</span>Random<span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">'number'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span> <span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'@qq.com'</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token literal-property property">joinDate</span><span class="token operator">:</span> Mock<span class="token punctuation">.</span>Random<span class="token punctuation">.</span><span class="token function">date</span><span class="token punctuation">(</span><span class="token string">'yyyy-MM-dd'</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">    <span class="token literal-property property">remark</span><span class="token operator">:</span> <span class="token string">'test'</span> <span class="token operator">+</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 1. 读取模板</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> workbook <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ExcelJS<span class="token punctuation">.</span>Workbook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">await</span> workbook<span class="token punctuation">.</span>xlsx<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>templatePath<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> worksheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span><span class="token function">getWorksheet</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 2. 设置表头</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> headerRow <span class="token operator">=</span> worksheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 替换表头（默认生成的会有变量占位符）</span></span>
<span class="line"></span>
<span class="line">    headerRow<span class="token punctuation">.</span>values <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'姓名'</span><span class="token punctuation">,</span> <span class="token string">'年龄'</span><span class="token punctuation">,</span> <span class="token string">'手机'</span><span class="token punctuation">,</span> <span class="token string">'邮箱'</span><span class="token punctuation">,</span> <span class="token string">'加入时间'</span><span class="token punctuation">,</span> <span class="token string">'备注'</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// // 设置表头样式</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// headerRow.font = { name: '微软雅黑', size: 12, bold: true };</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// headerRow.fill = {</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//   type: 'pattern',</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//   pattern: 'solid',</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//   fgColor: { argb: 'FFE0E0E0' },</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// };</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 3. 填充数据（行级填充）</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> startRow <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 假设第一行是表头，从第二行开始填充</span></span>
<span class="line"></span>
<span class="line">    mockData<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">const</span> row <span class="token operator">=</span> worksheet<span class="token punctuation">.</span><span class="token function">getRow</span><span class="token punctuation">(</span>startRow <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      row<span class="token punctuation">.</span>values <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line"></span>
<span class="line">        item<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">        item<span class="token punctuation">.</span>age<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">        item<span class="token punctuation">.</span>mobile<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">        item<span class="token punctuation">.</span>email<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">        item<span class="token punctuation">.</span>joinDate<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">        item<span class="token punctuation">.</span>remark<span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// // 追加（如果有空行不会替换）</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// mockData.forEach(item => {</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//   worksheet.addRow([item.name, item.age, item.email, item.joinDate]);</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// });</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 4. 保存文件</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">await</span> workbook<span class="token punctuation">.</span>xlsx<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>outputPath<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">成功生成文件：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>outputPath<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'生成失败:'</span><span class="token punctuation">,</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


