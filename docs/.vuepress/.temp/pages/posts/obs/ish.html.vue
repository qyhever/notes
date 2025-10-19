<template><div><p>iSH 是免费开源的软件，能满足基本终端使用需求，如 git 拉取项目、通过 ssh 管理服务器等。</p>
<h2 id="ish" tabindex="-1"><a class="header-anchor" href="#ish"><span>iSH</span></a></h2>
<h3 id="创建-ssh-秘钥" tabindex="-1"><a class="header-anchor" href="#创建-ssh-秘钥"><span>创建 ssh 秘钥</span></a></h3>
<p>无法通过 rsa 创建秘钥，支持部分模式，如 ed255191 ：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">ssh-keygen -t ed255191</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>或将其他环境秘钥传进来，可以正常使用。</p>
<h3 id="挂载文件" tabindex="-1"><a class="header-anchor" href="#挂载文件"><span>挂载文件</span></a></h3>
<p>先创建目录，然后通过 mount 指令挂载，比如将 Obsidian 软件的目录挂载到终端的 repo 目录内：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">mkdir repo</span>
<span class="line">mount -t ios-unsafe . repo</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后 iOS 会以交互的方式让你选择目录，选择 obsidian 这一级别即可</p>
<p>取消挂载：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">umount obsidian</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


