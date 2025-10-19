<template><div><ul>
<li><a href="#%E5%AE%89%E8%A3%85">安装</a>
<ul>
<li><a href="#%E5%AE%89%E8%A3%85-mysql-rpm-%E6%BA%90%E4%BF%A1%E6%81%AF">安装 MySQL rpm 源信息</a></li>
<li><a href="#yum%E5%AE%89%E8%A3%85">yum安装</a></li>
<li><a href="#%E9%AA%8C%E8%AF%81-mysql-%E5%AE%89%E8%A3%85">验证 MySQL 安装</a></li>
<li><a href="#%E8%AE%BE%E7%BD%AE%E5%AF%86%E7%A0%81">设置密码</a></li>
<li><a href="#%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4">常用命令</a></li>
<li><a href="#%E6%9F%A5%E7%9C%8Bmysql-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6">查看MySQL 配置文件</a></li>
<li><a href="#%E5%AF%BC%E5%87%BA-sql-%E6%96%87%E4%BB%B6">导出 sql 文件</a></li>
</ul>
</li>
<li><a href="#reference">Reference</a></li>
</ul>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2>
<p>首先，尝试一下直接使用 yum 安装 MySQL</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">yum <span class="token function">install</span> mysql-community-server</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果成功，表示不需要配置MySQL rpm 源信息，直接就安装完成了</p>
<p>但是，如果出现以下错误：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">Loading mirror speeds from cached hostfile</span>
<span class="line">没有可用软件包 mysql-community-server。</span>
<span class="line">错误：无须任何处理</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示我们没有添加安装包的源信息，需要安装 MySQL rpm 源信息</p>
<h3 id="安装-mysql-rpm-源信息" tabindex="-1"><a class="header-anchor" href="#安装-mysql-rpm-源信息"><span>安装 MySQL rpm 源信息</span></a></h3>
<p>打开<a href="https://dev.mysql.com/downloads/repo/yum/" target="_blank" rel="noopener noreferrer">MySQL Yum Repository</a></p>
<p>根据系统版本，选择对应的安装包，例如CentOS 7.9，这个系统的Linux内核是 Linux 7，那么就选择Linux 7的版本。</p>
<p>根据版本拼接下载地址，使用wget命令下载：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">wget</span>  http://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>rpm 安装源信息</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql80-community-release-el7-7.noarch.rpm</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="yum安装" tabindex="-1"><a class="header-anchor" href="#yum安装"><span>yum安装</span></a></h3>
<p>再次尝试 yum 安装</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">yum <span class="token function">install</span> mysql-community-server</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>安装过程中，会提示让我们确认，一律输入 y 按回车即可</p>
<p>安装完成后，yum会自动覆盖自带的mariaDB，所以不需要我们手动卸载它</p>
<p>如果出现 gpg 验证失败，可以使用以下命令忽略 gpg 验证：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">yum <span class="token function">install</span> <span class="token parameter variable">-y</span> mysql-community-server <span class="token parameter variable">--nogpgcheck</span> <span class="token parameter variable">--disablerepo</span><span class="token operator">=</span>ius</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="验证-mysql-安装" tabindex="-1"><a class="header-anchor" href="#验证-mysql-安装"><span>验证 MySQL 安装</span></a></h3>
<p>可以使用 mysqladmin 工具来获取服务器状态：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysqladmin <span class="token parameter variable">--version</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出版本信息，则安装成功。</p>
<p>也可以使用 rpm -qa 命令来查看 MySQL 是否安装成功：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> mysql</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出结果如下：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysql-community-libs-compat-8.0.33-1.el7.x86_64</span>
<span class="line">mysql-community-icu-data-files-8.0.33-1.el7.x86_64</span>
<span class="line">mysql80-community-release-el7-7.noarch</span>
<span class="line">mysql-community-common-8.0.33-1.el7.x86_64</span>
<span class="line">mysql-community-libs-8.0.33-1.el7.x86_64</span>
<span class="line">mysql-community-server-8.0.33-1.el7.x86_64</span>
<span class="line">mysql-community-client-8.0.33-1.el7.x86_64</span>
<span class="line">mysql-community-client-plugins-8.0.33-1.el7.x86_64</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出类似以上内容，表示安装完成</p>
<p>检查mariaDB是否被覆盖</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> mariadb</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出空，表示 mariaDB 已经被成功覆盖。</p>
<h3 id="设置密码" tabindex="-1"><a class="header-anchor" href="#设置密码"><span>设置密码</span></a></h3>
<p>Mysql安装成功后，默认的root用户密码为空，可以使用以下命令来创建root用户的密码：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysqladmin <span class="token parameter variable">-u</span> root password <span class="token string">'new_password'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后连接到Mysql服务器：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">systemctl start mysqld</span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>输入密码回车确认，然后就可以进入mysql了</p>
<h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 开启自启</span></span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> mysqld</span>
<span class="line">systemctl start mysqld</span>
<span class="line">systemctl stop mysqld</span>
<span class="line">systemctl restart mysqld</span>
<span class="line">systemctl status mysqld</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查找所有与MySQL 相关的安装路径</span></span>
<span class="line"><span class="token comment"># 也可以直接查看MySQL 的配置文件 my.cnf 来确认数据目录 (datadir) 和基础目录 (basedir)</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-qal</span> <span class="token operator">|</span> <span class="token function">grep</span> mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看进程、版本信息</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> mysql</span>
<span class="line"><span class="token comment"># 或</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-atp</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看mysql-配置文件" tabindex="-1"><a class="header-anchor" href="#查看mysql-配置文件"><span>查看MySQL 配置文件</span></a></h3>
<ul>
<li>MySQL 的配置文件通常是 my.cnf，位于 /etc/my.cnf 或 /etc/mysql/my.cnf 等位置。</li>
<li>查找配置文件位置:可以使用 locate my.cnf 命令来查找配置文件，或者直接尝试查看常见位置。</li>
<li>查看配置文件内容:使用 cat /etc/my.cnf 命令来查看文件内容，寻找 [mysqld] 段落下的 datadir 和 basedir 选项。
<ul>
<li>datadir 指定了MySQL 数据库文件的存储位置，通常在 /var/lib/mysql。</li>
<li>basedir 指定了MySQL 安装的基本目录。</li>
</ul>
</li>
</ul>
<p>常用路径示例:</p>
<ul>
<li>配置文件:/etc/my.cnf</li>
<li>数据目录:/var/lib/mysql</li>
<li>日志文件:/var/log/mysqld.log</li>
<li>服务启动脚本:/usr/lib/systemd/system/mysqld.service</li>
</ul>
<h3 id="导出-sql-文件" tabindex="-1"><a class="header-anchor" href="#导出-sql-文件"><span>导出 sql 文件</span></a></h3>
<p>1.导出整个数据库</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysqldump <span class="token parameter variable">-u</span> 用户名 <span class="token parameter variable">-p</span> 数据库名 <span class="token operator">></span> 导出文件名</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>2.导出一个表</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysqldump <span class="token parameter variable">-u</span> 用户名 <span class="token parameter variable">-p</span> 数据库名 表名<span class="token operator">></span> 导出的文件名</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>3.导出一个数据库结构</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysqldump <span class="token parameter variable">-u</span> dbuser <span class="token parameter variable">-p</span> <span class="token parameter variable">-d</span> --add-drop-table dbname <span class="token operator">></span>d:/dbname_db.sql</span>
<span class="line"><span class="token parameter variable">-d</span> 没有数据 --add-drop-table 在每个create语句之前增加一个drop table</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>4.导入数据库
常用source 命令
进入mysql数据库控制台，如</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span></span>
<span class="line">mysql<span class="token operator">></span>use 数据库</span>
<span class="line">然后使用source命令，后面参数为脚本文件<span class="token punctuation">(</span>如这里用到的.sql<span class="token punctuation">)</span></span>
<span class="line">mysql<span class="token operator">></span>source d:/dbname.sql</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>
<ul>
<li><a href="https://juejin.cn/post/7224408845685325884" target="_blank" rel="noopener noreferrer">CentOS / Linux 安装MySQL（</a></li>
<li><a href="https://cloud.tsyidc.com/internet/1585.html" target="_blank" rel="noopener noreferrer">centos7服务器yum安装MySQL数据库，以及报错的解决方案</a></li>
<li><a href="https://www.cnblogs.com/chinesern/p/8440206.html" target="_blank" rel="noopener noreferrer">Yum安装MySQL以及相关目录路径和修改目录</a></li>
<li><a href=""></a></li>
</ul>
</div></template>


