<template><div><ul>
<li><a href="#-%E9%83%A8%E7%BD%B2%E6%A3%80%E6%9F%A5%E6%B8%85%E5%8D%95">🚀 部署检查清单</a>
<ul>
<li><a href="#%E9%83%A8%E7%BD%B2%E5%89%8D%E5%87%86%E5%A4%87">部署前准备</a>
<ul>
<li><a href="#-%E4%BB%A3%E7%A0%81%E5%87%86%E5%A4%87">✅ 代码准备</a></li>
<li><a href="#-%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%8E%AF%E5%A2%83">✅ 服务器环境</a></li>
<li><a href="#-github-%E9%85%8D%E7%BD%AE">✅ GitHub 配置</a></li>
<li><a href="#-%E6%95%B0%E6%8D%AE%E5%BA%93%E5%87%86%E5%A4%87">✅ 数据库准备</a></li>
</ul>
</li>
<li><a href="#%E9%83%A8%E7%BD%B2%E8%BF%87%E7%A8%8B">部署过程</a>
<ul>
<li><a href="#-%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2-github-actions">🔄 自动部署 (GitHub Actions)</a></li>
<li><a href="#-%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2-%E5%A4%87%E7%94%A8%E6%96%B9%E6%A1%88">🔧 手动部署 (备用方案)</a></li>
</ul>
</li>
<li><a href="#%E9%83%A8%E7%BD%B2%E5%90%8E%E9%AA%8C%E8%AF%81">部署后验证</a>
<ul>
<li><a href="#-%E6%9C%8D%E5%8A%A1%E7%8A%B6%E6%80%81%E6%A3%80%E6%9F%A5">✅ 服务状态检查</a></li>
<li><a href="#-%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95">✅ 功能测试</a></li>
<li><a href="#-%E6%80%A7%E8%83%BD%E6%A3%80%E6%9F%A5">✅ 性能检查</a></li>
<li><a href="#-%E5%AE%89%E5%85%A8%E6%A3%80%E6%9F%A5">✅ 安全检查</a></li>
</ul>
</li>
<li><a href="#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E6%8E%92%E9%99%A4">常见问题排除</a>
<ul>
<li><a href="#-%E5%AE%B9%E5%99%A8%E5%90%AF%E5%8A%A8%E5%A4%B1%E8%B4%A5">🔧 容器启动失败</a></li>
<li><a href="#-%E7%BD%91%E7%BB%9C%E8%BF%9E%E6%8E%A5%E9%97%AE%E9%A2%98">🔧 网络连接问题</a></li>
<li><a href="#-%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5%E5%A4%B1%E8%B4%A5">🔧 数据库连接失败</a></li>
<li><a href="#-%E6%9D%83%E9%99%90%E9%97%AE%E9%A2%98">🔧 权限问题</a></li>
</ul>
</li>
<li><a href="#%E5%9B%9E%E6%BB%9A%E6%96%B9%E6%A1%88">回滚方案</a>
<ul>
<li><a href="#-%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A">🔄 代码回滚</a></li>
<li><a href="#-%E5%AE%B9%E5%99%A8%E5%9B%9E%E6%BB%9A">🔄 容器回滚</a></li>
<li><a href="#-%E6%95%B0%E6%8D%AE%E5%BA%93%E5%9B%9E%E6%BB%9A">🔄 数据库回滚</a></li>
</ul>
</li>
<li><a href="#%E7%9B%91%E6%8E%A7%E5%92%8C%E7%BB%B4%E6%8A%A4">监控和维护</a>
<ul>
<li><a href="#-%E6%97%A5%E5%B8%B8%E7%9B%91%E6%8E%A7">📊 日常监控</a></li>
<li><a href="#-%E5%AE%9A%E6%9C%9F%E7%BB%B4%E6%8A%A4">🧹 定期维护</a></li>
<li><a href="#-%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96">📈 性能优化</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h1 id="🚀-部署检查清单" tabindex="-1"><a class="header-anchor" href="#🚀-部署检查清单"><span>🚀 部署检查清单</span></a></h1>
<h2 id="部署前准备" tabindex="-1"><a class="header-anchor" href="#部署前准备"><span>部署前准备</span></a></h2>
<h3 id="✅-代码准备" tabindex="-1"><a class="header-anchor" href="#✅-代码准备"><span>✅ 代码准备</span></a></h3>
<ul>
<li>[ ] 代码已提交到 Git 仓库</li>
<li>[ ] 分支为 main 或 master</li>
<li>[ ] 代码通过本地测试</li>
<li>[ ] Docker 配置文件无语法错误</li>
</ul>
<h3 id="✅-服务器环境" tabindex="-1"><a class="header-anchor" href="#✅-服务器环境"><span>✅ 服务器环境</span></a></h3>
<ul>
<li>[ ] Docker 已安装 (版本 20.10+)</li>
<li>[ ] Docker Compose 已安装 (版本 2.0+)</li>
<li>[ ] 新建项目目录 <code v-pre>/opt/pros</code>，以及环境变量文件 <code v-pre>.env</code></li>
<li>[ ] SSH 服务正常运行</li>
<li>[ ] 端口 80 和 443 可用</li>
<li>[ ] 服务器磁盘空间充足 (建议 20GB+)</li>
<li>[ ] 服务器内存充足 (建议 4GB+)</li>
</ul>
<h3 id="✅-github-配置" tabindex="-1"><a class="header-anchor" href="#✅-github-配置"><span>✅ GitHub 配置</span></a></h3>
<ul>
<li>[ ] GitHub Secrets 已配置完成
<ul>
<li>[ ] <code v-pre>SERVER_HOST</code> - 服务器IP或域名</li>
<li>[ ] <code v-pre>SERVER_USER</code> - SSH用户名</li>
<li>[ ] <code v-pre>SERVER_SSH_RSA</code> - SSH私钥</li>
</ul>
</li>
<li>[ ] GitHub Actions 权限已启用</li>
<li>[ ] Container Registry 权限已配置</li>
</ul>
<h3 id="✅-数据库准备" tabindex="-1"><a class="header-anchor" href="#✅-数据库准备"><span>✅ 数据库准备</span></a></h3>
<ul>
<li>[ ] MySQL 数据库已创建</li>
<li>[ ] 数据库用户权限已配置</li>
<li>[ ] 数据库连接测试通过</li>
<li>[ ] 数据库备份已完成 (如果是更新部署)</li>
</ul>
<h2 id="部署过程" tabindex="-1"><a class="header-anchor" href="#部署过程"><span>部署过程</span></a></h2>
<h3 id="🔄-自动部署-github-actions" tabindex="-1"><a class="header-anchor" href="#🔄-自动部署-github-actions"><span>🔄 自动部署 (GitHub Actions)</span></a></h3>
<ol>
<li>[ ] 推送代码到 main/master 分支</li>
<li>[ ] 在 GitHub Actions 页面监控部署进度</li>
<li>[ ] 等待所有工作流完成</li>
</ol>
<h3 id="🔧-手动部署-备用方案" tabindex="-1"><a class="header-anchor" href="#🔧-手动部署-备用方案"><span>🔧 手动部署 (备用方案)</span></a></h3>
<ol>
<li>[ ] 登录服务器: <code v-pre>ssh user@server</code></li>
<li>[ ] 进入项目目录: <code v-pre>cd /opt/pros</code></li>
<li>[ ] 拉取最新代码: <code v-pre>git pull origin main</code></li>
<li>[ ] 运行部署脚本: <code v-pre>./deploy.sh prod deploy</code></li>
</ol>
<h2 id="部署后验证" tabindex="-1"><a class="header-anchor" href="#部署后验证"><span>部署后验证</span></a></h2>
<h3 id="✅-服务状态检查" tabindex="-1"><a class="header-anchor" href="#✅-服务状态检查"><span>✅ 服务状态检查</span></a></h3>
<ul>
<li>[ ] 所有容器运行正常: <code v-pre>docker-compose ps</code></li>
<li>[ ] 容器日志无错误: <code v-pre>docker-compose logs</code></li>
<li>[ ] 服务端口监听正常: <code v-pre>netstat -tlnp | grep :80</code></li>
</ul>
<h3 id="✅-功能测试" tabindex="-1"><a class="header-anchor" href="#✅-功能测试"><span>✅ 功能测试</span></a></h3>
<ul>
<li>[ ] 主页访问正常: <code v-pre>http://server-ip/</code></li>
<li>[ ] 博客页面正常: <code v-pre>http://server-ip/</code></li>
<li>[ ] 管理后台登录: <code v-pre>http://server-ip/r3-admin/</code></li>
<li>[ ] API接口响应: <code v-pre>http://server-ip/r3/api/health</code></li>
<li>[ ] 数据库连接正常</li>
</ul>
<h3 id="✅-性能检查" tabindex="-1"><a class="header-anchor" href="#✅-性能检查"><span>✅ 性能检查</span></a></h3>
<ul>
<li>[ ] 页面加载速度正常 (&lt; 3秒)</li>
<li>[ ] API 响应时间正常 (&lt; 1秒)</li>
<li>[ ] 系统资源使用合理
<ul>
<li>[ ] CPU 使用率 &lt; 80%</li>
<li>[ ] 内存使用率 &lt; 80%</li>
<li>[ ] 磁盘使用率 &lt; 80%</li>
</ul>
</li>
</ul>
<h3 id="✅-安全检查" tabindex="-1"><a class="header-anchor" href="#✅-安全检查"><span>✅ 安全检查</span></a></h3>
<ul>
<li>[ ] SSH 端口配置正确</li>
<li>[ ] 防火墙规则配置</li>
<li>[ ] 数据库访问限制</li>
<li>[ ] 敏感信息环境变量化</li>
</ul>
<h2 id="常见问题排除" tabindex="-1"><a class="header-anchor" href="#常见问题排除"><span>常见问题排除</span></a></h2>
<h3 id="🔧-容器启动失败" tabindex="-1"><a class="header-anchor" href="#🔧-容器启动失败"><span>🔧 容器启动失败</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 查看容器状态</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token punctuation">[</span>service-name<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启服务</span></span>
<span class="line"><span class="token function">docker-compose</span> restart <span class="token punctuation">[</span>service-name<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔧-网络连接问题" tabindex="-1"><a class="header-anchor" href="#🔧-网络连接问题"><span>🔧 网络连接问题</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 检查容器网络</span></span>
<span class="line"><span class="token function">docker</span> network <span class="token function">ls</span></span>
<span class="line"><span class="token function">docker</span> inspect <span class="token punctuation">[</span>network-name<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试服务间连接</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> nginx <span class="token function">ping</span> r3-admin-server</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔧-数据库连接失败" tabindex="-1"><a class="header-anchor" href="#🔧-数据库连接失败"><span>🔧 数据库连接失败</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 检查数据库连接</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> r3-admin-server <span class="token function">nc</span> <span class="token parameter variable">-zv</span> <span class="token punctuation">[</span>db-host<span class="token punctuation">]</span> <span class="token number">3306</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看数据库相关日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs r3-admin-server <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> db</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔧-权限问题" tabindex="-1"><a class="header-anchor" href="#🔧-权限问题"><span>🔧 权限问题</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 检查文件权限</span></span>
<span class="line"><span class="token function">ls</span> <span class="token parameter variable">-la</span> /opt/pros</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修复权限</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> <span class="token environment constant">$USER</span><span class="token builtin class-name">:</span><span class="token environment constant">$USER</span> /opt/pros</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="回滚方案" tabindex="-1"><a class="header-anchor" href="#回滚方案"><span>回滚方案</span></a></h2>
<h3 id="🔄-代码回滚" tabindex="-1"><a class="header-anchor" href="#🔄-代码回滚"><span>🔄 代码回滚</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 回滚到上一个版本</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1</span>
<span class="line">./deploy.sh prod deploy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔄-容器回滚" tabindex="-1"><a class="header-anchor" href="#🔄-容器回滚"><span>🔄 容器回滚</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 使用之前的镜像版本</span></span>
<span class="line"><span class="token function">docker</span> tag <span class="token punctuation">[</span>backup-image<span class="token punctuation">]</span> <span class="token punctuation">[</span>current-image<span class="token punctuation">]</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="🔄-数据库回滚" tabindex="-1"><a class="header-anchor" href="#🔄-数据库回滚"><span>🔄 数据库回滚</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 恢复数据库备份</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> <span class="token punctuation">[</span>user<span class="token punctuation">]</span> <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>database<span class="token punctuation">]</span> <span class="token operator">&lt;</span> backup.sql</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="监控和维护" tabindex="-1"><a class="header-anchor" href="#监控和维护"><span>监控和维护</span></a></h2>
<h3 id="📊-日常监控" tabindex="-1"><a class="header-anchor" href="#📊-日常监控"><span>📊 日常监控</span></a></h3>
<ul>
<li>[ ] 定期检查服务状态</li>
<li>[ ] 监控系统资源使用</li>
<li>[ ] 查看应用日志</li>
<li>[ ] 检查磁盘空间</li>
</ul>
<h3 id="🧹-定期维护" tabindex="-1"><a class="header-anchor" href="#🧹-定期维护"><span>🧹 定期维护</span></a></h3>
<ul>
<li>[ ] 清理 Docker 镜像: <code v-pre>docker image prune -f</code></li>
<li>[ ] 更新系统包: <code v-pre>sudo apt update &amp;&amp; sudo apt upgrade</code></li>
<li>[ ] 备份重要数据</li>
<li>[ ] 更新 SSL 证书</li>
</ul>
<h3 id="📈-性能优化" tabindex="-1"><a class="header-anchor" href="#📈-性能优化"><span>📈 性能优化</span></a></h3>
<ul>
<li>[ ] 优化数据库查询</li>
<li>[ ] 配置 Nginx 缓存</li>
<li>[ ] 启用 Gzip 压缩</li>
<li>[ ] 配置 CDN (如需要)</li>
</ul>
<p><strong>注意</strong>:</p>
<ul>
<li>每次部署前请完整阅读此检查清单</li>
<li>生产环境部署建议在低峰期进行</li>
<li>重要更新前请先在测试环境验证</li>
</ul>
</div></template>


