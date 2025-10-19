<template><div><ul>
<li><a href="#%E6%A8%A1%E5%BC%8F">模式</a></li>
<li><a href="#%E5%85%89%E6%A0%87%E7%A7%BB%E5%8A%A8">光标移动</a></li>
<li><a href="#%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91">文本编辑</a></li>
<li><a href="#%E6%92%A4%E9%94%80">撤销</a></li>
<li><a href="#%E6%96%87%E4%BB%B6%E4%BF%9D%E5%AD%98%E4%B8%8E%E9%80%80%E5%87%BA">文件保存与退出</a></li>
<li><a href="#%E7%BF%BB%E9%A1%B5">翻页</a></li>
<li><a href="#%E6%9F%A5%E6%89%BE">查找</a></li>
<li><a href="#%E6%9B%BF%E6%8D%A2">替换</a></li>
<li><a href="#%E5%85%B6%E5%AE%83%E5%BA%95%E7%BA%BF%E5%91%BD%E4%BB%A4">其它底线命令</a></li>
<li><a href="#%E5%88%A0%E9%99%A4">删除</a>
<ul>
<li><a href="#%E5%88%A0%E9%99%A4%E5%85%A8%E9%83%A8%E5%86%85%E5%AE%B9">删除全部内容</a></li>
<li><a href="#%E5%88%A0%E9%99%A4%E5%8C%85%E5%90%AB%E6%A8%A1%E5%BC%8F%E7%9A%84%E8%A1%8C">删除包含模式的行</a></li>
</ul>
</li>
<li><a href="#%E5%A4%8D%E5%88%B6">复制</a>
<ul>
<li><a href="#%E5%85%A8%E9%80%89%E5%A4%8D%E5%88%B6">全选复制</a></li>
</ul>
</li>
<li><a href="#%E7%BC%A9%E8%BF%9B%E6%A0%BC%E5%BC%8F%E5%8C%96">缩进(格式化)</a></li>
<li><a href="#%E8%A1%A5%E5%85%A8">补全</a></li>
</ul>
<h2 id="模式" tabindex="-1"><a class="header-anchor" href="#模式"><span>模式</span></a></h2>
<ul>
<li>普通模式（正常模式）: <code v-pre>vim file.txt</code> 进入默认就是普通模式，在其它模式下按 <code v-pre>Esc</code> 进入普通模式，执行命令、移动光标等。</li>
<li>插入模式: 在普通模式下，按 <code v-pre>i</code> 进入插入模式，开始输入或修改文本。</li>
<li>命令行模式: 在普通模式下，按 <code v-pre>:</code> 进入命令模式，保存文件、退出Vim 等操作。</li>
</ul>
<h2 id="光标移动" tabindex="-1"><a class="header-anchor" href="#光标移动"><span>光标移动</span></a></h2>
<ul>
<li><code v-pre>h</code>, <code v-pre>j</code>, <code v-pre>k</code>, <code v-pre>l</code>: 分别向左、下、上、右移动一个字符。</li>
<li><code v-pre>gg</code>: 快速移动到文件的第一行。</li>
<li><code v-pre>G</code>: 快速移动到文件的末尾行。</li>
<li><code v-pre>0</code> (零): 或者 <code v-pre>^</code> 移动到当前行的行首。</li>
<li><code v-pre>$</code> (美元符): 移动到当前行的行尾。</li>
<li><code v-pre>w</code> (word): 移动到下一个单词的开头。</li>
<li><code v-pre>:行号</code>: 跳转到指定行。</li>
</ul>
<h2 id="文本编辑" tabindex="-1"><a class="header-anchor" href="#文本编辑"><span>文本编辑</span></a></h2>
<ul>
<li><code v-pre>i</code>: 在光标当前位置插入文本。</li>
<li><code v-pre>a</code>: 在光标下一个位置插入文本。</li>
<li><code v-pre>o</code>: 在当前行的下方插入一个新行。</li>
<li><code v-pre>dd</code>: 删除当前行。</li>
<li><code v-pre>yy</code>: 复制（yank）当前行。</li>
<li><code v-pre>p</code>: 粘贴内容。</li>
</ul>
<h2 id="撤销" tabindex="-1"><a class="header-anchor" href="#撤销"><span>撤销</span></a></h2>
<ul>
<li><code v-pre>u</code>: 撤销上一步操作。</li>
<li><code v-pre>Ctrl + r</code>: 重做被撤销的操作。</li>
</ul>
<h2 id="文件保存与退出" tabindex="-1"><a class="header-anchor" href="#文件保存与退出"><span>文件保存与退出</span></a></h2>
<ul>
<li><code v-pre>:wq</code> 或<code v-pre>ZZ</code>: 保存文件并退出</li>
<li><code v-pre>:q!</code>: 强制退出，不保存修改</li>
<li><code v-pre>:w</code>: 保存文件</li>
<li><code v-pre>:q</code>: 退出Vim</li>
</ul>
<h2 id="翻页" tabindex="-1"><a class="header-anchor" href="#翻页"><span>翻页</span></a></h2>
<ul>
<li><code v-pre>Ctrl + d</code>: 将光标向下翻半屏，通常每次翻屏12行</li>
<li><code v-pre>Ctrl + u</code>: 将光标向上翻半屏，通常每次翻屏12行</li>
<li><code v-pre>Ctrl + f</code>: 将光标向下翻满屏，通常每次翻屏24行</li>
<li><code v-pre>Ctrl + b</code>: 将光标向上翻满屏，通常每次翻屏24行</li>
</ul>
<h2 id="查找" tabindex="-1"><a class="header-anchor" href="#查找"><span>查找</span></a></h2>
<ul>
<li><code v-pre>:/string</code>: 从文件首部开始查找到尾部；按 n 键可以跳到下一个，N 上一个，另外按 / 键后，按上下键可以找到以前查找的记录，同样的也有记录</li>
<li><code v-pre>:?string</code>: 同上，从当前光标向文件首部查找</li>
</ul>
<h2 id="替换" tabindex="-1"><a class="header-anchor" href="#替换"><span>替换</span></a></h2>
<ul>
<li><code v-pre>:s/word1/word2/g</code>: 当前行替换 word1为 word2</li>
<li><code v-pre>:%s/word1/word2/g</code>: 全文替换 word1为 word2</li>
</ul>
<h2 id="其它底线命令" tabindex="-1"><a class="header-anchor" href="#其它底线命令"><span>其它底线命令</span></a></h2>
<ul>
<li><code v-pre>:set nu</code>: 显示行号 也可以输入 set number</li>
<li><code v-pre>:set nonu</code>: 取消行号</li>
<li><code v-pre>:set ai/noai</code>: 开启/关闭自动缩进</li>
</ul>
<h2 id="删除" tabindex="-1"><a class="header-anchor" href="#删除"><span>删除</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">x <span class="token comment"># 删除光标处字符</span></span>
<span class="line">X <span class="token comment"># 删除光标前字符</span></span>
<span class="line"><span class="token function">dd</span> <span class="token comment"># 删除行</span></span>
<span class="line">5dd <span class="token comment"># 删除5行</span></span>
<span class="line"><span class="token comment"># 删除行范围 :[start],[end]d</span></span>
<span class="line">:3,5d <span class="token comment"># 删除 3-5 行</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用字符来指定范围：</p>
<ul>
<li><code v-pre>.</code>-当前行。</li>
<li><code v-pre>$</code>-最后一行。</li>
<li><code v-pre>%</code>-所有行。
例子：</li>
<li><code v-pre>:.,$d</code>-从当前行到文件末尾。</li>
<li><code v-pre>:.,1d</code>-从当前行到文件开头。</li>
<li><code v-pre>10,$d</code>-从第十行到文件末尾。</li>
</ul>
<h3 id="删除全部内容" tabindex="-1"><a class="header-anchor" href="#删除全部内容"><span>删除全部内容</span></a></h3>
<ol>
<li><code v-pre>:%d</code>：: 在命令模式下输入该命令，按 <code v-pre>Enter</code> 键，表示删除文件的所有行。</li>
<li><code v-pre>ggdG</code>：: 在普通模式下，先按 <code v-pre>gg</code> 将光标移至文件首行，然后按 <code v-pre>dG</code> 从当前行开始删除到文件末尾。</li>
</ol>
<h3 id="删除包含模式的行" tabindex="-1"><a class="header-anchor" href="#删除包含模式的行"><span>删除包含模式的行</span></a></h3>
<h2 id="复制" tabindex="-1"><a class="header-anchor" href="#复制"><span>复制</span></a></h2>
<ul>
<li><code v-pre>yy</code>: 复制当前行</li>
<li><code v-pre>y$</code>: 复制到行尾</li>
<li><code v-pre>p</code>: 在光标后粘贴</li>
<li><code v-pre>P</code>: 在光标前粘贴</li>
<li><code v-pre>&quot;+y</code>: 选中内容后再依次按 <code v-pre>&quot;+y</code>，复制到系统剪贴板</li>
</ul>
<h3 id="全选复制" tabindex="-1"><a class="header-anchor" href="#全选复制"><span>全选复制</span></a></h3>
<ul>
<li><code v-pre>ggyG</code>: 全部复制（只能在 vim 中粘贴）</li>
<li><code v-pre>ggvG</code>: 或者 <code v-pre>ggVG</code>，全选（高亮显示）</li>
</ul>
<p>全选后，依次按 <code v-pre>&quot;+y</code>，复制到系统剪贴板</p>
<h2 id="缩进-格式化" tabindex="-1"><a class="header-anchor" href="#缩进-格式化"><span>缩进(格式化)</span></a></h2>
<ul>
<li><code v-pre>&gt;&gt;</code>: 向右缩进</li>
<li><code v-pre>Ctrl + p</code>: 向左缩进</li>
<li><code v-pre>&gt;G</code>: 从当前行到文件末尾都向右缩进</li>
<li><code v-pre>=G</code>: 从当前行到文件末尾都向左缩进</li>
<li><code v-pre>gg=G</code>: 缩进整个文件</li>
</ul>
<h2 id="补全" tabindex="-1"><a class="header-anchor" href="#补全"><span>补全</span></a></h2>
<ul>
<li><code v-pre>Ctrl + n</code>: 向后查找补全</li>
<li><code v-pre>Ctrl + p</code>: 先前查找补全</li>
</ul>
</div></template>


