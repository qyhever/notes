<template><div><ul>
<li><a href="#%E4%B8%80%E7%BC%93%E5%AD%98%E7%A9%BF%E9%80%8Fcache-penetration"><strong>一、缓存穿透（Cache Penetration）</strong></a>
<ul>
<li><a href="#%E5%AE%9A%E4%B9%89"><strong>定义</strong></a></li>
<li><a href="#%E6%A0%B8%E5%BF%83%E7%89%B9%E5%BE%81"><strong>核心特征</strong></a></li>
<li><a href="#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF"><strong>实际场景</strong></a></li>
<li><a href="#%E7%A4%BA%E4%BE%8B"><strong>示例</strong></a></li>
</ul>
</li>
<li><a href="#%E4%BA%8C%E7%BC%93%E5%AD%98%E9%9B%AA%E5%B4%A9cache-avalanche"><strong>二、缓存雪崩（Cache Avalanche）</strong></a>
<ul>
<li><a href="#%E5%AE%9A%E4%B9%89-1"><strong>定义</strong></a></li>
<li><a href="#%E6%A0%B8%E5%BF%83%E7%89%B9%E5%BE%81-1"><strong>核心特征</strong></a></li>
<li><a href="#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF-1"><strong>实际场景</strong></a></li>
<li><a href="#%E7%A4%BA%E4%BE%8B-1"><strong>示例</strong></a></li>
</ul>
</li>
<li><a href="#%E4%B8%89%E7%BC%93%E5%AD%98%E5%87%BB%E7%A9%BFcache-breakdown"><strong>三、缓存击穿（Cache Breakdown）</strong></a>
<ul>
<li><a href="#%E5%AE%9A%E4%B9%89-2"><strong>定义</strong></a></li>
<li><a href="#%E6%A0%B8%E5%BF%83%E7%89%B9%E5%BE%81-2"><strong>核心特征</strong></a></li>
<li><a href="#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF-2"><strong>实际场景</strong></a></li>
<li><a href="#%E7%A4%BA%E4%BE%8B-2"><strong>示例</strong></a></li>
</ul>
</li>
<li><a href="#%E5%9B%9B%E4%B8%89%E8%80%85%E5%8C%BA%E5%88%AB%E5%AF%B9%E6%AF%94"><strong>四、三者区别对比</strong></a></li>
<li><a href="#%E4%BA%94%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88"><strong>五、解决方案</strong></a>
<ul>
<li><a href="#%E7%BC%93%E5%AD%98%E7%A9%BF%E9%80%8F"><strong>缓存穿透</strong></a></li>
<li><a href="#%E7%BC%93%E5%AD%98%E9%9B%AA%E5%B4%A9"><strong>缓存雪崩</strong></a></li>
<li><a href="#%E7%BC%93%E5%AD%98%E5%87%BB%E7%A9%BF"><strong>缓存击穿</strong></a></li>
</ul>
</li>
<li><a href="#%E6%80%BB%E7%BB%93"><strong>总结</strong></a></li>
<li><a href="#reference">Reference</a></li>
</ul>
<p>定义：</p>
<ol>
<li>缓存穿透：查询不存在的数据，导致请求直接打到数据库，绕过缓存。</li>
<li>缓存雪崩：大量缓存同时失效，导致请求全部涌入数据库，造成压力。</li>
<li>缓存击穿：热点键过期，大量请求同时访问该键，导致数据库压力骤增。</li>
</ol>
<p>具体的例子：</p>
<ol>
<li>缓存穿透可能是恶意攻击或错误查询。</li>
<li>缓存雪崩可能是缓存过期时间设置不合理。</li>
<li>缓存击穿可能是热点数据未及时更新。</li>
</ol>
<p>需要注意区分三者的核心差异：</p>
<ol>
<li>缓存穿透是查不到数据。</li>
<li>缓存雪崩是大量缓存失效。</li>
<li>缓存击穿是单个热点缓存失效。</li>
</ol>
<p>缓存穿透、缓存雪崩、缓存击穿是分布式系统中常见的缓存问题，三者核心差异在于<strong>触发原因</strong>和<strong>影响范围</strong>，但最终都会导致数据库压力激增甚至崩溃。以下从定义、区别、实际场景和解决方案四个维度详细说明：</p>
<h3 id="一、缓存穿透-cache-penetration" tabindex="-1"><a class="header-anchor" href="#一、缓存穿透-cache-penetration"><span><strong>一、缓存穿透（Cache Penetration）</strong></span></a></h3>
<h4 id="定义" tabindex="-1"><a class="header-anchor" href="#定义"><span><strong>定义</strong></span></a></h4>
<p>缓存穿透是指<strong>查询一个数据库中根本不存在的数据</strong>时，请求会直接绕过缓存（因为缓存中没有），最终打到数据库。由于数据库中也无该数据，每次请求都会穿透到数据库，导致无效查询。</p>
<h4 id="核心特征" tabindex="-1"><a class="header-anchor" href="#核心特征"><span><strong>核心特征</strong></span></a></h4>
<ul>
<li><strong>查询对象不存在</strong>：目标是数据库中无记录的数据（如无效ID、非法参数）。</li>
<li><strong>缓存无法拦截</strong>：缓存中没有对应键，无法过滤请求。</li>
</ul>
<h4 id="实际场景" tabindex="-1"><a class="header-anchor" href="#实际场景"><span><strong>实际场景</strong></span></a></h4>
<ul>
<li><strong>恶意攻击</strong>：攻击者构造大量不存在的ID（如<code v-pre>user_id=-1</code>）频繁请求，绕过缓存直接查数据库。</li>
<li><strong>业务逻辑漏洞</strong>：前端未校验参数合法性（如商品ID为负数），导致后端接收到无效查询。</li>
</ul>
<h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span><strong>示例</strong></span></a></h4>
<p>假设数据库中只有<code v-pre>user_id=1~1000</code>的用户数据，攻击者发送<code v-pre>user_id=9999</code>的查询请求：</p>
<ul>
<li>缓存中无<code v-pre>user:9999</code>的键 → 请求打到数据库。</li>
<li>数据库查询<code v-pre>user_id=9999</code>无结果 → 返回空。</li>
<li>后续所有<code v-pre>user_id=9999</code>的请求都会重复上述过程，数据库压力激增。</li>
</ul>
<h3 id="二、缓存雪崩-cache-avalanche" tabindex="-1"><a class="header-anchor" href="#二、缓存雪崩-cache-avalanche"><span><strong>二、缓存雪崩（Cache Avalanche）</strong></span></a></h3>
<h4 id="定义-1" tabindex="-1"><a class="header-anchor" href="#定义-1"><span><strong>定义</strong></span></a></h4>
<p>缓存雪崩是指<strong>大量缓存在同一时间集中失效</strong>（或缓存服务宕机），导致原本被缓存拦截的请求全部涌入数据库，超出数据库承受能力，引发性能崩溃。</p>
<h4 id="核心特征-1" tabindex="-1"><a class="header-anchor" href="#核心特征-1"><span><strong>核心特征</strong></span></a></h4>
<ul>
<li><strong>批量失效</strong>：大量缓存的过期时间（TTL）集中设置（如同一时间过期）。</li>
<li><strong>数据库压力骤增</strong>：缓存失效后，所有请求同时转向数据库。</li>
</ul>
<h4 id="实际场景-1" tabindex="-1"><a class="header-anchor" href="#实际场景-1"><span><strong>实际场景</strong></span></a></h4>
<ul>
<li><strong>TTL设置不合理</strong>：业务上线时为方便，将所有缓存的TTL统一设为<code v-pre>24:00:00</code>（如活动结束后统一失效）。</li>
<li><strong>缓存服务故障</strong>：Redis集群宕机，所有缓存不可用，请求直接打数据库（此时即使缓存未过期，也因服务不可用而失效）。</li>
</ul>
<h4 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1"><span><strong>示例</strong></span></a></h4>
<p>某电商大促活动中，为提升性能，所有商品详情页的缓存TTL统一设置为<code v-pre>2024-11-11 23:59:59</code>（活动结束时间）。活动结束后，大量用户仍访问商品详情页：</p>
<ul>
<li>所有商品缓存同时失效 → 请求全部涌入数据库。</li>
<li>数据库瞬间承受数万次查询（远超平时负载）→ 响应变慢甚至宕机。</li>
</ul>
<h3 id="三、缓存击穿-cache-breakdown" tabindex="-1"><a class="header-anchor" href="#三、缓存击穿-cache-breakdown"><span><strong>三、缓存击穿（Cache Breakdown）</strong></span></a></h3>
<h4 id="定义-2" tabindex="-1"><a class="header-anchor" href="#定义-2"><span><strong>定义</strong></span></a></h4>
<p>缓存击穿是指<strong>单个热点键（高频访问的缓存）突然失效</strong>，导致短时间内大量请求直接打到数据库，引发数据库压力骤增。</p>
<h4 id="核心特征-2" tabindex="-1"><a class="header-anchor" href="#核心特征-2"><span><strong>核心特征</strong></span></a></h4>
<ul>
<li><strong>单点失效</strong>：仅一个（或少数几个）高频访问的缓存键过期。</li>
<li><strong>流量集中</strong>：该键的请求量极大（如秒杀活动的热门商品）。</li>
</ul>
<h4 id="实际场景-2" tabindex="-1"><a class="header-anchor" href="#实际场景-2"><span><strong>实际场景</strong></span></a></h4>
<ul>
<li><strong>热点数据过期</strong>：秒杀活动中，某商品的缓存键（如<code v-pre>product:1001</code>）因过期失效，而该商品是千万级用户同时访问的热点。</li>
</ul>
<h4 id="示例-2" tabindex="-1"><a class="header-anchor" href="#示例-2"><span><strong>示例</strong></span></a></h4>
<p>某网红手机新品发布，商品详情页的缓存键<code v-pre>product:20240901</code>被高频访问（每秒10万次）。当该缓存过期时：</p>
<ul>
<li>所有请求瞬间失去缓存保护 → 直接查询数据库。</li>
<li>数据库无法处理每秒10万次的查询 → 响应延迟或崩溃。</li>
</ul>
<h3 id="四、三者区别对比" tabindex="-1"><a class="header-anchor" href="#四、三者区别对比"><span><strong>四、三者区别对比</strong></span></a></h3>
<table>
<thead>
<tr>
<th>维度</th>
<th>缓存穿透</th>
<th>缓存雪崩</th>
<th>缓存击穿</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>触发原因</strong></td>
<td>查询不存在的数据</td>
<td>大量缓存集中失效/服务宕机</td>
<td>单个热点缓存突然失效</td>
</tr>
<tr>
<td><strong>影响范围</strong></td>
<td>单个/少量无效请求</td>
<td>大量缓存失效，全局影响</td>
<td>单个热点键失效，局部高流量</td>
</tr>
<tr>
<td><strong>数据库压力</strong></td>
<td>持续低效查询（无效数据）</td>
<td>瞬间高并发（全量请求）</td>
<td>瞬间高并发（热点请求）</td>
</tr>
<tr>
<td><strong>典型场景</strong></td>
<td>恶意攻击、参数校验缺失</td>
<td>TTL统一设置、缓存服务故障</td>
<td>热点数据过期（如秒杀商品）</td>
</tr>
</tbody>
</table>
<h3 id="五、解决方案" tabindex="-1"><a class="header-anchor" href="#五、解决方案"><span><strong>五、解决方案</strong></span></a></h3>
<h4 id="缓存穿透" tabindex="-1"><a class="header-anchor" href="#缓存穿透"><span><strong>缓存穿透</strong></span></a></h4>
<ul>
<li><strong>布隆过滤器（Bloom Filter）</strong>：在缓存前加布隆过滤器，预存所有存在的键。查询时先检查布隆过滤器，若不存在则直接返回空（避免查数据库）。</li>
<li><strong>缓存空值</strong>：对查询结果为空的数据，在缓存中存储一个空值（如<code v-pre>null</code>），并设置短TTL（如5分钟），避免重复查询数据库。</li>
<li><strong>参数校验</strong>：前端/后端对入参合法性校验（如ID必须为正整数），拦截无效请求。</li>
</ul>
<h4 id="缓存雪崩" tabindex="-1"><a class="header-anchor" href="#缓存雪崩"><span><strong>缓存雪崩</strong></span></a></h4>
<ul>
<li><strong>分散TTL</strong>：为缓存设置随机TTL（如基础时间±10%波动），避免大量缓存同时失效。</li>
<li><strong>多级缓存</strong>：使用本地缓存（如Caffeine）+ 分布式缓存（如Redis），降低单一缓存失效的影响。</li>
<li><strong>缓存高可用</strong>：部署Redis集群（主从+哨兵）或使用云缓存服务（如阿里云Redis），避免缓存服务整体宕机。</li>
</ul>
<h4 id="缓存击穿" tabindex="-1"><a class="header-anchor" href="#缓存击穿"><span><strong>缓存击穿</strong></span></a></h4>
<ul>
<li><strong>互斥锁（分布式锁）</strong>：当缓存失效时，仅允许一个线程查询数据库并重新填充缓存（其他线程等待锁释放），避免大量线程同时查数据库。</li>
<li><strong>永不过期（逻辑过期）</strong>：缓存不设置物理TTL，而是存储逻辑过期时间（如<code v-pre>expire_time</code>字段）。查询时检查逻辑时间，若过期则异步更新缓存（旧数据仍可用）。</li>
<li><strong>热点数据预加载</strong>：提前将热点数据（如秒杀商品）的缓存TTL延长，或在活动前主动刷新缓存。</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span><strong>总结</strong></span></a></h3>
<p>三者均会导致数据库压力激增，但根源不同：</p>
<ul>
<li>穿透是<strong>查不到</strong> → 用布隆过滤器/空值缓存拦截无效请求；</li>
<li>雪崩是<strong>批量失效</strong> → 分散TTL/多级缓存；</li>
<li>击穿是<strong>单点失效</strong> → 互斥锁/逻辑过期。</li>
</ul>
<p>实际开发中需结合业务场景（如是否有恶意攻击、是否存在热点数据）选择组合方案。</p>
<h3 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h3>
<ul>
<li><a href="https://www.v2ex.com/t/1157654" target="_blank" rel="noopener noreferrer">v2ex 缓存击穿迷惑的翻译</a></li>
</ul>
</div></template>


