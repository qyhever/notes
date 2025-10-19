
docker-compose.yml 示例
```yml
version: '3'

services:
  mysql:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    ports:
      - "3306:3306"
    volumes:
      - /opt/mysql:/var/lib/mysql

  redis:
    image: redis:latest
    ports:
      - "6379:6379"
    volumes:
      - /opt/redis:/data

  kafka:
    image: wurstmeister/kafka:latest
    depends_on: 
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_LISTENERS: INSIDE://kafka:9093,OUTSIDE://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INSIDE:PLAINTEXT,OUTSIDE:PLAINTEXT
      KAFKA_LISTENERS: INSIDE://0.0.0.0:9093,OUTSIDE://0.0.0.0:9092
      KAFKA_INTER_BROKER_LISTENER_NAME: INSIDE
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
  zookeeper:
    image: wurstmeister/zookeeper:latest
    ports:
      - "2181:2181"

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"
  nacos:
    image: nacos/nacos-server
    environment:
      - MODE=standalone
    ports:
      - "8848:8848"
  system-biz:
    image: system-biz:1.0.1
    depends_on:
      - mysql
      - redis
      - nacos
      - elasticsearch
      - seaweedfs_master
      - kafka
    environment:
      - TZ=Asia/Shanghai
      - NACOS=-Dspring.cloud.nacos.config.server-addr=nacos:8848 -Dspring.cloud.nacos.discovery.server-addr=nacos:8848 -Dspring.cloud.nacos.config.password=nacos -Dspring.cloud.nacos.config.username=nacos -Dspring.cloud.nacos.discovery.username=nacos -Dspring.cloud.nacos.discovery.password=nacos
      - JAVA_OPTS=-Dserver.port=8080 -Xms1G -Xmx1G -Dspring.profiles.active=dev    -Duser.timezone=Asia/Shanghai
      - AGENT=-javaagent:skywalking-agent/skywalking-agent.jar -Dskywalking.agent.service_name=system-biz
    ports:
      - "10025:8080"
    volumes:
      - /opt/docker/system-biz:/app/logs
```
