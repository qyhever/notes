<template><div><p>docker-compose.yml 示例</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">mysql</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span></span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"3306:3306"</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /opt/mysql<span class="token punctuation">:</span>/var/lib/mysql</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"6379:6379"</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /opt/redis<span class="token punctuation">:</span>/data</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">kafka</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> wurstmeister/kafka<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> </span>
<span class="line">      <span class="token punctuation">-</span> zookeeper</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"9092:9092"</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">KAFKA_ADVERTISED_LISTENERS</span><span class="token punctuation">:</span> INSIDE<span class="token punctuation">:</span>//kafka<span class="token punctuation">:</span><span class="token number">9093</span><span class="token punctuation">,</span>OUTSIDE<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">9092</span></span>
<span class="line">      <span class="token key atrule">KAFKA_LISTENER_SECURITY_PROTOCOL_MAP</span><span class="token punctuation">:</span> INSIDE<span class="token punctuation">:</span>PLAINTEXT<span class="token punctuation">,</span>OUTSIDE<span class="token punctuation">:</span>PLAINTEXT</span>
<span class="line">      <span class="token key atrule">KAFKA_LISTENERS</span><span class="token punctuation">:</span> INSIDE<span class="token punctuation">:</span>//0.0.0.0<span class="token punctuation">:</span><span class="token number">9093</span><span class="token punctuation">,</span>OUTSIDE<span class="token punctuation">:</span>//0.0.0.0<span class="token punctuation">:</span><span class="token number">9092</span></span>
<span class="line">      <span class="token key atrule">KAFKA_INTER_BROKER_LISTENER_NAME</span><span class="token punctuation">:</span> INSIDE</span>
<span class="line">      <span class="token key atrule">KAFKA_ZOOKEEPER_CONNECT</span><span class="token punctuation">:</span> zookeeper<span class="token punctuation">:</span><span class="token number">2181</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock</span>
<span class="line">  <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> wurstmeister/zookeeper<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"2181:2181"</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.elastic.co/elasticsearch/elasticsearch<span class="token punctuation">:</span>7.15.0</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> discovery.type=single<span class="token punctuation">-</span>node</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"9200:9200"</span></span>
<span class="line">  <span class="token key atrule">nacos</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nacos/nacos<span class="token punctuation">-</span>server</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> MODE=standalone</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"8848:8848"</span></span>
<span class="line">  <span class="token key atrule">system-biz</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> system<span class="token punctuation">-</span>biz<span class="token punctuation">:</span>1.0.1</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> mysql</span>
<span class="line">      <span class="token punctuation">-</span> redis</span>
<span class="line">      <span class="token punctuation">-</span> nacos</span>
<span class="line">      <span class="token punctuation">-</span> elasticsearch</span>
<span class="line">      <span class="token punctuation">-</span> seaweedfs_master</span>
<span class="line">      <span class="token punctuation">-</span> kafka</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> TZ=Asia/Shanghai</span>
<span class="line">      <span class="token punctuation">-</span> NACOS=<span class="token punctuation">-</span>Dspring.cloud.nacos.config.server<span class="token punctuation">-</span>addr=nacos<span class="token punctuation">:</span>8848 <span class="token punctuation">-</span>Dspring.cloud.nacos.discovery.server<span class="token punctuation">-</span>addr=nacos<span class="token punctuation">:</span>8848 <span class="token punctuation">-</span>Dspring.cloud.nacos.config.password=nacos <span class="token punctuation">-</span>Dspring.cloud.nacos.config.username=nacos <span class="token punctuation">-</span>Dspring.cloud.nacos.discovery.username=nacos <span class="token punctuation">-</span>Dspring.cloud.nacos.discovery.password=nacos</span>
<span class="line">      <span class="token punctuation">-</span> JAVA_OPTS=<span class="token punctuation">-</span>Dserver.port=8080 <span class="token punctuation">-</span>Xms1G <span class="token punctuation">-</span>Xmx1G <span class="token punctuation">-</span>Dspring.profiles.active=dev    <span class="token punctuation">-</span>Duser.timezone=Asia/Shanghai</span>
<span class="line">      <span class="token punctuation">-</span> AGENT=<span class="token punctuation">-</span>javaagent<span class="token punctuation">:</span>skywalking<span class="token punctuation">-</span>agent/skywalking<span class="token punctuation">-</span>agent.jar <span class="token punctuation">-</span>Dskywalking.agent.service_name=system<span class="token punctuation">-</span>biz</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">"10025:8080"</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /opt/docker/system<span class="token punctuation">-</span>biz<span class="token punctuation">:</span>/app/logs</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


