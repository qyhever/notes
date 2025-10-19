<template><div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2>
<h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>linux</span></a></h3>
<h4 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose"><span>docker-compose</span></a></h4>
<ol>
<li>下载安装包</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-L</span> https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">`</span></span>-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">`</span></span> <span class="token parameter variable">-o</span> usr/local/bin/docker-compose</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>下载完成之后，不需要解压，因为下载的本来就是文件夹。</p>
<ol start="2">
<li>赋予文件夹权限</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">chmod</span> +x usr/local/bin/docker-compose</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="3">
<li>验证安装</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> version</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="4">
<li>离线安装方式</li>
</ol>
<p>docker-compose官方git地址：<a href="https://github.com/docker/compose/releases" target="_blank" rel="noopener noreferrer">https://github.com/docker/compose/releases</a></p>
<p>下载linux版本的，直接传到/usr/local/bin目录下即可。</p>
<ol start="5">
<li>配置别名</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 编辑.bashrc 或者 .zshrc</span></span>
<span class="line"><span class="token function">vim</span> ~/.bashrc</span>
<span class="line"><span class="token comment"># 配置 dc 别名</span></span>
<span class="line"><span class="token builtin class-name">alias</span> <span class="token assign-left variable">dc</span><span class="token operator">=</span><span class="token string">'docker-compose'</span></span>
<span class="line"><span class="token comment"># 刷新生效</span></span>
<span class="line"><span class="token builtin class-name">source</span> ~/.bashrc</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置好后就可以使用 <code v-pre>dc</code> 命令替代 <code v-pre>docker-compose</code> 了</p>
<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>docker</span></a></h2>
<h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动"><span>启动</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># service 命令的用法</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> <span class="token function">docker</span> start</span>
<span class="line"></span>
<span class="line"><span class="token comment"># systemctl 命令的用法</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start <span class="token function">docker</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="image-镜像" tabindex="-1"><a class="header-anchor" href="#image-镜像"><span>image 镜像</span></a></h3>
<p>Docker 把应用程序及其依赖，打包在 image 文件里面。只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 列出本机的所有 image 文件。</span></span>
<span class="line"><span class="token function">docker</span> image <span class="token function">ls</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除 image 文件</span></span>
<span class="line"><span class="token function">docker</span> image <span class="token function">rm</span> <span class="token punctuation">[</span>imageName<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建镜像(基于当前目录下的Dockerfile)</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token punctuation">[</span>imageName<span class="token punctuation">]</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="container-容器" tabindex="-1"><a class="header-anchor" href="#container-容器"><span>container 容器</span></a></h3>
<p>image 文件生成的容器实例，本身也是一个文件，称为容器文件。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 新建并运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">--name</span> <span class="token punctuation">[</span>containerName<span class="token punctuation">]</span> <span class="token punctuation">[</span>imageName<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出本机正在运行的容器</span></span>
<span class="line"><span class="token function">docker</span> container <span class="token function">ls</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出本机所有容器，包括终止运行的容器</span></span>
<span class="line"><span class="token function">docker</span> container <span class="token function">ls</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 手动终止</span></span>
<span class="line"><span class="token function">docker</span> container <span class="token function">kill</span> <span class="token punctuation">[</span>containID<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除容器</span></span>
<span class="line"><span class="token function">docker</span> container <span class="token function">rm</span> <span class="token punctuation">[</span>containerID<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># vue项目部署示例</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> my-vue3-app <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">--name</span> vue3-app my-vue3-app</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>docker container start</li>
</ol>
<p>前面的docker container run命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用docker container start命令，它用来启动已经生成、已经停止运行的容器文件。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> container start <span class="token punctuation">[</span>containerID<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="2">
<li>docker container stop</li>
</ol>
<p>docker container kill命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。</p>
<p>docker container stop命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。</p>
<p>这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> container stop <span class="token punctuation">[</span>containerID<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="3">
<li>docker container logs</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> container logs <span class="token punctuation">[</span>containerID<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="4">
<li>docker container exec</li>
</ol>
<p>docker container exec命令用于进入一个正在运行的 docker 容器。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> container <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token punctuation">[</span>containerID<span class="token punctuation">]</span> /bin/bash</span>
<span class="line"><span class="token comment"># 使用 Alpine Linux 基础镜像的容器中，因为 Alpine 使用的是 ash shell 而不是 bash</span></span>
<span class="line"><span class="token function">docker</span> container <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token punctuation">[</span>containerID<span class="token punctuation">]</span> /bin/sh</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>docker container cp</li>
</ol>
<p>docker container cp命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> container <span class="token function">cp</span> <span class="token punctuation">[</span>containID<span class="token punctuation">]</span>:<span class="token punctuation">[</span>/path/to/file<span class="token punctuation">]</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># example</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">cp</span> <span class="token punctuation">[</span>containName<span class="token punctuation">]</span>:/etc/nginx/nginx.conf /data/docker/nginx/conf/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose-1" tabindex="-1"><a class="header-anchor" href="#docker-compose-1"><span>docker-compose</span></a></h2>
<p>常用命令：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 启动服务(自动完成包括构建镜像、创建服务、启动服务并关联服务相关容器的一系列操作)</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"><span class="token comment"># 停止服务(停止容器并删除由其创建的容器，网络，卷和图像up)</span></span>
<span class="line"><span class="token function">docker-compose</span> down</span>
<span class="line"><span class="token comment"># 列出所有运行</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"><span class="token comment"># 查看服务日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs</span>
<span class="line"><span class="token comment"># 查看某个服务日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs service_name</span>
<span class="line"><span class="token comment"># 查看某个服务日志(最新20条记录)</span></span>
<span class="line"><span class="token function">docker-compose</span> logs service_name <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">20</span></span>
<span class="line"><span class="token comment"># 构建或重新构建服务</span></span>
<span class="line"><span class="token function">docker-compose</span> build</span>
<span class="line"><span class="token comment"># 启动已存在的服务</span></span>
<span class="line"><span class="token function">docker-compose</span> start service_name</span>
<span class="line"><span class="token comment"># 停止已存在的服务</span></span>
<span class="line"><span class="token function">docker-compose</span> stop service_name</span>
<span class="line"><span class="token comment"># 重启服务</span></span>
<span class="line"><span class="token function">docker-compose</span> restart service_name</span>
<span class="line"><span class="token comment"># 重新构建并运行某一个服务</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">--build</span> service_name <span class="token parameter variable">-d</span></span>
<span class="line"><span class="token comment"># 进入容器</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> service_name /bin/sh</span>
<span class="line"><span class="token comment"># 重启nginx(如果service_name是nginx)</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"><span class="token comment"># 检查nginx.conf是否配置正确(如果service_name是nginx)</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx nginx <span class="token parameter variable">-t</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-容器如何访问宿主机网络" tabindex="-1"><a class="header-anchor" href="#docker-容器如何访问宿主机网络"><span>docker 容器如何访问宿主机网络</span></a></h2>
<h3 id="方案一" tabindex="-1"><a class="header-anchor" href="#方案一"><span>方案一</span></a></h3>
<p>使用 host 模式启动服务。</p>
<p>默认情况下，docker 使用的是桥接模式启动服务，即 Docker 容器将使用 Docker 自己创建的虚拟网络，Docker 容器之间可以相互通信，但是它们无法直接访问宿主机上的网络服务。Docker 容器需要通过端口映射来暴露自己的服务，以便宿主机或其他网络主机访问。</p>
<p>而使用 host 模式启动，Docker 容器与宿主机共享同一个网络命名空间，即 Docker 容器将直接使用宿主机的网络。这意味着 Docker 容器可以使用宿主机的 IP 地址和端口，可以直接访问宿主机上的网络服务。然而，host 模式也存在一些限制，例如 Docker 容器之间无法直接通信，Docker 容器的网络性能可能会受到影响。</p>
<p>但是因为这种模式的局限性，因此实际生产当中几乎没有人会用这种方式，所以不推荐使用方案一，推荐方案二。</p>
<h3 id="方案二" tabindex="-1"><a class="header-anchor" href="#方案二"><span>方案二</span></a></h3>
<p>docker 官方提供了一种支持方案，可通过指向 host.docker.internal 来指向宿主机的 IP。<a href="https://docs.docker.com/desktop/features/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-hostv" target="_blank" rel="noopener noreferrer">传送门</a></p>
<p>但注意，这个方案存在一个问题，那就是只支持 Mac 与 Windows 中 desktop 这种环境，并不支持在 Linux 中使用，所以不能直接使用。</p>
<p>于是，有人在官方提交了这个 <a href="https://github.com/docker/for-linux/issues/264" target="_blank" rel="noopener noreferrer">issue</a>。</p>
<p>需要注意的是，这个功能在 docker 版本过低的时候，可能支持的有问题，所以你的 docker 版本最好不低于 20。</p>
<p>如果使用的是 docker-compose，则通过添加如下内容进行配置：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">extra_hosts:</span>
<span class="line">  - <span class="token string">'host.docker.internal:host-gateway'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="alpine-linux-与传统linux的区别" tabindex="-1"><a class="header-anchor" href="#alpine-linux-与传统linux的区别"><span>Alpine Linux 与传统Linux的区别</span></a></h2>
<ul>
<li>包管理器: 使用 apk 而不是 apt 或 yum</li>
<li>Shell: 默认使用 ash/sh 而不是 bash</li>
<li>体积: 更小巧轻量
如果确实需要在Alpine容器中使用bash，可以安装它：</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 在容器内执行</span></span>
<span class="line">apk <span class="token function">add</span> <span class="token function">bash</span></span>
<span class="line"><span class="token comment"># 然后就可以使用 bash 了</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入容器后，您可以执行以下常用操作：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 查看当前目录</span></span>
<span class="line"><span class="token builtin class-name">pwd</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出文件</span></span>
<span class="line"><span class="token function">ls</span> <span class="token parameter variable">-la</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看nginx配置</span></span>
<span class="line"><span class="token function">cat</span> /etc/nginx/conf.d/default.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看nginx进程</span></span>
<span class="line"><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查端口监听</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-tulpn</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看环境变量</span></span>
<span class="line"><span class="token function">env</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 退出容器</span></span>
<span class="line"><span class="token builtin class-name">exit</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关文档" tabindex="-1"><a class="header-anchor" href="#相关文档"><span>相关文档</span></a></h2>
<ul>
<li><a href="https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html" target="_blank" rel="noopener noreferrer">Docker 入门教程-阮一峰</a></li>
<li><a href=""></a></li>
<li><a href=""></a></li>
<li><a href=""></a></li>
<li><a href=""></a></li>
</ul>
</div></template>


