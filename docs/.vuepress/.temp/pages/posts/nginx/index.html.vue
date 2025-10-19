<template><div><ul>
<li><a href="#%E5%AE%89%E8%A3%85">安装</a>
<ul>
<li><a href="#yum-%E5%AE%89%E8%A3%85">yum 安装</a></li>
<li><a href="#%E6%BA%90%E7%A0%81%E5%8C%85-%E5%AE%89%E8%A3%85">源码包 安装</a></li>
<li><a href="#yum-%E5%92%8C-%E6%BA%90%E7%A0%81%E5%8C%85-%E5%AE%89%E8%A3%85%E7%9A%84%E5%8C%BA%E5%88%AB">yum 和 源码包 安装的区别</a>
<ul>
<li><a href="#%E5%AE%89%E8%A3%85%E8%B7%AF%E5%BE%84%E4%B8%8D%E5%90%8C">安装路径不同</a></li>
<li><a href="#%E5%90%AF%E5%8A%A8%E6%96%B9%E5%BC%8F%E4%B8%8D%E5%90%8C">启动方式不同</a></li>
</ul>
</li>
<li><a href="#reference">Reference</a></li>
</ul>
</li>
</ul>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2>
<h3 id="yum-安装" tabindex="-1"><a class="header-anchor" href="#yum-安装"><span>yum 安装</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nginx</span>
<span class="line"><span class="token function">service</span> nginx start</span>
<span class="line"><span class="token function">service</span> nginx stop</span>
<span class="line"><span class="token function">service</span> nginx restart</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="源码包-安装" tabindex="-1"><a class="header-anchor" href="#源码包-安装"><span>源码包 安装</span></a></h3>
<ol>
<li>安装编译
系统 centos 6.7 32位，首先安装缺少的依赖包：</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc gcc-c++ <span class="token function">make</span> libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>从 <a href="https://nginx.org/en/download.html" target="_blank" rel="noopener noreferrer">官网</a> 下载稳定版 nginx-1.12.2.tar.gz ，下载的压缩文件 放在任意地方都可以，但是建议放在 /usr/local/src 或者 /root/ 下，/usr/local/src 就是系统专门给用户分配的放 源码的目录，/root/ 是我们默认操作的目录，也可以放在这里。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 通过wget下载</span></span>
<span class="line"><span class="token function">wget</span> http://nginx.org/download/nginx-1.12.2.tar.gz</span>
<span class="line"><span class="token comment"># 解压</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> nginx-1.12.2.tar.gz</span>
<span class="line"><span class="token comment"># 进入</span></span>
<span class="line"><span class="token builtin class-name">cd</span> nginx-1.12.2</span>
<span class="line"><span class="token comment"># nginx-1.12.2 目录下执行 配置 和 make 命令</span></span>
<span class="line">nginx-1.10.1 ./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre</span>
<span class="line">nginx-1.10.1 <span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>启动 停止 nginx</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">/usr/local/webserver/nginx/sbin/nginx</span>
<span class="line">/usr/local/webserver/nginx/sbin/nginx <span class="token parameter variable">-s</span> stop</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动 nginx 服务后，可以通过 ps -aux | grep nginx 查看进程</p>
<ol start="3">
<li>其它
常用编译选项说明：<a href="https://segmentfault.com/a/1190000002797601" target="_blank" rel="noopener noreferrer">来自</a></li>
</ol>
<ul>
<li>
<p>--prefix=PATH ： 指定 nginx 的安装目录。默认 /usr/local/nginx，我的是 /usr/local/webserver/nginx</p>
</li>
<li>
<p>--conf-path=PATH ： 设置nginx.conf配置文件的路径。nginx允许使用不同的配置文件启动，通过命令行中的-c选项。默认为conf/nginx.conf</p>
</li>
<li>
<p>--user=name ： 设置nginx工作进程的用户。安装完成后，可以随时在nginx.conf配置文件更改user指令。默认的用户名是nobody。--group=name类似</p>
</li>
<li>
<p>--with-pcre ： 设置PCRE库的源码路径，如果已通过yum方式安装，使用--with-pcre自动找到库文件。使用--with-pcre=PATH时，需要从PCRE网站下载pcre库的源码（8.39）并解压，指定 pcre 的源码路径 ，比如：--with-pcre=/root/pcre-8.39/。perl正则表达式使用在location指令和 ngx_http_rewrite_module模块中。</p>
</li>
<li>
<p>--with-zlib=PATH ： 指定 zlib（版本1.1.3 - 1.2.5）的源码解压目录。在默认就启用的网络传输压缩模块ngx_http_gzip_module时需要使用zlib 。</p>
</li>
<li>
<p>--with-http_ssl_module ： 使用https协议模块。默认情况下，该模块没有被构建。前提是openssl与openssl-devel已安装</p>
</li>
<li>
<p>--with-http_stub_status_module ： 用来监控 Nginx 的当前状态</p>
</li>
<li>
<p>--with-http_realip_module ： 通过这个模块允许我们改变客户端请求头中客户端IP地址值(例如X-Real-IP 或 X-Forwarded-For)，意义在于能够使得后台服务器记录原始客户端的IP地址</p>
</li>
<li>
<p>--add-module=PATH ： 添加第三方外部模块，如nginx-sticky-module-ng或缓存模块。每次添加新的模块都要重新编译（Tengine可以在新加入module时无需重新编译）</p>
</li>
</ul>
<h3 id="yum-和-源码包-安装的区别" tabindex="-1"><a class="header-anchor" href="#yum-和-源码包-安装的区别"><span>yum 和 源码包 安装的区别</span></a></h3>
<p>yum 安装是在线安装，好处是：安装方式简单，不易出错；<br>
源码包 安装是先将 nginx 的源码下载下来，在自己的系统里编译生成可执行文件，然后执行，好处是：因为是在自己的系统上编译的，更符合自己系统的性能，也就是说在自己的系统上执行 nginx 服务性能效率更好。</p>
<h4 id="安装路径不同" tabindex="-1"><a class="header-anchor" href="#安装路径不同"><span>安装路径不同</span></a></h4>
<p>他们之间最大的区别是 ：安装位置不同。<br>
yum 在线安装会将 nginx 的安装文件放在系统的不同位置，可以通过命令 rpm -ql nginx 来查看安装路径，如下所示：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">/etc/logrotate.d/nginx</span>
<span class="line">/etc/nginx</span>
<span class="line">/etc/nginx/conf.d</span>
<span class="line">/etc/nginx/conf.d/default.conf</span>
<span class="line">/etc/nginx/conf.d/ssl.conf</span>
<span class="line">/etc/nginx/conf.d/virtual.conf</span>
<span class="line">/etc/nginx/fastcgi.conf</span>
<span class="line">/etc/nginx/fastcgi.conf.default</span>
<span class="line">/etc/nginx/fastcgi_params</span>
<span class="line">/etc/nginx/fastcgi_params.default</span>
<span class="line">/etc/nginx/koi-utf</span>
<span class="line">/etc/nginx/koi-win</span>
<span class="line">/etc/nginx/mime.types</span>
<span class="line">/etc/nginx/mime.types.default</span>
<span class="line">/etc/nginx/nginx.conf</span>
<span class="line">/etc/nginx/nginx.conf.default</span>
<span class="line">/etc/nginx/scgi_params</span>
<span class="line">/etc/nginx/scgi_params.default</span>
<span class="line">/etc/nginx/uwsgi_params</span>
<span class="line">/etc/nginx/uwsgi_params.default</span>
<span class="line">/etc/nginx/win-utf</span>
<span class="line">/etc/rc.d/init.d/nginx</span>
<span class="line">/etc/sysconfig/nginx</span>
<span class="line">/usr/lib/perl5/vendor_perl/auto/nginx</span>
<span class="line">/usr/lib/perl5/vendor_perl/auto/nginx/nginx.so</span>
<span class="line">/usr/lib/perl5/vendor_perl/nginx.pm</span>
<span class="line">/usr/sbin/nginx</span>
<span class="line">/usr/share/doc/nginx-1.0.15</span>
<span class="line">/usr/share/doc/nginx-1.0.15/CHANGES</span>
<span class="line">/usr/share/doc/nginx-1.0.15/LICENSE</span>
<span class="line">/usr/share/doc/nginx-1.0.15/README</span>
<span class="line">/usr/share/man/man3/nginx.3pm.gz</span>
<span class="line">/usr/share/man/man8/nginx.8.gz</span>
<span class="line">/usr/share/nginx/html/404.html</span>
<span class="line">/usr/share/nginx/html/50x.html</span>
<span class="line">/usr/share/nginx/html/index.html</span>
<span class="line">/usr/share/nginx/html/nginx-logo.png</span>
<span class="line">/usr/share/nginx/html/poweredby.png</span>
<span class="line">/usr/share/vim/vimfiles/ftdetect/nginx.vim</span>
<span class="line">/usr/share/vim/vimfiles/indent/nginx.vim</span>
<span class="line">/usr/share/vim/vimfiles/syntax/nginx.vim</span>
<span class="line">/var/lib/nginx</span>
<span class="line">/var/lib/nginx/tmp</span>
<span class="line">/var/log/nginx</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>卸载的时候，只能通过 命令来卸载，因为我们不可能 将这些文件自己手动删除，可以通过命令 rpm -e nginx 来卸载，这个命令一般不会报错，因为 nginx 不与其他的包有依赖关系，如果提示关于 依赖包的问题 ，可以尝试 rpm -e --nodeps nginx 来卸载，这个命令相当于强制卸载，不考虑依赖问题。</p>
<p>源码包 安装他的所有文件（包括配置文件，库文件，资源文件等）都在同一个目录下，我们想卸载的时候，直接将这个文件删除就可以，不会有任何垃圾文件存在。
通过源码包编译安装的软件，通常都放在 /usr/local/包名 路径下。</p>
<h4 id="启动方式不同" tabindex="-1"><a class="header-anchor" href="#启动方式不同"><span>启动方式不同</span></a></h4>
<p>yum 安装 nginx，可以通过 系统服务命令 service 来启动或停止(或者是systemctl)</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">service</span> nginx start <span class="token comment">#启动 nginx 服务</span></span>
<span class="line"></span>
<span class="line"><span class="token function">service</span> nginx stop <span class="token comment">#停止 nginx 服务</span></span>
<span class="line"></span>
<span class="line"><span class="token function">service</span> nginx restart <span class="token comment">#重启 nginx 服务</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>源码包 安装 nginx 启动的时候不能使用 service 来启动，需要执行 nginx 安装目录下的 sbin 目录下的 nginx 可执行程序才行，如下（我的 nginx 安装在 /usr/local/webserver/ 目录下）</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">/usr/local/webserver/nginx/sbin/nginx           <span class="token comment">#启动 nginx 服务</span></span>
<span class="line">/usr/local/webserver/nginx/sbin/nginx <span class="token parameter variable">-s</span> stop   <span class="token comment">#停止 nginx 服务</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或者 直接进入安装目录 ，执行 ./nginx 也可以，这两种方式其实是一样的，. 表示当前目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> /usr/local/webserver/nginx/sbin</span>
<span class="line">sbin ./nginx</span>
<span class="line">sbin ./nginx <span class="token parameter variable">-s</span> stop</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：在自己的系统中只用选择一种安装方式即可，yum 安装的 nginx 版本可能不是最新的，可以通过 源码包 安装最新的，但系统中只要一种就可以，如果你想安装两个安装也可以，但是他们监听的端口都是 80 端口，每次只能启动一个</p>
</blockquote>
<h3 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h3>
<ul>
<li><a href="https://blog.csdn.net/huangyimo/article/details/80762878" target="_blank" rel="noopener noreferrer">agentzh 的 Nginx 教程（版本 2016.07.21</a></li>
<li><a href=""></a></li>
</ul>
</div></template>


