- [1、使用explain命令查看sql的执行计划，它能够简单分析sql的执行情况，是否走索引等。](#1使用explain命令查看sql的执行计划它能够简单分析sql的执行情况是否走索引等)
- [2、in和not in慎用](#2in和not-in慎用)
- [3、不用SELECT \* ，只查询需要的字段。](#3不用select--只查询需要的字段)
- [4、limit的使用](#4limit的使用)
- [5、order by字段建索引](#5order-by字段建索引)
- [6、count用法](#6count用法)
- [7、where 子句中避免is null /is not null](#7where-子句中避免is-null-is-not-null)
- [8、尽量避免在 where!=或\<\>](#8尽量避免在-where或)
- [9、尽量避免在 where 子句中使用 or](#9尽量避免在-where-子句中使用-or)
- [10、尽量避免在where子句中对字段进行函数操作](#10尽量避免在where子句中对字段进行函数操作)
- [11、尽量避免like '%xxx'式查询](#11尽量避免like-xxx式查询)
- [12、选择重复值较低的字段建索引](#12选择重复值较低的字段建索引)
- [13、注意索引顺序](#13注意索引顺序)
- [Reference](#reference)


### 1、使用explain命令查看sql的执行计划，它能够简单分析sql的执行情况，是否走索引等。
explain语句执行后的字段解析：

（1）id代表sql中查询语句的序列号，序列号越大则执行的优先级越高，序号一样谁在前谁先执行，id为null则最后执行。

（2）select_type查询类型，表示当前被分析的sql语句的查询的复杂度，这个字段有多个值。SIMPLE表示简单查询，PRIMARY表示复杂查询中的最外层的select查询语句，SUBQUERY表是子查询语句跟在select 关键字后面的select查询语句。DERIVED派生查询，跟在一个select查询语句的from关键字后面的select查询语句。

（3）table表示当前访问的表的名称，当from中有子查询时，table字段显示的是<derivedN> N为derived的id的值。

（4）partitions返回的是数据分区的信息，不常用。

（5）type表示连接类型，从最好到最差的连接类型为system > const > eq_ref > ref > range > index > all，一般来说我们优化到range就可以了，最好到ref。

  system/const：用户主键索引或者唯一索引查询时，只能匹配1条数据 一般可以对sql查询语句优化成一个常量，那么type一般就是system或者const，system是const的一个特例。

  eq_ref：在进行连接查询时，例如left join 时，如果是使用主键索引或者唯一索引连接查询 ，结果返回一条数据，则type的值为一般为eq_ref。ref：相比较eq_ref，不使用主键索引或者唯一索引，使用的是普通索引或者唯一索引的部分前缀，索引与一个值进行比较后可能获取到多个符合条件的行，不在是唯一的行了。

  range：通常使用范围查找，例如between，in，<,>,>=等使用索引进行范围检索。

  index:扫描索引树就能获取到的数据，一般是扫描二级索引，并且不会从根节点扫描，一般直接扫描二级索引的叶子节点，速度比较慢。因为二级索引叶子节点不保存表中其他字段数据，只保存主键，所以二级索引还是比较小的，扫描速度相比all还是很快的。这里用到了覆盖索引，什么是覆盖索引：可以直接遍历索引树就能获取数据叫做覆盖索引。这里遍历name索引树就可以获取到主键id的值就是覆盖索引。

  all:这是一种效率最低的type，需要扫描主键索引树的叶子节点，获取数据是表中其他列的数据，即全表扫描。

（6）possible_keys这个字段显示的是sql在查询时可能使用到的索引，但是不一定真的使用，只是一种可能。如果在进行explain分析sql时，发现这一列有值，但是key列为null，因为mysql觉得可能会使用索引，但是又因为表中的数据很少，使用索引反而没有全表扫描效率高，那么mysql就不会使用索引查找，这种情况是可能发生的。

（7）key是实际使用到的索引名。如果没有选择索引，值是NULL。可以采取强制索引方式。

（8）key_len索引长度。

（9）ref表示那些列或常量被用于查找索引列上的值。

（10）rows表示在查询过程中检索了多少列 但是并不一定就是返回这么多列数据。

（11）extra展示一些额外信息。

### 2、in和not in慎用

   SQL语句中IN包含的值不应过多，MySQL对于IN做了相应的优化，即将IN中的常量全部存储在一个数组里面，而且这个数组是排好序的。但是如果数值较多，产生的消耗也是比较大的。对于连续的数值，能用 between 就不要用 in 了，当IN的取值范围较大时会导致索引失效，走全表扫描。如果使用了 not in，则不走索引。其他的方式代替in和not in：

（1）用 EXISTS 或 NOT EXISTS代替。

```sql
select *  from test1 where EXISTS (select * from test2  where id2 = id1 )

select *  FROM test1 where NOT EXISTS (select * from test2  where id2 = id1 )
```

（2）用join代替。

```sql
select id1 from test1 INNER JOIN test2 ON id2 = id1

select id1 from test1 LEFT JOIN test2 ON id2 = id1 where id2 IS NULL
```

### 3、不用SELECT * ，只查询需要的字段。

  我们在开发过程中直接使用 SELECT * 还是比较多的，因为简单，开发效率非常高，而且如果后期频繁添加或修改字段，SQL语句也不需要改变。 SELECT * 的弊端有：

（1）不必要的磁盘I/O。

  查询的字段越多，说明要读取的内容也就越多，因此会增大磁盘 IO 开销。尤其是当某些字段是 TEXT 、MEDIUMTEXT 或者 BLOB 等类型的时候，效果尤为明显。

  使用 SELECT 会不会使MySQL占用更多的内存呢？

  不会，因为对于Server层而言，并非是在内存中存储完整的结果集之后一下子传给客户端，而是每从存储引擎获取到一行，就写到一个叫做 net_buffer 的内存空间中，这个内存的大小由系统变量 net_buffer_length 来控制，默认是16KB；当 net_buffer 写满之后再往本地网络栈的内存空间 socket send buffer 中写数据发送给客户端，发送成功（客户端读取完成）后清空 net_buffer ，然后继续读取下一行并写入。也就是说，默认情况下，结果集占用的内存空间最大不过是 net_buffer_length 大小罢了，不会因为多几个字段就占用额外的内存空间。

（2）加重网络时延

  虽然每次都是把 socket send buffer 中的数据发送给客户端，单次看来数据量不大，可架不住真的有人用*把 TEXT 、 MEDIUMTEXT 或者 BLOB 类型的字段也查出来了，总数据量大了，这就直接导致网络传输的次数变多了。

（3）无法使用覆盖索引

  为了说明这个问题，我们需要建一个表

```sql
CREATE TABLE `user_innodb` (

  `id` int NOT NULL AUTO_INCREMENT,

  `name` varchar(255) DEFAULT NULL,

  `gender` tinyint(1) DEFAULT NULL,

  `phone` varchar(11) DEFAULT NULL,

  PRIMARY KEY (`id`),

  KEY `IDX_NAME_PHONE` (`name`,`phone`) USING BTREE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

  我们创建了一个存储引擎为InnoDB的表 user_innodb ，并设置 id 为主键，另外为 name 和 phone 创建了联合索引，最后向表中随机初始化了500W+条数据。

  InnoDB会自动为主键 id 创建一棵名为主键索引（又叫做聚簇索引）的B+树，这个B+树的最重要的特点就是叶子节点包含了完整的用户记录，如果我们执行这个语句，

```sql
SELECT * FROM user_innodb WHERE name = 'xxx';
```

  使用 EXPLAIN 查看一下语句的执行计划，发现这个SQL语句会使用到 IDX_NAME_PHONE 索引，这是一个二级索引。

  InnoDB存储引擎会根据搜索条件在该二级索引的叶子节点中找到 name 为 xxx 的记录，但是二级索引中只记录了 name 、 phone 和主键 id 字段，因此InnoDB需要拿着主键 id 去主键索引中查找这一条完整的记录，这个过程叫做回表。如果二级索引的叶子节点上有我们想要的所有数据，是不是就不需要回表了呢？是的，这就是覆盖索引。

  可以看到Extra一列显示 Using index ，表示我们的查询列表以及搜索条件中只包含属于某个索引的列，也就是使用了覆盖索引，能够直接摒弃回表操作，大幅度提高查询效率。

（4）可能拖慢JOIN连接查询

我们创建两张表 t1 ， t2 进行连接操作来说明接下来的问题，并向 t1 表中插入了100条数据，向 t2 中插入了1000条数据。

```sql
CREATE TABLE `t1` (

  `id` int NOT NULL,

  `m` int DEFAULT NULL,

  `n` int DEFAULT NULL,

  PRIMARY KEY (`id`)

) ENGINE=InnoDB DEFAULT;

CREATE TABLE `t2` (

  `id` int NOT NULL,

  `m` int DEFAULT NULL,

  `n` int DEFAULT NULL,

  PRIMARY KEY (`id`)

) ENGINE=InnoDB DEFAULT;
```

如果我们执行下面这条语句

```sql
SELECT * FROM t1 STRAIGHT_JOIN t2 ON t1.m = t2.m;
```

  这里我使用了STRAIGHT_JOIN强制令 t1 表作为驱动表， t2 表作为被驱动表

  对于连接查询而言，驱动表只会被访问一遍，而被驱动表却要被访问好多遍，具体的访问次数取决于驱动表中符合查询记录的记录条数。由于已经强制确定了驱动表和被驱动表，下面我们说一下两表连接的本质：

  1. t1 作为驱动表，针对驱动表的过滤条件，执行对 t1 表的查询。因为没有过滤条件，也就是获取 t1 表的所有数据；技巧：用连接查询代替子查询、join表不易超过3个、小表驱动大表、链接字段建索引。

  2. 对上一步中获取到的结果集中的每一条记录，都分别到被驱动表中，根据连接过滤条件查找匹配记录。

  这种方法最简单，但同时性能也是最差，这种方式叫做 嵌套循环连接 （Nested-LoopJoin，NLJ）。

  怎么加快连接速度呢？

  其中一个办法就是创建索引，最好是在被驱动表（ t2 ）连接条件涉及到的字段上创建索引，毕竟被驱动表需要被查询好多次，而且对被驱动表的访问本质上就是个单表查询而已。

  既然使用了索引，为了避免重蹈无法使用覆盖索引的覆辙，我们也应该尽量不要直接 SELECT * ，而是将真正用到的字段作为查询列，并为其建立适当的索引。

  这种方法用到了一个叫做 join buffer 的固定大小的内存区域，其中存储着若干条驱动表结果集中的记录，如此一来，把被驱动表的记录加载到内存的时候，一次性和 join buffer 中多条驱动表中的记录做匹配，因为匹配的过程都是在内存中完成的，所以这样可以显著减少被驱动表的I/O代价，大大减少了重复从磁盘上加载被驱动表的代价。

  并不是驱动表记录的所有列都会被放到 join buffer 中，只有查询列表中的列和过滤条件中的列才会被放到 join buffer 中，所以再次提醒我们，最好不要把 * 作为查询列表，只需要把我们关心的列放到查询列表就好了，这样还可以在 join buffer 中放置更多的记录，减少分批的次数，也就自然减少了对被驱动表的访问次数。

### 4、limit的使用

  在我们知道查询结果数量的时候，可以加上limit限制，这是为了使explain中type列达到const类型。当只需要一条数据的时候，使用limit 1，如果加上limit 1，查找到就不用继续往后找了。以下是常见的使用limit的场景：

```sql
select * from Customer LIMIT 10;--检索前10行数据，显示1-10条数据；

select * from Customer LIMIT 1,10;--检索从第2行开始，累加10条id记录，共显示id为2....11；

select * from Customer limit 5,10;--检索从第6行开始向前加10条数据，共显示id为6,7....15；

select * from Customer limit 6,10;--检索从第7行开始向前加10条记录，显示id为7,8...16。
```

在分页的时候，巧用limit可以加快查询速度。

```sql
select id,name,age from user limit 10000, 20;
```

  mysql会查询10020条，然后丢弃前面10000条，这个比较浪费资源，可以优化：

```sql
select id,name,age from user id>10000 limit 20;
```

### 5、order by字段建索引
  为了避免全表扫描，首先应考虑在 where 及 order by涉及的列上建立索引，如果排序字段没有用到索引，就尽量少排序可以在程序中排序。

### 6、count用法

  count()、count(主键id) 和 count(1) 都表示返回满足条件的结果集的总行数；而 count(字段)，则表示返回满足条件的数据行里面，参数“字段”不为null的总个数。count() 是例外，并不会把全部字段取出来，而是专门做了优化，不取值。count(*) 肯定不是 null，按行累加。按照效率排序的话，count(字段)<count(主键id)<count(1)≈count()，推荐使用count()。

### 7、where 子句中避免is null /is not null

  应尽量避免在where子句中对字段进行null值判断，使用is null或者is not null理论上都会走索引,存在null值会导致mysql优化器处理起来比较复杂，容易导致引擎放弃使用索引而进行全表扫描。

  所以设计表字段时尽量避免null值出现，null值很难查询优化且占用额外的索引空间，推荐默认数字0代替null。

### 8、尽量避免在 where!=或<>

子句中使用!=或<>操作符，否则将引擎放弃使用索引而进行全表扫描。

### 9、尽量避免在 where 子句中使用 or

  如果使用or那么要求or两边的条件字段都要有索引,才会走索引,如果其中一边有一个字段没索引, 另一个字段上的索引也会失效。很多时候使用union all或者是union（必要的时候）的方式来代替or会得到更好的效果。

  应尽量避免在 where 子句中使用 or来连接条件，否则将导致引擎放弃使用索引而进行全表扫描。

```sql
select id from t where num=10 or num=20
```

可以改为

```sql
select id from t where num=10 union all select id from t where num=20
```

  union和union all的差异主要是前者需要将结果集合并后再进行唯一性过滤操作，这就会涉及到排序，增加大量的CPU运算，加大资源消耗及延迟。当然，union all的前提条件是两个结果集没有重复数据。

### 10、尽量避免在where子句中对字段进行函数操作

  不要在子句中的`=`左边进行函数、算术运算或其他表达式运算，否则系统将可能无法正确使用索引。

```sql
select id from t where substring(name,1,3)=`abc`
```

### 11、尽量避免like '%xxx'式查询

  在非覆盖索引场景下,大家知道MySQL索引有最左原则,所以通过 like '%xx%'查询的时候一定会造成索引失效(5.7版本覆盖索引可以走索引),一般采用like 'xx%'右边匹配的方式来索引。

  当想要获取的字段多了以后，select * from t_user where name like `%xx`; 要查询的数据就不能只在索引树里找了，得需要回表操作才能完成查询的工作，再加上是左模糊匹配，无法利用索引树的有序性来快速定位数据，所以得在索引树逐一遍历，获取主键值后，再到聚簇索引树检索到对应的数据行，这样实在太累了。

  优化器认为上面这样的查询过程的成本实在太高了，所以直接选择全表扫描的方式来查询数据。

所以，使用左模糊匹配（like `%xx`）并不一定会走全表扫描，但也容易失效，关键还是看数据表中的字段，尽量全值匹配。

在使用联合索引的时候要特别注意最左前缀原则，即查询从联合索引的最左前列开始并且不跳过索引中的列。

### 12、选择重复值较低的字段建索引

  在创建索引时，一定要选择重复值较低的字段。离散型非常的差，优化器可能直接就选择不走索引了，因为优化器可能认为，走索引和全表扫描差不多。值分布很稀少的字段不适合建索引，例如"性别"这种只有两三个值的字段不适合做索引。


### 13、注意索引顺序

  使用多列索引时主意顺序和查询条件保持一致，同时删除不必要的单列索引，可以优化存储空间。

### Reference
https://baijiahao.baidu.com/s?id=1767213898798156300&wfr=spider&for=pc

https://segmentfault.com/a/1190000046177492