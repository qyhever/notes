<template><div><ul>
<li><a href="#%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84">项目结构</a>
<ul>
<li><a href="#%E6%96%B9%E6%A1%88%E6%A6%82%E8%BF%B0">方案概述</a></li>
<li><a href="#%E8%AF%A6%E7%BB%86%E6%AD%A5%E9%AA%A4">详细步骤</a>
<ul>
<li><a href="#1-%E5%88%9B%E5%BB%BA%E4%B8%AA%E4%BA%BA%E8%AE%BF%E9%97%AE%E4%BB%A4%E7%89%8C-pat">1. 创建个人访问令牌 (PAT)</a></li>
<li><a href="#2-%E5%87%86%E5%A4%87%E4%B8%AD%E5%A4%AE%E9%83%A8%E7%BD%B2%E4%BB%93%E5%BA%93">2. 准备中央部署仓库</a></li>
<li><a href="#3-%E5%9C%A8%E6%AF%8F%E4%B8%AA%E6%9C%8D%E5%8A%A1%E4%BB%93%E5%BA%93%E4%B8%AD%E9%85%8D%E7%BD%AE%E8%A7%A6%E5%8F%91%E5%B7%A5%E4%BD%9C%E6%B5%81">3. 在每个服务仓库中配置触发工作流</a></li>
</ul>
</li>
<li><a href="#%E6%80%BB%E7%BB%93">总结</a></li>
</ul>
</li>
<li><a href="#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E9%85%8D%E7%BD%AE">环境变量配置</a>
<ul>
<li><a href="#%E6%96%B9%E6%A1%88%E4%B8%80%E5%9C%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E4%BD%BF%E7%94%A8-env-%E6%96%87%E4%BB%B6%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8">方案一：在服务器上使用 <code v-pre>.env</code> 文件，推荐使用</a>
<ul>
<li><a href="#1-%E7%99%BB%E5%BD%95%E5%88%B0%E7%94%9F%E4%BA%A7%E6%9C%8D%E5%8A%A1%E5%99%A8">1. 登录到生产服务器</a></li>
<li><a href="#2-%E5%88%9B%E5%BB%BA-env-%E6%96%87%E4%BB%B6">2. 创建 <code v-pre>.env</code> 文件</a></li>
<li><a href="#3-%E7%BC%96%E8%BE%91%E5%B9%B6%E5%A1%AB%E5%85%85%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F">3. 编辑并填充环境变量</a></li>
<li><a href="#%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86">工作原理</a></li>
</ul>
</li>
<li><a href="#%E6%96%B9%E6%A1%88%E4%BA%8C%E4%BD%BF%E7%94%A8-github-secrets-%E4%B8%8D%E6%8E%A8%E8%8D%90">方案二：使用 GitHub Secrets (不推荐)</a></li>
<li><a href="#%E6%80%BB%E7%BB%93-1">总结</a></li>
</ul>
</li>
</ul>
<h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2>
<ul>
<li><strong>app-deployment</strong>: 中央部署仓库，包含 主 Nginx 入口，统一处理所有路由和 API 代理</li>
<li><strong>pinco</strong>: 博客项目，访问路径为 <code v-pre>/</code> 根路径</li>
<li><strong>r3-admin-front</strong>: 管理前端项目，访问路径为 <code v-pre>/r3-admin</code></li>
<li><strong>r3-admin-server</strong>: 管理后端API服务，为r3-admin-front提供API支持，访问路径为 <code v-pre>/r3/api</code></li>
</ul>
<h3 id="方案概述" tabindex="-1"><a class="header-anchor" href="#方案概述"><span>方案概述</span></a></h3>
<p>多仓库（multi-repo）协同工作，通过一个统一的 GitHub Actions 工作流进行部署。</p>
<p>利用 GitHub Actions 的 <code v-pre>repository_dispatch</code> 事件来触发部署。当任何一个服务仓库有更新时，它会向这个中央仓库发送一个“信号”，触发统一的部署流程。</p>
<ol>
<li><strong>app-deployment</strong>：这个仓库作为部署的中枢，存放 <code v-pre>docker-compose.yml</code>、主 <code v-pre>nginx</code> 配置以及核心的部署工作流 <code v-pre>.github/workflows/deploy.yml</code>。</li>
<li><strong>在服务仓库中配置触发器</strong>：在 <code v-pre>pinco</code>、<code v-pre>r3-admin-front</code> 和 <code v-pre>r3-admin-server</code> 各自的仓库中，创建一个简单的工作流。当代码推送到主分支时，这个工作流会使用 <code v-pre>repository_dispatch</code> API 通知部署仓库。</li>
<li><strong>使用 Personal Access Token (PAT)</strong>：为了让服务仓库有权限触发部署仓库的工作流，需要创建一个 PAT 并将其存储在服务仓库的 Secrets 中。</li>
</ol>
<blockquote>
<p><strong>主 Nginx 仓库</strong>：主 Nginx 配置也可以在一个独立的仓库，它的逻辑与服务仓库类似。部署时，中央仓库会拉取最新的 Nginx 配置。</p>
</blockquote>
<h3 id="详细步骤" tabindex="-1"><a class="header-anchor" href="#详细步骤"><span>详细步骤</span></a></h3>
<h4 id="_1-创建个人访问令牌-pat" tabindex="-1"><a class="header-anchor" href="#_1-创建个人访问令牌-pat"><span>1. 创建个人访问令牌 (PAT)</span></a></h4>
<p>这是实现跨仓库通信的关键。</p>
<ol>
<li>前往您的 GitHub <strong>Settings</strong> &gt; <strong>Developer settings</strong> &gt; <strong>Personal access tokens</strong> &gt; <strong>Tokens (classic)</strong>。</li>
<li>点击 <strong>Generate new token</strong>。</li>
<li><strong>Note</strong>: 命名为 <code v-pre>DEPLOY_DISPATCH_TOKEN</code> 或类似名称。</li>
<li><strong>Expiration</strong>: 根据您的安全策略选择过期时间。</li>
<li><strong>Select scopes</strong>: 勾选 <strong><code v-pre>repo</code></strong> 范围。这提供了对仓库的完全控制，包括触发工作流。</li>
<li>点击 <strong>Generate token</strong> 并<strong>立即复制生成的令牌</strong>，因为离开页面后将无法再次看到。</li>
</ol>
<h4 id="_2-准备中央部署仓库" tabindex="-1"><a class="header-anchor" href="#_2-准备中央部署仓库"><span>2. 准备中央部署仓库</span></a></h4>
<p>假设您创建了一个新的仓库，例如 <code v-pre>my-app-deployment</code>。</p>
<ol>
<li>
<p>文件：</p>
<ul>
<li><code v-pre>docker-compose.yml</code></li>
<li><code v-pre>docker-compose.prod.yml</code></li>
<li><code v-pre>nginx/</code> (存放主 Nginx 配置的目录)</li>
<li><code v-pre>.github/workflows/deploy.yml</code> (我们将修改这个文件)</li>
</ul>
</li>
<li>
<p><strong><code v-pre>deploy.yml</code> 工作流</strong>：
这个文件现在只响应 <code v-pre>repository_dispatch</code> 事件。它需要被更新以拉取正确的镜像。</p>
<p>这是修改后的 <code v-pre>.github/workflows/deploy.yml</code> 示例：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Unified Deployment from Services</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">repository_dispatch</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>deploy<span class="token punctuation">-</span>pinco<span class="token punctuation">,</span> deploy<span class="token punctuation">-</span>r3<span class="token punctuation">-</span>admin<span class="token punctuation">-</span>front<span class="token punctuation">,</span> deploy<span class="token punctuation">-</span>r3<span class="token punctuation">-</span>admin<span class="token punctuation">-</span>server<span class="token punctuation">,</span> deploy<span class="token punctuation">-</span>nginx<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">SERVER_HOST</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token key atrule">SERVER_USER</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_USER <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token key atrule">SERVER_SSH_KEY</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_SSH_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token key atrule">REGISTRY</span><span class="token punctuation">:</span> ghcr.io</span>
<span class="line">  <span class="token comment"># 注意：IMAGE_OWNER 应该是您的 GitHub 用户名或组织名</span></span>
<span class="line">  <span class="token key atrule">IMAGE_OWNER</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.repository_owner <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">deploy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout deployment configuration</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 如果 Nginx 配置在另一个仓库，部署时需要拉取</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout nginx configuration</span>
<span class="line">      <span class="token key atrule">if</span><span class="token punctuation">:</span> github.event.action == 'deploy<span class="token punctuation">-</span>nginx'</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">repository</span><span class="token punctuation">:</span> YOUR_USERNAME/nginx<span class="token punctuation">-</span>config<span class="token punctuation">-</span>repo <span class="token comment"># 替换为您的 Nginx 配置仓库</span></span>
<span class="line">        <span class="token key atrule">path</span><span class="token punctuation">:</span> ./nginx <span class="token comment"># 将配置拉取到 nginx 目录</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup SSH</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> webfactory/ssh<span class="token punctuation">-</span>agent@v0.9.0</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">ssh-private-key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_SSH_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Add server to known hosts</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> ssh<span class="token punctuation">-</span>keyscan <span class="token punctuation">-</span>H $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token punctuation">></span><span class="token punctuation">></span> ~/.ssh/known_hosts</span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create deployment directory on server</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> ssh $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_USER <span class="token punctuation">}</span><span class="token punctuation">}</span>@$<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span> "mkdir <span class="token punctuation">-</span>p /opt/pros"</span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Copy deployment files to server</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">        scp docker-compose.yml ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }}:/opt/pros/</span>
<span class="line">        scp docker-compose.prod.yml ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }}:/opt/pros/</span>
<span class="line">        scp -r nginx/ ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }}:/opt/pros/</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Login to registry on server</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">        ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} "echo ${{ secrets.GITHUB_TOKEN }} | docker login ${{ env.REGISTRY }} -u ${{ github.actor }} --password-stdin"</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy application</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">        ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} &lt;&lt; 'EOF'</span>
<span class="line">          cd /opt/pros</span>
<span class="line">          </span>
<span class="line">          # 从 dispatch 事件中获取服务名</span>
<span class="line">          SERVICE_NAME="${{ github.event.client_payload.service }}"</span>
<span class="line">          </span>
<span class="line">          # 如果有服务名，只拉取该服务的最新镜像，否则拉取所有</span>
<span class="line">          if [ -n "$SERVICE_NAME" ]; then</span>
<span class="line">            docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull $SERVICE_NAME</span>
<span class="line">          else</span>
<span class="line">            docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull</span>
<span class="line">          fi</span>
<span class="line">          </span>
<span class="line">          docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans</span>
<span class="line">          docker image prune -f</span>
<span class="line">          docker-compose ps</span>
<span class="line">        EOF</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：您还需要修改 <code v-pre>docker-compose.prod.yml</code>，使其使用正确的镜像名称，因为 <code v-pre>${{ github.repository }}</code> 的上下文已经改变。您需要硬编码或通过 <code v-pre>client_payload</code> 传递镜像名。</p>
</li>
</ol>
<h4 id="_3-在每个服务仓库中配置触发工作流" tabindex="-1"><a class="header-anchor" href="#_3-在每个服务仓库中配置触发工作流"><span>3. 在每个服务仓库中配置触发工作流</span></a></h4>
<p>在 <code v-pre>pinco</code>、<code v-pre>r3-admin-front</code> 和 <code v-pre>r3-admin-server</code> 这三个仓库中，分别执行以下操作：</p>
<ol>
<li>
<p><strong>添加 Secret</strong>：</p>
<ul>
<li>进入仓库的 <strong>Settings</strong> &gt; <strong>Secrets and variables</strong> &gt; <strong>Actions</strong>。</li>
<li>创建一个新的仓库 Secret，命名为 <code v-pre>CROSS_REPO_PAT</code>，值为您在第一步创建的个人访问令牌。</li>
</ul>
</li>
<li>
<p><strong>创建触发工作流</strong>：
在每个服务仓库中，创建文件 <code v-pre>.github/workflows/trigger-deploy.yml</code>。</p>
<p><strong>示例：<code v-pre>r3-admin-front</code> 仓库中的 <code v-pre>trigger-deploy.yml</code></strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Build and Trigger Deployment</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main<span class="token punctuation">,</span> master <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">build-and-dispatch</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout code</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line"></span>
<span class="line">      <span class="token comment"># ... 这里是您原来的 lint, test, build, and push Docker image 的步骤 ...</span></span>
<span class="line">      <span class="token comment"># 您需要确保每个服务仓库都能独立构建和推送自己的 Docker 镜像</span></span>
<span class="line">      <span class="token comment"># 例如：</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Log in to Container Registry</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">registry</span><span class="token punctuation">:</span> ghcr.io</span>
<span class="line">          <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.actor <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build and push Docker image</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/build<span class="token punctuation">-</span>push<span class="token punctuation">-</span>action@v5</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">context</span><span class="token punctuation">:</span> .</span>
<span class="line">          <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">          <span class="token key atrule">tags</span><span class="token punctuation">:</span> ghcr.io/$<span class="token punctuation">{</span><span class="token punctuation">{</span> github.repository_owner <span class="token punctuation">}</span><span class="token punctuation">}</span>/r3<span class="token punctuation">-</span>admin<span class="token punctuation">-</span>front<span class="token punctuation">:</span>latest <span class="token comment"># 确保镜像是唯一的</span></span>
<span class="line">          <span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token string">"service=r3-admin-front"</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment"># 构建成功后，触发中央部署仓库的工作流</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Trigger deployment</span>
<span class="line">        <span class="token key atrule">if</span><span class="token punctuation">:</span> success()</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          curl -L \</span>
<span class="line">            -X POST \</span>
<span class="line">            -H "Accept: application/vnd.github+json" \</span>
<span class="line">            -H "Authorization: Bearer ${{ secrets.CROSS_REPO_PAT }}" \</span>
<span class="line">            -H "X-GitHub-Api-Version: 2022-11-28" \</span>
<span class="line">            https://api.github.com/repos/YOUR_USERNAME/my-app-deployment/dispatches \</span>
<span class="line">            -d '{"event_type":"deploy-r3-admin-front", "client_payload": {"service": "r3-admin-front"}}'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重要提示</strong>：</p>
<ul>
<li>您需要为每个服务仓库（<code v-pre>pinco</code>、<code v-pre>r3-admin-server</code>）创建类似的 <code v-pre>trigger-deploy.yml</code> 文件。</li>
<li><strong>修改 <code v-pre>curl</code> 命令</strong>：
<ul>
<li>将 <code v-pre>YOUR_USERNAME/my-app-deployment</code> 替换为您的中央部署仓库的实际路径。</li>
<li>将 <code v-pre>event_type</code> 更改为对应的值（例如，<code v-pre>deploy-pinco</code>）。</li>
<li>将 <code v-pre>client_payload</code> 中的 <code v-pre>service</code> 值更改为对应的服务名（例如，<code v-pre>pinco</code>）。</li>
</ul>
</li>
</ul>
</li>
</ol>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>部署流程为：</p>
<ol>
<li>当您向 <code v-pre>r3-admin-front</code> 的 <code v-pre>main</code> 分支推送代码时。</li>
<li><code v-pre>r3-admin-front</code> 仓库中的 <code v-pre>trigger-deploy.yml</code> 工作流被触发。</li>
<li>它会运行测试、构建新的 <code v-pre>r3-admin-front:latest</code> Docker 镜像并推送到 <code v-pre>ghcr.io</code>。</li>
<li>构建成功后，它会向 <code v-pre>app-deployment</code> 仓库发送一个 <code v-pre>repository_dispatch</code> 事件。</li>
<li><code v-pre>app-deployment</code> 仓库中的 <code v-pre>deploy.yml</code> 工作流被唤醒，它拉取最新的部署配置，然后登录到您的服务器。</li>
<li>在服务器上，它只拉取刚刚更新的 <code v-pre>r3-admin-front</code> 镜像，并使用 <code v-pre>docker-compose up -d</code> 重启服务。</li>
</ol>
<p>这个方案实现了关注点分离，每个服务仓库只负责构建自己，而部署逻辑则集中在中央仓库，使得整个系统更加清晰和易于维护。</p>
<h2 id="环境变量配置" tabindex="-1"><a class="header-anchor" href="#环境变量配置"><span>环境变量配置</span></a></h2>
<p>环境变量关系到如何安全地管理生产环境的敏感配置（如数据库密码）。</p>
<p>在 <code v-pre>app-deployment/docker-compose.prod.yml</code> 文件中，<code v-pre>DB_HOST=${DB_HOST}</code> 这样的语法意味着 Docker Compose 会在执行时，从其运行环境（Shell）中查找名为 <code v-pre>DB_HOST</code> 的环境变量，并将其值注入到容器中。</p>
<p>在 GitHub Actions 部署流程中，<code v-pre>docker-compose</code> 命令是在生产服务器上通过 SSH 执行的。因此，这些环境变量需要在<strong>生产服务器上</strong>进行配置。</p>
<h3 id="方案一-在服务器上使用-env-文件-推荐使用" tabindex="-1"><a class="header-anchor" href="#方案一-在服务器上使用-env-文件-推荐使用"><span>方案一：在服务器上使用 <code v-pre>.env</code> 文件，推荐使用</span></a></h3>
<p>这是最安全、最标准的做法，可以实现配置与代码的分离。敏感信息将只存在于服务器上，不会暴露在 GitHub 仓库或 Actions 日志中。</p>
<p><strong>操作步骤如下：</strong></p>
<h4 id="_1-登录到生产服务器" tabindex="-1"><a class="header-anchor" href="#_1-登录到生产服务器"><span>1. 登录到生产服务器</span></a></h4>
<p>通过 SSH 登录到您部署应用的服务器。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">ssh</span> your_user@your_server_host</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_2-创建-env-文件" tabindex="-1"><a class="header-anchor" href="#_2-创建-env-文件"><span>2. 创建 <code v-pre>.env</code> 文件</span></a></h4>
<p>在部署目录 <code v-pre>/opt/pros</code> 中，创建一个名为 <code v-pre>.env</code> 的文件。这个目录就是在 GitHub Actions 中指定的部署路径。</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">touch</span> /opt/pros/.env</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_3-编辑并填充环境变量" tabindex="-1"><a class="header-anchor" href="#_3-编辑并填充环境变量"><span>3. 编辑并填充环境变量</span></a></h4>
<p>使用 <code v-pre>vim</code> 或 <code v-pre>nano</code> 编辑这个文件，并填入所有需要的环境变量。格式为 <code v-pre>KEY=VALUE</code>。</p>
<p><strong>示例 <code v-pre>/opt/pros/.env</code> 文件内容：</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># /opt/pros/.env</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数据库配置</span></span>
<span class="line"><span class="token assign-left variable">DB_HOST</span><span class="token operator">=</span>localhost  <span class="token comment"># 或数据库服务器IP/容器名</span></span>
<span class="line"><span class="token assign-left variable">DB_PORT</span><span class="token operator">=</span><span class="token number">3306</span></span>
<span class="line"><span class="token assign-left variable">DB_DATABASE</span><span class="token operator">=</span>r3</span>
<span class="line"><span class="token assign-left variable">DB_USERNAME</span><span class="token operator">=</span>your_db_user</span>
<span class="line"><span class="token assign-left variable">DB_PASSWORD</span><span class="token operator">=</span>your_super_secret_password</span>
<span class="line"></span>
<span class="line"><span class="token comment"># JWT 配置</span></span>
<span class="line"><span class="token assign-left variable">JWT_SECRET</span><span class="token operator">=</span>a_very_long_and_random_secret_string</span>
<span class="line"><span class="token assign-left variable">JWT_EXPIRE</span><span class="token operator">=</span>4h</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以在本地编写好 <code v-pre>.env</code> 文件，直接上传到生产服务器 <code v-pre>/opt/pros</code> 下。</p>
<p><strong>重要提示</strong>：</p>
<ul>
<li><strong><code v-pre>DB_HOST</code> 的值</strong>：
<ul>
<li>如果数据库也运行在同一台服务器的 Docker 容器中，您应该使用数据库服务的容器名（例如 <code v-pre>mysql_db</code>）。</li>
<li>如果数据库在宿主机上运行（非 Docker），您可能需要使用 <code v-pre>host.docker.internal</code> (需要 <code v-pre>extra_hosts</code> 配置) 或宿主机的局域网 IP。</li>
<li>如果数据库在另一台服务器上，则填写其 IP 地址。</li>
</ul>
</li>
<li>务必为 <code v-pre>DB_PASSWORD</code> 和 <code v-pre>JWT_SECRET</code> 设置强随机值。</li>
</ul>
<h4 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理"><span>工作原理</span></a></h4>
<p>当 GitHub Actions 工作流在服务器的 <code v-pre>/opt/pros</code> 目录下执行 <code v-pre>docker-compose ... up -d</code> 命令时，Docker Compose 会<strong>自动检测</strong>并加载同目录下的 <code v-pre>.env</code> 文件，然后将这些变量的值替换到 <code v-pre>app-deployment/docker-compose.prod.yml</code> 中。<strong>无需修改任何 <code v-pre>.yml</code> 文件</strong>，这个机制是 Docker Compose 内建的。</p>
<h3 id="方案二-使用-github-secrets-不推荐" tabindex="-1"><a class="header-anchor" href="#方案二-使用-github-secrets-不推荐"><span>方案二：使用 GitHub Secrets (不推荐)</span></a></h3>
<p>也可以将这些变量存储在 <code v-pre>app-deployment</code> 仓库的 GitHub Secrets 中，并在运行时传递给服务器。</p>
<p>这种方法的缺点是配置和部署逻辑耦合在一起，且在复杂的脚本中存在意外泄露敏感信息的风险。它更适合非敏感的配置。</p>
<p>如果仍希望这样做，需要修改 <code v-pre>app-deployment</code> 的 <code v-pre>deploy.yml</code> 文件，在 <code v-pre>Deploy application</code> 步骤中注入环境变量，如下所示：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token comment"># ... (在 deploy.yml 中)</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy application</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">        ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} " \</span>
<span class="line">        export DB_HOST=${{ secrets.DB_HOST }} &amp;&amp; \</span>
<span class="line">        export DB_PORT=${{ secrets.DB_PORT }} &amp;&amp; \</span>
<span class="line">        export DB_DATABASE=${{ secrets.DB_DATABASE }} &amp;&amp; \</span>
<span class="line">        export DB_USERNAME=${{ secrets.DB_USERNAME }} &amp;&amp; \</span>
<span class="line">        export DB_PASSWORD=${{ secrets.DB_PASSWORD }} &amp;&amp; \</span>
<span class="line">        export JWT_SECRET=${{ secrets.JWT_SECRET }} &amp;&amp; \</span>
<span class="line">        export JWT_EXPIRE=${{ secrets.JWT_EXPIRE }} &amp;&amp; \</span>
<span class="line">        cd /opt/pros &amp;&amp; \</span>
<span class="line">        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后需要在 <code v-pre>app-deployment</code> 仓库的 <code v-pre>Settings &gt; Secrets and variables &gt; Actions</code> 中创建所有对应的 Secrets (<code v-pre>DB_HOST</code>, <code v-pre>DB_PASSWORD</code> 等)。</p>
<h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1"><span>总结</span></a></h3>
<p>建议采用第一种方法，在服务器上创建并管理 <code v-pre>.env</code> 文件。这是管理生产环境敏感数据的行业标准。</p>
</div></template>


