<template><div><ul>
<li><a href="#%E4%B8%80%E6%A0%B8%E5%BF%83%E5%8C%BA%E5%88%AB%E6%80%BB%E7%BB%93"><strong>一、核心区别总结</strong></a></li>
<li><a href="#%E4%BA%8C%E8%AF%AD%E6%B3%95%E8%AF%A6%E8%A7%A3"><strong>二、语法详解</strong></a>
<ul>
<li><a href="#1-%E5%86%85%E8%BF%9E%E6%8E%A5inner-join"><strong>1. 内连接（INNER JOIN）</strong></a></li>
<li><a href="#2-%E5%B7%A6%E5%A4%96%E8%BF%9E%E6%8E%A5left-join"><strong>2. 左外连接（LEFT JOIN）</strong></a></li>
<li><a href="#3-%E5%8F%B3%E5%A4%96%E8%BF%9E%E6%8E%A5right-join"><strong>3. 右外连接（RIGHT JOIN）</strong></a></li>
<li><a href="#4-%E5%85%A8%E5%A4%96%E8%BF%9E%E6%8E%A5full-outer-joinmysql-%E4%B8%8D%E7%9B%B4%E6%8E%A5%E6%94%AF%E6%8C%81"><strong>4. 全外连接（FULL OUTER JOIN，MySQL 不直接支持）</strong></a></li>
</ul>
</li>
<li><a href="#%E4%B8%89%E7%A4%BA%E4%BE%8B%E8%AF%B4%E6%98%8E%E9%99%84%E8%A1%A8%E7%BB%93%E6%9E%84"><strong>三、示例说明（附表结构）</strong></a>
<ul>
<li><a href="#%E7%A4%BA%E4%BE%8B-1%E5%86%85%E8%BF%9E%E6%8E%A5inner-join"><strong>示例 1：内连接（INNER JOIN）</strong></a></li>
<li><a href="#%E7%A4%BA%E4%BE%8B-2%E5%B7%A6%E5%A4%96%E8%BF%9E%E6%8E%A5left-join"><strong>示例 2：左外连接（LEFT JOIN）</strong></a></li>
<li><a href="#%E7%A4%BA%E4%BE%8B-3%E5%8F%B3%E5%A4%96%E8%BF%9E%E6%8E%A5right-join"><strong>示例 3：右外连接（RIGHT JOIN）</strong></a></li>
<li><a href="#%E7%A4%BA%E4%BE%8B-4%E5%85%A8%E5%A4%96%E8%BF%9E%E6%8E%A5full-outer-join%E6%A8%A1%E6%8B%9F"><strong>示例 4：全外连接（FULL OUTER JOIN，模拟）</strong></a></li>
</ul>
</li>
<li><a href="#%E5%9B%9B%E5%85%B3%E9%94%AE%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9"><strong>四、关键注意事项</strong></a></li>
<li><a href="#%E6%80%BB%E7%BB%93"><strong>总结</strong></a></li>
</ul>
<p>在 MySQL 中，连接查询（JOIN）是组合两个或多个表数据的核心操作，主要分为<strong>内连接（INNER JOIN）<strong>和</strong>外连接（OUTER JOIN）<strong>两大类。外连接又分为</strong>左外连接（LEFT JOIN）</strong>、<strong>右外连接（RIGHT JOIN）</strong>，而 MySQL 不直接支持<strong>全外连接（FULL OUTER JOIN）</strong>（但可通过 <code v-pre>LEFT JOIN</code> + <code v-pre>RIGHT JOIN</code> 模拟）。以下是它们的区别、使用场景和语法详解：</p>
<h3 id="一、核心区别总结" tabindex="-1"><a class="header-anchor" href="#一、核心区别总结"><span><strong>一、核心区别总结</strong></span></a></h3>
<table>
<thead>
<tr>
<th>连接类型</th>
<th>别名</th>
<th>结果特点</th>
<th>适用场景</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>内连接</strong></td>
<td>INNER JOIN/JOIN</td>
<td>仅返回两表<strong>满足连接条件</strong>的行（交集）</td>
<td>需要两表数据严格匹配时（如查询&quot;有订单的用户&quot;）</td>
</tr>
<tr>
<td><strong>左外连接</strong></td>
<td>LEFT JOIN / LEFT OUTER JOIN</td>
<td>返回左表<strong>所有行</strong> + 右表<strong>满足条件</strong>的行（左表无匹配时，右表字段为 <code v-pre>NULL</code>）</td>
<td>需要保留左表全部数据（如查询&quot;所有用户及其订单，包括无订单用户&quot;）</td>
</tr>
<tr>
<td><strong>右外连接</strong></td>
<td>RIGHT JOIN / RIGHT OUTER JOIN</td>
<td>返回右表<strong>所有行</strong> + 左表<strong>满足条件</strong>的行（右表无匹配时，左表字段为 <code v-pre>NULL</code>）</td>
<td>需要保留右表全部数据（如查询&quot;所有订单及其用户，包括无用户的异常订单&quot;）</td>
</tr>
<tr>
<td><strong>全外连接</strong></td>
<td>FULL OUTER JOIN</td>
<td>返回两表<strong>所有行</strong>（左表无匹配时右表字段为 <code v-pre>NULL</code>，右表无匹配时左表字段为 <code v-pre>NULL</code>）</td>
<td>MySQL 不直接支持，需用 <code v-pre>LEFT JOIN</code> + <code v-pre>RIGHT JOIN</code> 模拟（去重）</td>
</tr>
</tbody>
</table>
<h3 id="二、语法详解" tabindex="-1"><a class="header-anchor" href="#二、语法详解"><span><strong>二、语法详解</strong></span></a></h3>
<h4 id="_1-内连接-inner-join" tabindex="-1"><a class="header-anchor" href="#_1-内连接-inner-join"><span><strong>1. 内连接（INNER JOIN）</strong></span></a></h4>
<p><strong>语法</strong>：</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> 列名</span>
<span class="line"><span class="token keyword">FROM</span> 表<span class="token number">1</span></span>
<span class="line"><span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> </span>
<span class="line">  <span class="token keyword">ON</span> 表<span class="token number">1.</span>列 <span class="token operator">=</span> 表<span class="token number">2.</span>列  <span class="token comment">-- 连接条件（必须）</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token keyword">WHERE</span> 过滤条件<span class="token punctuation">]</span><span class="token punctuation">;</span>     <span class="token comment">-- 可选：进一步过滤结果</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明</strong>：</p>
<ul>
<li>仅返回两表中满足 <code v-pre>ON</code> 条件的行（无匹配的行会被丢弃）。</li>
<li><code v-pre>INNER</code> 关键字可省略（直接写 <code v-pre>JOIN</code>）。</li>
</ul>
<h4 id="_2-左外连接-left-join" tabindex="-1"><a class="header-anchor" href="#_2-左外连接-left-join"><span><strong>2. 左外连接（LEFT JOIN）</strong></span></a></h4>
<p><strong>语法</strong>：</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> 列名</span>
<span class="line"><span class="token keyword">FROM</span> 表<span class="token number">1</span></span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> </span>
<span class="line">  <span class="token keyword">ON</span> 表<span class="token number">1.</span>列 <span class="token operator">=</span> 表<span class="token number">2.</span>列  <span class="token comment">-- 连接条件（必须）</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token keyword">WHERE</span> 过滤条件<span class="token punctuation">]</span><span class="token punctuation">;</span>     <span class="token comment">-- 可选：进一步过滤结果</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明</strong>：</p>
<ul>
<li>返回左表（<code v-pre>表1</code>）的<strong>所有行</strong>，无论右表是否有匹配。</li>
<li>若右表无匹配行，右表字段值显示为 <code v-pre>NULL</code>（如 <code v-pre>表2.列</code> 为 <code v-pre>NULL</code>）。</li>
</ul>
<h4 id="_3-右外连接-right-join" tabindex="-1"><a class="header-anchor" href="#_3-右外连接-right-join"><span><strong>3. 右外连接（RIGHT JOIN）</strong></span></a></h4>
<p><strong>语法</strong>：</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> 列名</span>
<span class="line"><span class="token keyword">FROM</span> 表<span class="token number">1</span></span>
<span class="line"><span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> </span>
<span class="line">  <span class="token keyword">ON</span> 表<span class="token number">1.</span>列 <span class="token operator">=</span> 表<span class="token number">2.</span>列  <span class="token comment">-- 连接条件（必须）</span></span>
<span class="line"><span class="token punctuation">[</span><span class="token keyword">WHERE</span> 过滤条件<span class="token punctuation">]</span><span class="token punctuation">;</span>     <span class="token comment">-- 可选：进一步过滤结果</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明</strong>：</p>
<ul>
<li>返回右表（<code v-pre>表2</code>）的<strong>所有行</strong>，无论左表是否有匹配。</li>
<li>若左表无匹配行，左表字段值显示为 <code v-pre>NULL</code>（如 <code v-pre>表1.列</code> 为 <code v-pre>NULL</code>）。</li>
</ul>
<h4 id="_4-全外连接-full-outer-join-mysql-不直接支持" tabindex="-1"><a class="header-anchor" href="#_4-全外连接-full-outer-join-mysql-不直接支持"><span><strong>4. 全外连接（FULL OUTER JOIN，MySQL 不直接支持）</strong></span></a></h4>
<p><strong>模拟语法</strong>（通过 <code v-pre>LEFT JOIN</code> + <code v-pre>RIGHT JOIN</code> 去重）：</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> 列名</span>
<span class="line"><span class="token keyword">FROM</span> 表<span class="token number">1</span></span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> <span class="token keyword">ON</span> 表<span class="token number">1.</span>列 <span class="token operator">=</span> 表<span class="token number">2.</span>列</span>
<span class="line"><span class="token keyword">UNION</span>  <span class="token comment">-- 去重（若有重复行）</span></span>
<span class="line"><span class="token keyword">SELECT</span> 列名</span>
<span class="line"><span class="token keyword">FROM</span> 表<span class="token number">1</span></span>
<span class="line"><span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> <span class="token keyword">ON</span> 表<span class="token number">1.</span>列 <span class="token operator">=</span> 表<span class="token number">2.</span>列<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明</strong>：</p>
<ul>
<li><code v-pre>UNION</code> 会自动去重，若需保留重复行可使用 <code v-pre>UNION ALL</code>（但需确保无重复）。</li>
</ul>
<h3 id="三、示例说明-附表结构" tabindex="-1"><a class="header-anchor" href="#三、示例说明-附表结构"><span><strong>三、示例说明（附表结构）</strong></span></a></h3>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">create</span> <span class="token keyword">database</span> <span class="token identifier"><span class="token punctuation">`</span>y3<span class="token punctuation">`</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'Unique identifier'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'Name'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>age<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'Age'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">LOCK</span> <span class="token keyword">TABLES</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token keyword">WRITE</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'张三'</span><span class="token punctuation">,</span><span class="token string">'20'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">'李四'</span><span class="token punctuation">,</span><span class="token string">'25'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">'王五'</span><span class="token punctuation">,</span><span class="token string">'30'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">'赵六'</span><span class="token punctuation">,</span><span class="token string">'35'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token string">'孙七'</span><span class="token punctuation">,</span><span class="token string">'40'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">UNLOCK</span> <span class="token keyword">TABLES</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token punctuation">(</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'Unique identifier'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>userId<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'User ID'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>amount<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'Amount'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token identifier"><span class="token punctuation">`</span>status<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'Status (paid: 已支付, pending: 待支付, failed: 支付失败)'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">LOCK</span> <span class="token keyword">TABLES</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">WRITE</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token string">'paid'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">'pending'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">300</span><span class="token punctuation">,</span><span class="token string">'paid'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">400</span><span class="token punctuation">,</span><span class="token string">'pending'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">500</span><span class="token punctuation">,</span><span class="token string">'paid'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">600</span><span class="token punctuation">,</span><span class="token string">'pending'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">700</span><span class="token punctuation">,</span><span class="token string">'paid'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">800</span><span class="token punctuation">,</span><span class="token string">'failed'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">UNLOCK</span> <span class="token keyword">TABLES</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们有两张表：</p>
<ul>
<li><strong>用户表（<code v-pre>user</code>）</strong>：存储用户信息。</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">+----+------+-----+</span>
<span class="line">| id | name | age |</span>
<span class="line">+----+------+-----+</span>
<span class="line">|  1 | 张三 |  20 |</span>
<span class="line">|  2 | 李四 |  25 |</span>
<span class="line">|  3 | 王五 |  30 |</span>
<span class="line">|  4 | 赵六 |  35 |</span>
<span class="line">|  5 | 孙七 |  40 |</span>
<span class="line">+----+------+-----+</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>订单表（<code v-pre>order</code>）</strong>：存储用户订单（<code v-pre>userId</code> 关联 <code v-pre>user.id</code>）。</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">+----+--------+--------+---------+</span>
<span class="line">| id | userId | amount | status  |</span>
<span class="line">+----+--------+--------+---------+</span>
<span class="line">|  1 |      1 |    100 | paid    |</span>
<span class="line">|  2 |      1 |    200 | pending |</span>
<span class="line">|  3 |      2 |    300 | paid    |</span>
<span class="line">|  4 |      3 |    400 | pending |</span>
<span class="line">|  5 |      3 |    500 | paid    |</span>
<span class="line">|  6 |      4 |    600 | pending |</span>
<span class="line">|  7 |      4 |    700 | paid    |</span>
<span class="line">|  8 |      4 |    800 | failed  |</span>
<span class="line">+----+--------+--------+---------+</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p>
<ul>
<li>user 和 order 都是 SQL 中的关键字，虽然很多数据库允许作为表名使用，但最好还是加上 schema 前缀以避免潜在的语法解析问题。</li>
</ul>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">  u<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">  u<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>id <span class="token keyword">as</span> orderId<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>amount<span class="token punctuation">,</span> </span>
<span class="line">  o<span class="token punctuation">.</span><span class="token keyword">status</span></span>
<span class="line"><span class="token keyword">FROM</span> </span>
<span class="line">  y3<span class="token punctuation">.</span><span class="token keyword">user</span> u</span>
<span class="line"><span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> </span>
<span class="line">  y3<span class="token punctuation">.</span><span class="token keyword">order</span> o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>userId<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>为了方便，这里我们改下表名，后面都用 <code v-pre>users</code> 和 <code v-pre>orders</code></li>
</ul>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">use</span> <span class="token identifier"><span class="token punctuation">`</span>y3<span class="token punctuation">`</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">rename</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token keyword">to</span> <span class="token identifier"><span class="token punctuation">`</span>users<span class="token punctuation">`</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">rename</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">`</span>order<span class="token punctuation">`</span></span> <span class="token keyword">to</span> <span class="token identifier"><span class="token punctuation">`</span>orders<span class="token punctuation">`</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="示例-1-内连接-inner-join" tabindex="-1"><a class="header-anchor" href="#示例-1-内连接-inner-join"><span><strong>示例 1：内连接（INNER JOIN）</strong></span></a></h4>
<p><strong>需求</strong>：查询&quot;有订单的用户及其订单金额&quot;。</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">  u<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">  u<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>id <span class="token keyword">as</span> orderId<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>amount<span class="token punctuation">,</span> </span>
<span class="line">  o<span class="token punctuation">.</span><span class="token keyword">status</span></span>
<span class="line"><span class="token keyword">FROM</span> </span>
<span class="line">  users u</span>
<span class="line"><span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> </span>
<span class="line">  orders o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>userId<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果</strong>（仅返回有订单的用户）：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">+----+------+---------+--------+---------+</span>
<span class="line">| id | name | orderId | amount | status  |</span>
<span class="line">+----+------+---------+--------+---------+</span>
<span class="line">|  1 | 张三 |       1 |    100 | paid    |</span>
<span class="line">|  1 | 张三 |       2 |    200 | pending |</span>
<span class="line">|  2 | 李四 |       3 |    300 | paid    |</span>
<span class="line">|  3 | 王五 |       4 |    400 | pending |</span>
<span class="line">|  3 | 王五 |       5 |    500 | paid    |</span>
<span class="line">|  4 | 赵六 |       6 |    600 | pending |</span>
<span class="line">|  4 | 赵六 |       7 |    700 | paid    |</span>
<span class="line">|  4 | 赵六 |       8 |    800 | failed  |</span>
<span class="line">+----+------+---------+--------+---------+</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需求</strong>：统计每个用户的订单总数或总金额(只统计有订单的)，可以使用聚合函数</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">  u<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">  u<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">COUNT</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token keyword">as</span> orderCount<span class="token punctuation">,</span></span>
<span class="line">  <span class="token function">SUM</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>amount<span class="token punctuation">)</span> <span class="token keyword">as</span> totalAmount</span>
<span class="line"><span class="token keyword">FROM</span> </span>
<span class="line">  users u</span>
<span class="line"><span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> </span>
<span class="line">  orders o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>userId</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> u<span class="token punctuation">.</span>id<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果</strong>（仅返回有订单的用户）：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">+----+------+------------+-------------+</span>
<span class="line">| id | name | orderCount | totalAmount |</span>
<span class="line">+----+------+------------+-------------+</span>
<span class="line">|  1 | 张三 |          2 |         300 |</span>
<span class="line">|  2 | 李四 |          1 |         300 |</span>
<span class="line">|  3 | 王五 |          2 |         900 |</span>
<span class="line">|  4 | 赵六 |          3 |        2100 |</span>
<span class="line">+----+------+------------+-------------+</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="示例-2-左外连接-left-join" tabindex="-1"><a class="header-anchor" href="#示例-2-左外连接-left-join"><span><strong>示例 2：左外连接（LEFT JOIN）</strong></span></a></h4>
<p><strong>需求</strong>：查询&quot;所有用户及其订单金额（包括无订单的用户）&quot;。</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">  u<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">  u<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>id <span class="token keyword">as</span> orderId<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>amount<span class="token punctuation">,</span> </span>
<span class="line">  o<span class="token punctuation">.</span><span class="token keyword">status</span></span>
<span class="line"><span class="token keyword">FROM</span> </span>
<span class="line">  users u</span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> </span>
<span class="line">  orders o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>userId<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果</strong>（包含无订单的用户&quot;孙七&quot;）：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">+----+------+---------+--------+---------+</span>
<span class="line">| id | name | orderId | amount | status  |</span>
<span class="line">+----+------+---------+--------+---------+</span>
<span class="line">|  1 | 张三 |       2 |    200 | pending |</span>
<span class="line">|  1 | 张三 |       1 |    100 | paid    |</span>
<span class="line">|  2 | 李四 |       3 |    300 | paid    |</span>
<span class="line">|  3 | 王五 |       5 |    500 | paid    |</span>
<span class="line">|  3 | 王五 |       4 |    400 | pending |</span>
<span class="line">|  4 | 赵六 |       8 |    800 | failed  |</span>
<span class="line">|  4 | 赵六 |       7 |    700 | paid    |</span>
<span class="line">|  4 | 赵六 |       6 |    600 | pending |</span>
<span class="line">|  5 | 孙七 |    NULL |   NULL | NULL    |</span>
<span class="line">+----+------+---------+--------+---------+</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="示例-3-右外连接-right-join" tabindex="-1"><a class="header-anchor" href="#示例-3-右外连接-right-join"><span><strong>示例 3：右外连接（RIGHT JOIN）</strong></span></a></h4>
<p><strong>需求</strong>：查询&quot;所有订单及其用户信息（包括无用户的异常订单）&quot;。</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">  u<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">  u<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>id <span class="token keyword">as</span> orderId<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>amount<span class="token punctuation">,</span> </span>
<span class="line">  o<span class="token punctuation">.</span><span class="token keyword">status</span></span>
<span class="line"><span class="token keyword">FROM</span> </span>
<span class="line">  users u</span>
<span class="line"><span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> </span>
<span class="line">  orders o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>userId<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果</strong>（假设订单表有一条 <code v-pre>userId=88</code> 的异常订单）：<br>
<code v-pre>INSERT INTO </code>orders<code v-pre> VALUES (9,88,900,'paid');</code></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">+------+------+---------+--------+---------+</span>
<span class="line">| id   | name | orderId | amount | status  |</span>
<span class="line">+------+------+---------+--------+---------+</span>
<span class="line">|    1 | 张三 |       1 |    100 | paid    |</span>
<span class="line">|    1 | 张三 |       2 |    200 | pending |</span>
<span class="line">|    2 | 李四 |       3 |    300 | paid    |</span>
<span class="line">|    3 | 王五 |       4 |    400 | pending |</span>
<span class="line">|    3 | 王五 |       5 |    500 | paid    |</span>
<span class="line">|    4 | 赵六 |       6 |    600 | pending |</span>
<span class="line">|    4 | 赵六 |       7 |    700 | paid    |</span>
<span class="line">|    4 | 赵六 |       8 |    800 | failed  |</span>
<span class="line">| NULL | NULL |       9 |    900 | paid    |</span>
<span class="line">+------+------+---------+--------+---------+</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="示例-4-全外连接-full-outer-join-模拟" tabindex="-1"><a class="header-anchor" href="#示例-4-全外连接-full-outer-join-模拟"><span><strong>示例 4：全外连接（FULL OUTER JOIN，模拟）</strong></span></a></h4>
<p><strong>需求</strong>：查询&quot;所有用户和所有订单（包括无订单用户和无用户订单）&quot;。</p>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- 方法：LEFT JOIN + RIGHT JOIN 去重</span></span>
<span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">  u<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">  u<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>id <span class="token keyword">as</span> orderId<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>amount<span class="token punctuation">,</span> </span>
<span class="line">  o<span class="token punctuation">.</span><span class="token keyword">status</span></span>
<span class="line"><span class="token keyword">FROM</span> </span>
<span class="line">  users u</span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> </span>
<span class="line">  orders o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>userId</span>
<span class="line"><span class="token keyword">UNION</span></span>
<span class="line"><span class="token keyword">SELECT</span> </span>
<span class="line">  u<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">  u<span class="token punctuation">.</span>name<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>id <span class="token keyword">as</span> orderId<span class="token punctuation">,</span></span>
<span class="line">  o<span class="token punctuation">.</span>amount<span class="token punctuation">,</span> </span>
<span class="line">  o<span class="token punctuation">.</span><span class="token keyword">status</span></span>
<span class="line"><span class="token keyword">FROM</span> </span>
<span class="line">  users u</span>
<span class="line"><span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> </span>
<span class="line">  orders o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>userId<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果</strong>（包含所有用户和订单）假设订单表有一条 <code v-pre>userId=88</code> 的异常订单：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code><span class="line">+------+------+---------+--------+---------+</span>
<span class="line">| id   | name | orderId | amount | status  |</span>
<span class="line">+------+------+---------+--------+---------+</span>
<span class="line">|    1 | 张三 |       2 |    200 | pending |</span>
<span class="line">|    1 | 张三 |       1 |    100 | paid    |</span>
<span class="line">|    2 | 李四 |       3 |    300 | paid    |</span>
<span class="line">|    3 | 王五 |       5 |    500 | paid    |</span>
<span class="line">|    3 | 王五 |       4 |    400 | pending |</span>
<span class="line">|    4 | 赵六 |       8 |    800 | failed  |</span>
<span class="line">|    4 | 赵六 |       7 |    700 | paid    |</span>
<span class="line">|    4 | 赵六 |       6 |    600 | pending |</span>
<span class="line">|    5 | 孙七 |    NULL |   NULL | NULL    |</span>
<span class="line">| NULL | NULL |       9 |    900 | paid    |</span>
<span class="line">+------+------+---------+--------+---------+</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四、关键注意事项" tabindex="-1"><a class="header-anchor" href="#四、关键注意事项"><span><strong>四、关键注意事项</strong></span></a></h3>
<ol>
<li>
<p><strong>连接条件必须明确</strong>：<br>
若未指定 <code v-pre>ON</code> 条件，MySQL 会执行笛卡尔积（返回两表所有行的组合），可能导致数据量爆炸（如 <code v-pre>user</code> 表有 100 行，<code v-pre>order</code> 表有 1000 行，笛卡尔积会返回 10 万行）。</p>
</li>
<li>
<p><strong>区分 <code v-pre>WHERE</code> 和 <code v-pre>ON</code> 的作用</strong>：</p>
<ul>
<li><code v-pre>ON</code> 条件：在连接时过滤数据（仅影响连接过程）。</li>
<li><code v-pre>WHERE</code> 条件：在连接完成后过滤结果（影响最终输出）。<br>
示例（左外连接中过滤无订单用户）：</li>
</ul>
<div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre v-pre><code><span class="line"><span class="token comment">-- 错误：WHERE 会过滤掉右表为 NULL 的行（左外连接失效）</span></span>
<span class="line"><span class="token keyword">SELECT</span> u<span class="token punctuation">.</span>name<span class="token punctuation">,</span> o<span class="token punctuation">.</span>amount </span>
<span class="line"><span class="token keyword">FROM</span> <span class="token keyword">user</span> u </span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> <span class="token keyword">order</span> o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>user_id </span>
<span class="line"><span class="token keyword">WHERE</span> o<span class="token punctuation">.</span>amount <span class="token operator">></span> <span class="token number">100</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 正确：ON 中过滤右表，保留左表所有行</span></span>
<span class="line"><span class="token keyword">SELECT</span> u<span class="token punctuation">.</span>name<span class="token punctuation">,</span> o<span class="token punctuation">.</span>amount </span>
<span class="line"><span class="token keyword">FROM</span> <span class="token keyword">user</span> u </span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> <span class="token keyword">order</span> o <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> o<span class="token punctuation">.</span>user_id <span class="token operator">AND</span> o<span class="token punctuation">.</span>amount <span class="token operator">></span> <span class="token number">100</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>别名的使用</strong>：<br>
为表起别名（如 <code v-pre>u</code> 代表 <code v-pre>user</code>）可简化语句，避免列名冲突（如两表都有 <code v-pre>id</code> 列时，需用 <code v-pre>u.id</code> 或 <code v-pre>o.id</code> 明确指定）。</p>
</li>
<li>
<p><strong>性能优化</strong>：</p>
<ul>
<li>连接列建议添加索引（如 <code v-pre>user.id</code> 和 <code v-pre>order.user_id</code>），否则大表连接会非常慢。</li>
<li>避免对大表使用 <code v-pre>SELECT *</code>，明确指定需要的列以减少数据传输量。</li>
</ul>
</li>
</ol>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span><strong>总结</strong></span></a></h3>
<ul>
<li><strong>内连接</strong>：取两表交集（仅匹配行）。</li>
<li><strong>左外连接</strong>：取左表全部 + 右表匹配行（左表无匹配时右表字段为 <code v-pre>NULL</code>）。</li>
<li><strong>右外连接</strong>：取右表全部 + 左表匹配行（右表无匹配时左表字段为 <code v-pre>NULL</code>）。</li>
<li><strong>全外连接</strong>：MySQL 不直接支持，需用 <code v-pre>LEFT JOIN</code> + <code v-pre>RIGHT JOIN</code> 模拟。</li>
</ul>
<p>根据业务需求选择合适的连接类型：需要严格匹配时用内连接；需要保留某表全部数据时用外连接。</p>
</div></template>


