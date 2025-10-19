- [**一、核心区别总结**](#一核心区别总结)
- [**二、语法详解**](#二语法详解)
  - [**1. 内连接（INNER JOIN）**](#1-内连接inner-join)
  - [**2. 左外连接（LEFT JOIN）**](#2-左外连接left-join)
  - [**3. 右外连接（RIGHT JOIN）**](#3-右外连接right-join)
  - [**4. 全外连接（FULL OUTER JOIN，MySQL 不直接支持）**](#4-全外连接full-outer-joinmysql-不直接支持)
- [**三、示例说明（附表结构）**](#三示例说明附表结构)
  - [**示例 1：内连接（INNER JOIN）**](#示例-1内连接inner-join)
  - [**示例 2：左外连接（LEFT JOIN）**](#示例-2左外连接left-join)
  - [**示例 3：右外连接（RIGHT JOIN）**](#示例-3右外连接right-join)
  - [**示例 4：全外连接（FULL OUTER JOIN，模拟）**](#示例-4全外连接full-outer-join模拟)
- [**四、关键注意事项**](#四关键注意事项)
- [**总结**](#总结)


在 MySQL 中，连接查询（JOIN）是组合两个或多个表数据的核心操作，主要分为**内连接（INNER JOIN）**和**外连接（OUTER JOIN）**两大类。外连接又分为**左外连接（LEFT JOIN）**、**右外连接（RIGHT JOIN）**，而 MySQL 不直接支持**全外连接（FULL OUTER JOIN）**（但可通过 `LEFT JOIN` + `RIGHT JOIN` 模拟）。以下是它们的区别、使用场景和语法详解：


### **一、核心区别总结**
| 连接类型  | 别名 | 结果特点 | 适用场景 |
| -----| ------| ------| ------|
| **内连接**     | INNER JOIN/JOIN         | 仅返回两表**满足连接条件**的行（交集）                                   | 需要两表数据严格匹配时（如查询"有订单的用户"）                             |
| **左外连接**   | LEFT JOIN / LEFT OUTER JOIN | 返回左表**所有行** + 右表**满足条件**的行（左表无匹配时，右表字段为 `NULL`） | 需要保留左表全部数据（如查询"所有用户及其订单，包括无订单用户"）           |
| **右外连接**   | RIGHT JOIN / RIGHT OUTER JOIN | 返回右表**所有行** + 左表**满足条件**的行（右表无匹配时，左表字段为 `NULL`） | 需要保留右表全部数据（如查询"所有订单及其用户，包括无用户的异常订单"）     |
| **全外连接**   | FULL OUTER JOIN    | 返回两表**所有行**（左表无匹配时右表字段为 `NULL`，右表无匹配时左表字段为 `NULL`） | MySQL 不直接支持，需用 `LEFT JOIN` + `RIGHT JOIN` 模拟（去重）             |


### **二、语法详解**
#### **1. 内连接（INNER JOIN）**
**语法**：  
```sql
SELECT 列名
FROM 表1
INNER JOIN 表2 
  ON 表1.列 = 表2.列  -- 连接条件（必须）
[WHERE 过滤条件];     -- 可选：进一步过滤结果
```

**说明**：  
- 仅返回两表中满足 `ON` 条件的行（无匹配的行会被丢弃）。  
- `INNER` 关键字可省略（直接写 `JOIN`）。  


#### **2. 左外连接（LEFT JOIN）**
**语法**：  
```sql
SELECT 列名
FROM 表1
LEFT JOIN 表2 
  ON 表1.列 = 表2.列  -- 连接条件（必须）
[WHERE 过滤条件];     -- 可选：进一步过滤结果
```

**说明**：  
- 返回左表（`表1`）的**所有行**，无论右表是否有匹配。  
- 若右表无匹配行，右表字段值显示为 `NULL`（如 `表2.列` 为 `NULL`）。  


#### **3. 右外连接（RIGHT JOIN）**
**语法**：  
```sql
SELECT 列名
FROM 表1
RIGHT JOIN 表2 
  ON 表1.列 = 表2.列  -- 连接条件（必须）
[WHERE 过滤条件];     -- 可选：进一步过滤结果
```

**说明**：  
- 返回右表（`表2`）的**所有行**，无论左表是否有匹配。  
- 若左表无匹配行，左表字段值显示为 `NULL`（如 `表1.列` 为 `NULL`）。  


#### **4. 全外连接（FULL OUTER JOIN，MySQL 不直接支持）**
**模拟语法**（通过 `LEFT JOIN` + `RIGHT JOIN` 去重）：  
```sql
SELECT 列名
FROM 表1
LEFT JOIN 表2 ON 表1.列 = 表2.列
UNION  -- 去重（若有重复行）
SELECT 列名
FROM 表1
RIGHT JOIN 表2 ON 表1.列 = 表2.列;
```

**说明**：  
- `UNION` 会自动去重，若需保留重复行可使用 `UNION ALL`（但需确保无重复）。  


### **三、示例说明（附表结构）**
```sql
create database `y3`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `name` varchar(50) NOT NULL COMMENT 'Name',
  `age` int NOT NULL COMMENT 'Age',
  PRIMARY KEY (`id`)
);

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES (1,'张三','20');
INSERT INTO `user` VALUES (2,'李四','25');
INSERT INTO `user` VALUES (3,'王五','30');
INSERT INTO `user` VALUES (4,'赵六','35');
INSERT INTO `user` VALUES (5,'孙七','40');

UNLOCK TABLES;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `userId` int NOT NULL COMMENT 'User ID',
  `amount` int NOT NULL COMMENT 'Amount',
  `status` varchar(50) NOT NULL COMMENT 'Status (paid: 已支付, pending: 待支付, failed: 支付失败)',
  PRIMARY KEY (`id`)
);

LOCK TABLES `order` WRITE;
INSERT INTO `order` VALUES (1,1,100,'paid');
INSERT INTO `order` VALUES (2,1,200,'pending');
INSERT INTO `order` VALUES (3,2,300,'paid');
INSERT INTO `order` VALUES (4,3,400,'pending');
INSERT INTO `order` VALUES (5,3,500,'paid');
INSERT INTO `order` VALUES (6,4,600,'pending');
INSERT INTO `order` VALUES (7,4,700,'paid');
INSERT INTO `order` VALUES (8,4,800,'failed');
UNLOCK TABLES;

```
假设我们有两张表：  
- **用户表（`user`）**：存储用户信息。  
```
+----+------+-----+
| id | name | age |
+----+------+-----+
|  1 | 张三 |  20 |
|  2 | 李四 |  25 |
|  3 | 王五 |  30 |
|  4 | 赵六 |  35 |
|  5 | 孙七 |  40 |
+----+------+-----+
```

- **订单表（`order`）**：存储用户订单（`userId` 关联 `user.id`）。  
```
+----+--------+--------+---------+
| id | userId | amount | status  |
+----+--------+--------+---------+
|  1 |      1 |    100 | paid    |
|  2 |      1 |    200 | pending |
|  3 |      2 |    300 | paid    |
|  4 |      3 |    400 | pending |
|  5 |      3 |    500 | paid    |
|  6 |      4 |    600 | pending |
|  7 |      4 |    700 | paid    |
|  8 |      4 |    800 | failed  |
+----+--------+--------+---------+
```

注意：
- user 和 order 都是 SQL 中的关键字，虽然很多数据库允许作为表名使用，但最好还是加上 schema 前缀以避免潜在的语法解析问题。

```sql
SELECT 
  u.id,
  u.name,
  o.id as orderId,
  o.amount, 
  o.status
FROM 
  y3.user u
INNER JOIN 
  y3.order o ON u.id = o.userId;
```

- 为了方便，这里我们改下表名，后面都用 `users` 和 `orders`

```sql
use `y3`;
rename table `user` to `users`;
rename table `order` to `orders`;
```

#### **示例 1：内连接（INNER JOIN）**
**需求**：查询"有订单的用户及其订单金额"。  

```sql
SELECT 
  u.id,
  u.name,
  o.id as orderId,
  o.amount, 
  o.status
FROM 
  users u
INNER JOIN 
  orders o ON u.id = o.userId;
```

**结果**（仅返回有订单的用户）：  

```
+----+------+---------+--------+---------+
| id | name | orderId | amount | status  |
+----+------+---------+--------+---------+
|  1 | 张三 |       1 |    100 | paid    |
|  1 | 张三 |       2 |    200 | pending |
|  2 | 李四 |       3 |    300 | paid    |
|  3 | 王五 |       4 |    400 | pending |
|  3 | 王五 |       5 |    500 | paid    |
|  4 | 赵六 |       6 |    600 | pending |
|  4 | 赵六 |       7 |    700 | paid    |
|  4 | 赵六 |       8 |    800 | failed  |
+----+------+---------+--------+---------+
```

**需求**：统计每个用户的订单总数或总金额(只统计有订单的)，可以使用聚合函数

```sql
SELECT 
  u.id,
  u.name,
  COUNT(o.id) as orderCount,
  SUM(o.amount) as totalAmount
FROM 
  users u
INNER JOIN 
  orders o ON u.id = o.userId
GROUP BY u.id;
```

**结果**（仅返回有订单的用户）：  

```
+----+------+------------+-------------+
| id | name | orderCount | totalAmount |
+----+------+------------+-------------+
|  1 | 张三 |          2 |         300 |
|  2 | 李四 |          1 |         300 |
|  3 | 王五 |          2 |         900 |
|  4 | 赵六 |          3 |        2100 |
+----+------+------------+-------------+
```


#### **示例 2：左外连接（LEFT JOIN）**
**需求**：查询"所有用户及其订单金额（包括无订单的用户）"。  

```sql
SELECT 
  u.id,
  u.name,
  o.id as orderId,
  o.amount, 
  o.status
FROM 
  users u
LEFT JOIN 
  orders o ON u.id = o.userId;
```

**结果**（包含无订单的用户"孙七"）：  

```
+----+------+---------+--------+---------+
| id | name | orderId | amount | status  |
+----+------+---------+--------+---------+
|  1 | 张三 |       2 |    200 | pending |
|  1 | 张三 |       1 |    100 | paid    |
|  2 | 李四 |       3 |    300 | paid    |
|  3 | 王五 |       5 |    500 | paid    |
|  3 | 王五 |       4 |    400 | pending |
|  4 | 赵六 |       8 |    800 | failed  |
|  4 | 赵六 |       7 |    700 | paid    |
|  4 | 赵六 |       6 |    600 | pending |
|  5 | 孙七 |    NULL |   NULL | NULL    |
+----+------+---------+--------+---------+
```


#### **示例 3：右外连接（RIGHT JOIN）**
**需求**：查询"所有订单及其用户信息（包括无用户的异常订单）"。  

```sql
SELECT 
  u.id,
  u.name,
  o.id as orderId,
  o.amount, 
  o.status
FROM 
  users u
RIGHT JOIN 
  orders o ON u.id = o.userId;
```

**结果**（假设订单表有一条 `userId=88` 的异常订单）：  
`INSERT INTO `orders` VALUES (9,88,900,'paid');`

```
+------+------+---------+--------+---------+
| id   | name | orderId | amount | status  |
+------+------+---------+--------+---------+
|    1 | 张三 |       1 |    100 | paid    |
|    1 | 张三 |       2 |    200 | pending |
|    2 | 李四 |       3 |    300 | paid    |
|    3 | 王五 |       4 |    400 | pending |
|    3 | 王五 |       5 |    500 | paid    |
|    4 | 赵六 |       6 |    600 | pending |
|    4 | 赵六 |       7 |    700 | paid    |
|    4 | 赵六 |       8 |    800 | failed  |
| NULL | NULL |       9 |    900 | paid    |
+------+------+---------+--------+---------+
```


#### **示例 4：全外连接（FULL OUTER JOIN，模拟）**
**需求**：查询"所有用户和所有订单（包括无订单用户和无用户订单）"。  

```sql
-- 方法：LEFT JOIN + RIGHT JOIN 去重
SELECT 
  u.id,
  u.name,
  o.id as orderId,
  o.amount, 
  o.status
FROM 
  users u
LEFT JOIN 
  orders o ON u.id = o.userId
UNION
SELECT 
  u.id,
  u.name,
  o.id as orderId,
  o.amount, 
  o.status
FROM 
  users u
RIGHT JOIN 
  orders o ON u.id = o.userId;
```

**结果**（包含所有用户和订单）假设订单表有一条 `userId=88` 的异常订单：  

```
+------+------+---------+--------+---------+
| id   | name | orderId | amount | status  |
+------+------+---------+--------+---------+
|    1 | 张三 |       2 |    200 | pending |
|    1 | 张三 |       1 |    100 | paid    |
|    2 | 李四 |       3 |    300 | paid    |
|    3 | 王五 |       5 |    500 | paid    |
|    3 | 王五 |       4 |    400 | pending |
|    4 | 赵六 |       8 |    800 | failed  |
|    4 | 赵六 |       7 |    700 | paid    |
|    4 | 赵六 |       6 |    600 | pending |
|    5 | 孙七 |    NULL |   NULL | NULL    |
| NULL | NULL |       9 |    900 | paid    |
+------+------+---------+--------+---------+
```


### **四、关键注意事项**
1. **连接条件必须明确**：  
   若未指定 `ON` 条件，MySQL 会执行笛卡尔积（返回两表所有行的组合），可能导致数据量爆炸（如 `user` 表有 100 行，`order` 表有 1000 行，笛卡尔积会返回 10 万行）。

2. **区分 `WHERE` 和 `ON` 的作用**：  
   - `ON` 条件：在连接时过滤数据（仅影响连接过程）。  
   - `WHERE` 条件：在连接完成后过滤结果（影响最终输出）。  
   示例（左外连接中过滤无订单用户）：  
   ```sql
   -- 错误：WHERE 会过滤掉右表为 NULL 的行（左外连接失效）
   SELECT u.name, o.amount 
   FROM user u 
   LEFT JOIN order o ON u.id = o.user_id 
   WHERE o.amount > 100;

   -- 正确：ON 中过滤右表，保留左表所有行
   SELECT u.name, o.amount 
   FROM user u 
   LEFT JOIN order o ON u.id = o.user_id AND o.amount > 100;
   ```

3. **别名的使用**：  
   为表起别名（如 `u` 代表 `user`）可简化语句，避免列名冲突（如两表都有 `id` 列时，需用 `u.id` 或 `o.id` 明确指定）。

4. **性能优化**：  
   - 连接列建议添加索引（如 `user.id` 和 `order.user_id`），否则大表连接会非常慢。  
   - 避免对大表使用 `SELECT *`，明确指定需要的列以减少数据传输量。  


### **总结**
- **内连接**：取两表交集（仅匹配行）。  
- **左外连接**：取左表全部 + 右表匹配行（左表无匹配时右表字段为 `NULL`）。  
- **右外连接**：取右表全部 + 左表匹配行（右表无匹配时左表字段为 `NULL`）。  
- **全外连接**：MySQL 不直接支持，需用 `LEFT JOIN` + `RIGHT JOIN` 模拟。  

根据业务需求选择合适的连接类型：需要严格匹配时用内连接；需要保留某表全部数据时用外连接。
