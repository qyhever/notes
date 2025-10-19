<template><div><ul>
<li><a href="#%E6%AD%A5%E9%AA%A4%E4%B8%80-%E4%BD%BF%E7%94%A8cd-ssh%E5%88%87%E6%8D%A2%E5%B7%A5%E4%BD%9C%E7%9B%AE%E5%BD%95%E7%84%B6%E5%90%8E%E4%BD%BF%E7%94%A8%E5%A6%82%E4%B8%8B%E5%91%BD%E4%BB%A4%E7%94%9F%E6%88%90%E4%B8%A4%E4%B8%AA%E9%92%A5%E5%8C%99%E4%B8%AD%E9%97%B4%E4%B8%80%E8%B7%AF%E5%9B%9E%E8%BD%A6">步骤一 ：使用cd ~/.ssh切换工作目录，然后使用如下命令生成两个钥匙，中间一路回车。</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4%E4%BA%8C%E5%88%9B%E5%BB%BA%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6-config">步骤二：创建配置文件 config</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4%E4%B8%89%E6%B7%BB%E5%8A%A0%E7%A7%98%E9%92%A5%E5%88%B0ssh%E8%AF%86%E5%88%AB%E5%88%97%E8%A1%A8">步骤三：添加秘钥到ssh识别列表</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4%E5%9B%9B%E6%B7%BB%E5%8A%A0-ssh-key-%E5%8F%8A-%E6%B5%8B%E8%AF%95">步骤四：添加 SSH key 及 测试</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4%E4%BA%94%E4%B8%BA%E4%BA%86%E7%A1%AE%E8%AE%A4%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87-ssh-%E8%BF%9E%E6%8E%A5-github%E5%8F%AF%E9%80%9A%E8%BF%87%E8%BE%93%E5%85%A5%E4%B8%8B%E9%9D%A2%E5%91%BD%E4%BB%A4%E6%9D%A5%E9%AA%8C%E8%AF%81">步骤五：为了确认我们可以通过 SSH 连接 github，可通过输入下面命令来验证</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4%E5%85%AD%E7%94%A8%E6%88%B7%E5%90%8D%E5%92%8C%E9%82%AE%E7%AE%B1%E9%85%8D%E7%BD%AE">步骤六：用户名和邮箱配置</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4%E4%B8%83%E4%BD%BF%E7%94%A8-git%E5%85%8B%E9%9A%86%E4%BB%93%E5%BA%93">步骤七：使用 git克隆仓库</a></li>
<li><a href="#%E6%AD%A5%E9%AA%A4%E5%85%AB%E8%BF%9C%E7%A8%8B%E5%9C%B0%E5%9D%80%E6%B7%BB%E5%8A%A0%E6%88%96%E8%80%85%E4%BF%AE%E6%94%B9">步骤八：远程地址添加或者修改</a></li>
<li><a href="#%E7%9B%B8%E5%85%B3%E6%96%87%E7%AB%A0">相关文章</a></li>
</ul>
<p>如果一台电脑只有一个 github 账号，那么进行默认的 ssh 配置，通过 git 拉取和提交代码即可，但在实际的工作中，有时候需要在一台电脑登录多个 github 账号，将不同的项目代码提交到不同的 github 账号，这个时候如果仅仅只是使用 ssh 默认配置，私钥和公钥将无法完成一对一配对，为此我们需要进行 ssh 的多对多配置。</p>
<p>为了举例方便，这里使用 foo 和 bar 两个账户。</p>
<h3 id="步骤一-使用cd-ssh切换工作目录-然后使用如下命令生成两个钥匙-中间一路回车。" tabindex="-1"><a class="header-anchor" href="#步骤一-使用cd-ssh切换工作目录-然后使用如下命令生成两个钥匙-中间一路回车。"><span>步骤一 ：使用cd ~/.ssh切换工作目录，然后使用如下命令生成两个钥匙，中间一路回车。</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># -C 参数是注释，随便填</span></span>
<span class="line">ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-f</span> ~/.ssh/id_rsa_foo <span class="token parameter variable">-C</span> <span class="token string">"foo@qq.com"</span></span>
<span class="line">ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-f</span> ~/.ssh/id_rsa_bar <span class="token parameter variable">-C</span> <span class="token string">"bar@qq.com"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样会在 ~/.ssh 目录下生成四个文件：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">id_rsa.foo</span>
<span class="line">id_rsa.foo.pub</span>
<span class="line">id_rsa.bar</span>
<span class="line">id_rsa.bar.pub</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤二-创建配置文件-config" tabindex="-1"><a class="header-anchor" href="#步骤二-创建配置文件-config"><span>步骤二：创建配置文件 config</span></a></h3>
<p>在 ~/.ssh目录下新建 config 文件，令不同 Host 实际映射到同一 HostName，但密钥文件不同。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">touch</span> config</span>
<span class="line"><span class="token function">vim</span> config</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>写入以下内容</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">Host foo.github.com</span>
<span class="line">HostName github.com</span>
<span class="line">PreferredAuthentications publickey</span>
<span class="line">IdentityFile ~/.ssh/id_rsa_foo</span>
<span class="line"></span>
<span class="line">Host bar.github.com</span>
<span class="line">HostName github.com</span>
<span class="line">PreferredAuthentications publickey</span>
<span class="line">IdentityFile ~/.ssh/id_rsa_bar</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤三-添加秘钥到ssh识别列表" tabindex="-1"><a class="header-anchor" href="#步骤三-添加秘钥到ssh识别列表"><span>步骤三：添加秘钥到ssh识别列表</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">ssh-add ~/.ssh/id_rsa_foo</span>
<span class="line">ssh-add ~/.ssh/id_rsa_bar</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤四-添加-ssh-key-及-测试" tabindex="-1"><a class="header-anchor" href="#步骤四-添加-ssh-key-及-测试"><span>步骤四：添加 SSH key 及 测试</span></a></h3>
<p>分别登录两个 github 账号，在 Settings —&gt; SSH and GPG keys 中，点击 new SSH key，把 id_rsa.foo.pub 和 id_rsa.bar.pub 这两个公钥的内容分别添加到相应的账号中。</p>
<h3 id="步骤五-为了确认我们可以通过-ssh-连接-github-可通过输入下面命令来验证" tabindex="-1"><a class="header-anchor" href="#步骤五-为了确认我们可以通过-ssh-连接-github-可通过输入下面命令来验证"><span>步骤五：为了确认我们可以通过 SSH 连接 github，可通过输入下面命令来验证</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">ssh-add <span class="token parameter variable">-T</span> git@foo.github.com</span>
<span class="line">ssh-add <span class="token parameter variable">-T</span> git@bar.github.com</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果看到下面信息，就说明连接正常。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">Hi foo<span class="token operator">!</span> You<span class="token string">'ve successfully authenticated, but GitHub does not provide shell access.</span>
<span class="line">Hi bar! You'</span>ve successfully authenticated, but GitHub does not provide shell access.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤六-用户名和邮箱配置" tabindex="-1"><a class="header-anchor" href="#步骤六-用户名和邮箱配置"><span>步骤六：用户名和邮箱配置</span></a></h3>
<p>注意：因为一台电脑上配置了多个 github 账号，所以就不能再配置全局的用户名和邮箱了，而是在不同的仓库下，如果需要连接不同的 git 账号，配置相应的局部用户名和邮箱即可，如果之前配置过全局的用户名和邮箱，需要取消配置。</p>
<p>取消全局 用户名/邮箱 配置</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> user.name</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> user.email</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>设置局部 用户名/邮箱 配置</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> config user.name <span class="token string">"xxx"</span></span>
<span class="line"><span class="token function">git</span> config user.email <span class="token string">"xxx@xx.com"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤七-使用-git克隆仓库" tabindex="-1"><a class="header-anchor" href="#步骤七-使用-git克隆仓库"><span>步骤七：使用 git克隆仓库</span></a></h3>
<p>原来写法</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> clone git@github.com:用户名/仓库名.git</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>现在写法（将github.com 替换为之前设置的别名，这里替换为foo.github.com）</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> clone git@foo.github.com:用户名/仓库名.git</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="步骤八-远程地址添加或者修改" tabindex="-1"><a class="header-anchor" href="#步骤八-远程地址添加或者修改"><span>步骤八：远程地址添加或者修改</span></a></h3>
<p>添加</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin git@foo.github.com:用户名/仓库名.git</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>修改</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">git</span> remote set-url origin git@foo.github.com:用户名/仓库名.git</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章"><span>相关文章</span></a></h3>
<ul>
<li><a href="https://blog.csdn.net/qq_46018418/article/details/146204146" target="_blank" rel="noopener noreferrer">1</a></li>
<li><a href="https://blog.csdn.net/qq_46450354/article/details/129997855" target="_blank" rel="noopener noreferrer">2</a></li>
</ul>
</div></template>


