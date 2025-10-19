<template><div><ul>
<li><a href="#%E6%9C%80%E4%BD%B3%E4%BB%A3%E7%90%86%E5%AE%9E%E8%B7%B5">最佳代理实践</a>
<ul>
<li><a href="#%E8%B4%AD%E4%B9%B0%E6%9C%BA%E5%9C%BA">购买机场</a></li>
<li><a href="#%E5%AE%89%E8%A3%85-v2raya">安装 v2raya</a></li>
<li><a href="#%E6%B7%BB%E5%8A%A0%E8%AE%A2%E9%98%85">添加订阅</a></li>
<li><a href="#%E9%85%8D%E7%BD%AE-v2raya">配置 v2raya</a></li>
<li><a href="#%E5%A4%87%E6%B3%A8">备注</a></li>
<li><a href="#%E8%A7%84%E5%88%99%E9%85%8D%E7%BD%AE">规则配置</a></li>
<li><a href="#%E6%89%8B%E6%9C%BA%E7%AB%AF">手机端</a></li>
</ul>
</li>
<li><a href="#reference">Reference</a></li>
</ul>
<h2 id="最佳代理实践" tabindex="-1"><a class="header-anchor" href="#最佳代理实践"><span>最佳代理实践</span></a></h2>
<p>最近发现 机场 + v2raya + GFWList 的全局透明代理的效果最好， 透明代理配置好以后， 就不再需要 SwitchyOmega 和 proxy-ns 其他工具, 省心方便， 下面是具体的攻略：</p>
<h3 id="购买机场" tabindex="-1"><a class="header-anchor" href="#购买机场"><span>购买机场</span></a></h3>
<p>因为我需要那种超级稳定, 支持 SSH， 同时国家节点特别多的顶级机场， 经过网友的推荐， 最后买了 <a href="https://naiixi.com/" target="_blank" rel="noopener noreferrer">Nexitally</a> 家的， 全世界节点 135 个， 延迟非常低， 很给力哇。</p>
<h3 id="安装-v2raya" tabindex="-1"><a class="header-anchor" href="#安装-v2raya"><span>安装 v2raya</span></a></h3>
<p>ArchLinux 用yay -S v2raya 命令一键安装 <a href="https://v2raya.org/docs/prologue/installation/archlinux/" target="_blank" rel="noopener noreferrer">v2raya</a></p>
<ul>
<li>用 sudo systemctl start v2raya.service 命令启动服务</li>
<li>用 sudo systemctl enable v2raya.service 命令设置为开机启动</li>
</ul>
<h3 id="添加订阅" tabindex="-1"><a class="header-anchor" href="#添加订阅"><span>添加订阅</span></a></h3>
<p>订阅机场: Nexitally 机场购买后， 等一下， 在 Ss &amp; Trojan 页面点击对应操作系统平台的 Shadowsocks 拷贝机场订阅 URL, 然后在浏览器打开 http://127.0.0.1:2017, 打开 v2raya 的配置界面， 点击导入按钮导入。</p>
<p>选择服务器： 选择 CDN.KINETICBLOOM.ORG 标签， 选择一个合适的服务器， 然后选择左上角启动按钮，开启代理。</p>
<h3 id="配置-v2raya" tabindex="-1"><a class="header-anchor" href="#配置-v2raya"><span>配置 v2raya</span></a></h3>
<p>在 http://127.0.0.1:2017 右上角点击配置， 进行如下配置：</p>
<ol>
<li>透明代理/系统代理： 启用: 分流规则与规则端口所选模式一致</li>
<li>透明代理/系统代理实现方式： redirect</li>
<li>规则端口的分流模式： RoutingA, 右边的规则配置见下面</li>
<li>防止 DNS 污染： DoH (DNS-over-HTTPS)</li>
<li>特殊模式： 关闭 （不要选择 supervisor, 这个选项会导致<a href="https://lazycat.cloud/" target="_blank" rel="noopener noreferrer">懒猫微服</a>应用打不开）</li>
<li>TCPFastOpen: 关闭</li>
<li>嗅探： Http + TLS + Quic</li>
<li>多路复用： 关闭</li>
<li>自动更新订阅： 关闭</li>
</ol>
<p>保存后，再次打开设置按钮，点击弹出对话框右上角 <strong>更新</strong> 按钮， 更新 GFWList。</p>
<h3 id="备注" tabindex="-1"><a class="header-anchor" href="#备注"><span>备注</span></a></h3>
<p>奶昔的机场不要自动更新订阅， 要不会发生错误 <code v-pre>failed to start v2ray-core: LocateServerRaw: ID or Sub exceed range</code>, 如果遇到， 就删除 <code v-pre>/etc/v2raya</code> 目录下所有文件， 然后重启 v2raya sudo systemctl restart v2raya 后， 重新配置即可。</p>
<h3 id="规则配置" tabindex="-1"><a class="header-anchor" href="#规则配置"><span>规则配置</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">default: proxy</span>
<span class="line"></span>
<span class="line">domain(domain:163.com, domain:qq.com, domain:wechat.com)->direct</span>
<span class="line">domain(domain:jd.com, domain:taobao.com)->direct</span>
<span class="line">domain(domain:heiyu.space, domain:lazycat.cloud)->direct</span>
<span class="line"></span>
<span class="line">domain(domain:unsplash.com)->proxy</span>
<span class="line"></span>
<span class="line">domain(geosite:google-scholar)->proxy</span>
<span class="line">domain(geosite:category-scholar-!cn, geosite:category-scholar-cn)->direct</span>
<span class="line">domain(geosite:geolocation-!cn, geosite:google)->proxy</span>
<span class="line">domain(geosite:cn)->direct</span>
<span class="line">ip(geoip:hk,geoip:mo)->proxy</span>
<span class="line">ip(geoip:private, geoip:cn)->direct</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一段是默认走代理，第二段设置一些直连的域名（比如微信、QQ、网易云、京东、淘宝、懒猫微服），第三段设置一些国外走代理的网站，最后一段设置一下大陆走直连的域名。</p>
<p>这样设置不影响微信客户端启动， 比 GFWList 方便， 因为防火墙列表不一定全面， 很多新认证的网站范围上不了。</p>
<h3 id="手机端" tabindex="-1"><a class="header-anchor" href="#手机端"><span>手机端</span></a></h3>
<p>手机端我用 v2rayNG 客户端， 直接在 Nexitally Ss &amp; Trojan 页面找到 Android 的 Shadowsocks 的订阅地址， 导入到 v2rayNG 即可。</p>
<h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>
<ul>
<li><a href="https://manateelazycat.github.io/2025/08/31/best-proxy/" target="_blank" rel="noopener noreferrer">最佳代理实践</a></li>
</ul>
</div></template>


