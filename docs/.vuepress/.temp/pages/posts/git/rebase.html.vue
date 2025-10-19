<template><div><ul>
<li><a href="#git-pull">git pull</a>
<ul>
<li><a href="#git-fetch">git fetch</a></li>
<li><a href="#git-merge">git merge</a></li>
</ul>
</li>
<li><a href="#git-rebase">git rebase</a>
<ul>
<li><a href="#rebase%E5%91%BD%E4%BB%A4%E4%BD%BF%E7%94%A8">rebase命令使用</a></li>
<li><a href="#%E8%87%AA%E5%8A%A8%E5%8F%98%E5%9F%BA">自动变基</a></li>
<li><a href="#%E8%87%AA%E5%8A%A8%E5%8F%98%E5%9F%BA%E7%9A%84%E9%97%AE%E9%A2%98">自动变基的问题</a></li>
</ul>
</li>
<li><a href="#%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0">参考文章</a></li>
</ul>
<h2 id="git-pull" tabindex="-1"><a class="header-anchor" href="#git-pull"><span>git pull</span></a></h2>
<p>git pull 其实是 git fetch 和 git merge 的组合</p>
<p>当我们执行git pull的时候，相当于以此执行了</p>
<p>git fetch ：从云端拉取最新代码<br>
git merge：将云端代码与本地代码合并</p>
<p>git pull历史记录包含了多个分叉点和合并提交，导致git历史混乱</p>
<h3 id="git-fetch" tabindex="-1"><a class="header-anchor" href="#git-fetch"><span>git fetch</span></a></h3>
<p>git fetch 命令从远程仓库获取最新的代码到本地，但不会自动合并代码</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> fetch <span class="token operator">&lt;</span>remote<span class="token operator">></span> <span class="token operator">&lt;</span>branch<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>示例：从名为 origin 的远程仓库获取最新代码：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> fetch origin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="git-merge" tabindex="-1"><a class="header-anchor" href="#git-merge"><span>git merge</span></a></h3>
<p>git merge 就是将另一个分支的更改合并到当前分支</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> merge <span class="token operator">&lt;</span>branch<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="git-rebase" tabindex="-1"><a class="header-anchor" href="#git-rebase"><span>git rebase</span></a></h2>
<p>rebase的作用就是永远会让我们本地的代码处于最新状态。</p>
<h3 id="rebase命令使用" tabindex="-1"><a class="header-anchor" href="#rebase命令使用"><span>rebase命令使用</span></a></h3>
<p>rebase的使用非常简单，只需要在git pull的时候，添加上额外命令即可</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> pull <span class="token parameter variable">--rebase</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="自动变基" tabindex="-1"><a class="header-anchor" href="#自动变基"><span>自动变基</span></a></h3>
<p>每次提交代码都使用git pull --rebase命令繁琐而且容易出错，可以全局设置git pull默认使用变基的方式，一劳永逸！</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># git pull默认使用变基操作</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> pull.rebase <span class="token boolean">true</span></span>
<span class="line"><span class="token comment"># git pull默认使用合并操作，回到 merge 模式</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> pull.rebase <span class="token boolean">false</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动变基的问题" tabindex="-1"><a class="header-anchor" href="#自动变基的问题"><span>自动变基的问题</span></a></h3>
<p>自动变基会面临一个额外的问题：就是如果你本地文件有更改的话，变基会失败，因为变基前服务区必须是干净的。</p>
<p>有两种方法解决这个问题</p>
<p>git pull前，先使用git commit暂存代码<br>
git pull前，先将使用 git stash将保存</p>
<blockquote>
<p>git stash 允许你将当前工作目录中的未提交更改（包括已暂存和未暂存的更改）保存到一个栈（stash）中，并将工作目录恢复到干净的状态。这在你需要在多个任务之间切换但又不想提交不完整的代码时非常有用</p>
</blockquote>
<p>假设我们代码进行了更改，但没有完全改好：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> stash</span>
<span class="line"><span class="token function">git</span> pull</span>
<span class="line"><span class="token function">git</span> stash pop</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用git pull有冲突，则合并完冲突之后，执行一下 git rebase --continue 就好了，其它和原先的用法没有任何区别。</p>
<h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章"><span>参考文章</span></a></h2>
<ul>
<li><a href="https://juejin.cn/post/7389650358539255845" target="_blank" rel="noopener noreferrer">直接使用git pull拉取代码，被同事狠狠地diss了！</a></li>
</ul>
</div></template>


