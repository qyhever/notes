# select * from table where id in (上千id) 超时了，in的奇特优化方法

有时候sql的优化不一定非得依靠数据库去解决，毕竟传统的数据库是用来管理数据的，性能是有限的，如果能从程序上优化的话是最好的选择。

关于这条sql的优化方法有很多种，下面是简单的几种

### 方法一：采用多线程，把id分成多段去执行，然后再组装。
select * from table where id in (1-100)；
select * from table where id in (101-200)；
以此类推... ...

### 方法二：完全采用数据库，使用临时表
-- 1. 创建临时表
create  temporary table tmp_ids (id BIGINT PRIMARY KEY);

-- 2. 批量插入你要查的 ID
INSERT INTO tmp_ids (id) VALUES (1), (2), ..., (1000);

-- 3. 使用 JOIN 查询
SELECT t.* FROM table t JOIN tmp_ids tmp ON t.id = tmp.id;
temporary 是MySQL的语法，session会话级别，session关闭后临时表自动消失，且是session隔离，相同表明不同session之间不冲突，用着也超级方便。

具体办法就是在查询之前创建临时表，然后把要查询的id放入临时表，在进行join查询。这么做的好处就是可以直接利用索引树进行hash查询，类似于for 循环id。

for (int id :idList){
  select t.* FROM table t where t.id=id
}
这种临时表的方式性能会快上很多，优化起来也很简单。

### 由此衍生出新问题：会产生笛卡尔积吗，什么情况下会产生笛卡尔积？
如果你能想到这里，说明你已经具备多了很深的开发经验了。

这里是不会产生笛卡尔积。首先要明白笛卡尔积指的是数据检索结果，是两张表的所有数据行都可能会组合一次。

通俗来说就是：

A 表的每一行，和 B 表的每一行都配对一次，没有任何过滤或条件。

按着这个意思理解，在进行关联查询的时候就必须要有有效的on条件查询，如下面这两条sql都是是无效的on条件，就会产生笛卡尔积。

SELECT * FROM A, B;
SELECT * FROM A JOIN B ON 1 = 1;
还有一种情况可能是类笛卡尔积，看上去像笛卡尔积，但并不是真正的笛卡尔积，如下面的这条sql，其实已经是有条件了，但是因为可能是匹配的结果是一对多，这个是搜索结果暴增。

SELECT * FROM orders o JOIN customers c ON o.city = c.city;
### 最后一个问题：索引和笛卡尔积的关系
索引和笛卡尔积没关系。

索引侧重的检索过程，有了索引可以避免全表扫描，提高搜索性能；

笛卡尔积侧重的检索结果，是两张表全部和对方数据匹配一次后的数据集合。