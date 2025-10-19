<template><div><ul>
<li><a href="#%E5%AE%89%E8%A3%85%E5%8C%85">安装包</a></li>
<li><a href="#%E5%90%8C%E6%AD%A5%E6%AD%A5%E9%AA%A4">同步步骤</a>
<ul>
<li><a href="#%E5%88%9B%E5%BB%BAgit%E4%BB%93%E5%BA%93">创建git仓库</a></li>
<li><a href="#pc-%E5%90%8C%E6%AD%A5">PC 同步</a></li>
<li><a href="#ios-%E5%90%8C%E6%AD%A5">ios 同步</a></li>
<li><a href="#android-%E5%90%8C%E6%AD%A5">Android 同步</a></li>
</ul>
</li>
<li><a href="#ios-%E4%B8%8A-ish-%E6%89%A7%E8%A1%8C-git-%E5%91%BD%E4%BB%A4%E5%8D%A1%E4%BD%8F%E7%9A%84%E9%97%AE%E9%A2%98">iOS 上 iSH 执行 git 命令卡住的问题</a></li>
<li><a href="#%E7%9B%B8%E5%85%B3">相关</a></li>
</ul>
<h2 id="安装包" tabindex="-1"><a class="header-anchor" href="#安装包"><span>安装包</span></a></h2>
<p>去<a href="https://obsidian.md" target="_blank" rel="noopener noreferrer">官网</a>下载安装包</p>
<h2 id="同步步骤" tabindex="-1"><a class="header-anchor" href="#同步步骤"><span>同步步骤</span></a></h2>
<h3 id="创建git仓库" tabindex="-1"><a class="header-anchor" href="#创建git仓库"><span>创建git仓库</span></a></h3>
<p>在 github 或者 gitee 创建私有仓库，比如命名为 obn<br>
仓库下面添加 .gitignore 文件，将 .obsidian 加入 git 忽略，避免多端同步冲突</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">.obsidian</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="pc-同步" tabindex="-1"><a class="header-anchor" href="#pc-同步"><span>PC 同步</span></a></h3>
<p>PC 端 obsidian 安装 Git 插件，简单配置下，就可以自动进行 git 同步了</p>
<h3 id="ios-同步" tabindex="-1"><a class="header-anchor" href="#ios-同步"><span>ios 同步</span></a></h3>
<ul>
<li>下载名为 iSH 的 APP，打开后，执行以下命令安装所需软件</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">apk update</span>
<span class="line">apk add git</span>
<span class="line">apk add vim</span>
<span class="line">apk add openssh</span>
<span class="line">apk add openrc</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>然后创建一个新目录再执行 mount，执行时 iOS 会以交互的方式让你选择目录，选择 obsidian 这一级别即可</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd ~ &amp;&amp; mkdir repo</span>
<span class="line">mount -t ios-unsafe . repo</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>拉取远程仓库</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd ~/repo</span>
<span class="line">git clone xxx</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>打开 obsidian，选择打开 obn 这个日志库即可</li>
</ul>
<h3 id="android-同步" tabindex="-1"><a class="header-anchor" href="#android-同步"><span>Android 同步</span></a></h3>
<p>下载名为 termux 的 App，<a href="https://github.com/termux/termux-app/releases" target="_blank" rel="noopener noreferrer">github</a>
打开后，执行以下命令安装所需软件</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">pkg add git</span>
<span class="line">pkg add vim</span>
<span class="line">pkg add openssh</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Termux 使用 <code v-pre>termux-setup-storage</code> 命令挂载Android 手机存储，该命令会在Termux 的 <code v-pre>~/storage</code> 目录下创建一个符号链接，指向手机的共享存储空间（通常是 <code v-pre>~/storage/shared</code>）。授权后，您就可以通过 <code v-pre>cd storage</code> 命令访问手机上的文件，例如下载目录 <code v-pre>~/storage/downloads</code></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd ~</span>
<span class="line">termux-setup-storage</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>1.<strong>授予权限</strong>
此时会弹出一个权限请求框，要求Termux 访问您的手机存储空间。</p>
<ul>
<li>选择<code v-pre>允许</code>以授权Termux 访问。
2.<strong>验证挂载</strong>：
授权成功后，在Termux 的主目录 (<code v-pre>~/</code>) 下会出现一个名为 <code v-pre>storage</code> 的新目录。
3.<strong>访问手机存储</strong>：</li>
<li>使用 <code v-pre>cd storage</code> 命令进入挂载的目录。</li>
<li>您会看到 <code v-pre>shared</code> 文件夹，进入该文件夹（<code v-pre>cd shared</code>）即可看到您的手机内部存储空间。</li>
<li>您还可以直接访问常用的子目录，如 <code v-pre>downloads</code>（下载目录），通过 <code v-pre>cd storage/shared/downloads</code> 命令</li>
<li>，在 share 下新建/repo(随便起名)， 拉取远程仓库</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">mkdir repo</span>
<span class="line">cd repo</span>
<span class="line">git clone xxx</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>打开 obsidian，选择打开 obn 这个日志库即可</li>
</ul>
<h2 id="ios-上-ish-执行-git-命令卡住的问题" tabindex="-1"><a class="header-anchor" href="#ios-上-ish-执行-git-命令卡住的问题"><span>iOS 上 iSH 执行 git 命令卡住的问题</span></a></h2>
<p>这是一个经常出现的问题，有关 <a href="https://github.com/ish-app/ish/issues/1640" target="_blank" rel="noopener noreferrer">issue</a>提到 mount 时使用 ios-unsafe 参数可以解决，实际
用了之后，还是不能解决。</p>
<p>这个<a href="https://github.com/ish-app/ish/issues/1581" target="_blank" rel="noopener noreferrer">issue</a>有一个解决办法：每次 git 操作前都重新 mount。可以写一个 sh 脚本，放在 repo
下，每次运行下就行。</p>
<p>新建 sh 文件</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd ~</span>
<span class="line">vim tool.sh</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>tool.sh内容</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">cd ~</span>
<span class="line">mount -t ios-unsafe . repo</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>git 操作前每次执行，<code v-pre>sh tool.sh</code>即可</p>
<h2 id="相关" tabindex="-1"><a class="header-anchor" href="#相关"><span>相关</span></a></h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/697196173" target="_blank" rel="noopener noreferrer">obsidian 使用 git 进行多终端同步</a></li>
<li><a href="https://www.codedump.info/post/20220612-weekly-18/" target="_blank" rel="noopener noreferrer">网状的思考，线性的写作</a></li>
<li><a href="https://www.ruanyifeng.com/blog/2021/08/best-note-taking-software-for-programmers.html" target="_blank" rel="noopener noreferrer">阮一峰-最适合程序员的笔记软件</a></li>
</ul>
</div></template>


