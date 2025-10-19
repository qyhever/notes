<template><div><h2 id="系统信息" tabindex="-1"><a class="header-anchor" href="#系统信息"><span>系统信息</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">uname</span> <span class="token parameter variable">-a</span> <span class="token comment"># 显示操作系统名称、主机名、内核版本、硬件架构等信息</span></span>
<span class="line">lsb_release <span class="token parameter variable">-a</span> <span class="token comment"># 提供Linux 发行版的详细信息，包括名称、版本号和代号</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件目录" tabindex="-1"><a class="header-anchor" href="#文件目录"><span>文件目录</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">ls</span> <span class="token parameter variable">-la</span> <span class="token comment"># 列出全部文件并显示详细信息</span></span>
<span class="line"><span class="token function">ls</span> a* <span class="token comment"># 列出当前目录下的所有以a字母开头的文件</span></span>
<span class="line"><span class="token function">ls</span> <span class="token parameter variable">-l</span> *.txt <span class="token comment"># 列出当前目录下的所有后缀名为txt的文件</span></span>
<span class="line"></span>
<span class="line"><span class="token function">mkdir</span> foo <span class="token comment"># 创建 foo 目录</span></span>
<span class="line"><span class="token function">mkdir</span> foo/bar/baz <span class="token comment"># 创建多层目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-m</span> <span class="token number">777</span> foo <span class="token comment"># 创建 foo 目录，权限为 777</span></span>
<span class="line"></span>
<span class="line"><span class="token function">rmdir</span> <span class="token parameter variable">-p</span> foo/bar/baz <span class="token comment"># 删除多层目录，仅能删除空目录</span></span>
<span class="line"></span>
<span class="line"><span class="token function">touch</span> a.txt <span class="token comment"># 创建 a.txt 文件</span></span>
<span class="line"></span>
<span class="line"><span class="token function">cp</span> a.txt b.txt <span class="token comment"># 把a文件复制到b文件</span></span>
<span class="line"><span class="token function">cp</span> a.txt ./foo <span class="token comment"># 把a文件复制到 foo 目录下</span></span>
<span class="line"><span class="token function">cp</span> <span class="token parameter variable">-a</span> foo bar <span class="token comment"># 把 foo 目录下所有文件复制到新目录 bar</span></span>
<span class="line"></span>
<span class="line"><span class="token function">mv</span> a.txt b.txt <span class="token comment"># 把文件a重命名为b</span></span>
<span class="line"><span class="token function">mv</span> a.txt ./foo <span class="token comment"># 把a文件移动到 foo 目录</span></span>
<span class="line"></span>
<span class="line"><span class="token function">cat</span> a.txt <span class="token comment"># 查看文件内容</span></span>
<span class="line"><span class="token function">cat</span> <span class="token parameter variable">-n</span> a.txt <span class="token comment"># 查看文件并给文件内容标上行号</span></span>
<span class="line"><span class="token function">cat</span> a.txt <span class="token operator">>></span> b.txt <span class="token comment"># 把a文件的内容组合到b文件的末尾</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">'hello'</span> <span class="token operator">></span> a.txt <span class="token comment"># 添加内容到a文件（会覆盖已有内容）</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">'hello'</span> <span class="token operator">>></span> a.txt <span class="token comment"># 追加内容到a文件（没有内容相当于创建文件）</span></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">>></span> 文件名 <span class="token comment"># 追加内容，运行后，输入内容(每一行输入后按Enter 键)并在最后按 Ctrl + D 退出</span></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">></span> 文件名 <span class="token comment"># 覆盖内容</span></span>
<span class="line"><span class="token function">cat</span> <span class="token operator">>></span> 文件名 <span class="token operator">&lt;&lt;</span> EOF <span class="token comment"># 追加多行内容，运行后，输入多行内容，最后在单独的一行输入你之前定义的分隔符，例如 EOF，按Enter 键退出</span></span>
<span class="line"></span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> foo <span class="token comment"># 强制递归删除 foo</span></span>
<span class="line"></span>
<span class="line"><span class="token function">find</span> / <span class="token parameter variable">-name</span> openrestry <span class="token comment"># 全局查找 openrestry 的文件目录</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="alias" tabindex="-1"><a class="header-anchor" href="#alias"><span>alias</span></a></h2>
<p>当前命令行生效</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">ll</span><span class="token operator">=</span><span class="token string">'ls -la'</span> <span class="token comment"># 创建 ll 别名（等号前后不能有空格）</span></span>
<span class="line"><span class="token builtin class-name">alias</span> <span class="token comment"># 查看当前别名列表</span></span>
<span class="line"><span class="token builtin class-name">unalias</span> ll <span class="token comment"># 删除 ll 别名</span></span>
<span class="line"><span class="token builtin class-name">unalias</span> <span class="token parameter variable">-a</span> <span class="token comment"># 删除所有别名</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要永久生效，需要添加到环境变量中。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 在 Linux 下编辑 .bashrc</span></span>
<span class="line"><span class="token function">vim</span> ~/.bashrc</span>
<span class="line"><span class="token comment"># 将新建的别名命令逐行写入</span></span>
<span class="line"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">ll</span><span class="token operator">=</span><span class="token string">'ls -la'</span></span>
<span class="line"><span class="token comment"># 刷新</span></span>
<span class="line"><span class="token builtin class-name">source</span> ~/.bashrc</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="上传下载" tabindex="-1"><a class="header-anchor" href="#上传下载"><span>上传下载</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 上传 foo.html 到服务器 /usr/share/nginx/html 目录下</span></span>
<span class="line"><span class="token function">scp</span> ./foo.html 用户名@ip地址:/usr/share/nginx/html</span>
<span class="line"><span class="token comment"># 上传 bar 目录 到服务器 /usr/share/nginx/html 目录下</span></span>
<span class="line"><span class="token function">scp</span> <span class="token parameter variable">-r</span> bar 用户名@ip地址:/usr/share/nginx/html</span>
<span class="line"><span class="token comment"># 下载 /usr/share/nginx/html/foo.html 文件 到 当前目录下</span></span>
<span class="line"><span class="token function">scp</span> 用户名@ip地址:/usr/share/nginx/html/foo.html ./</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


