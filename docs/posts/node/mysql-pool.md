
mysql-pool

```javascript
const mysql = require('mysql')

// Create connection pool (recommended approach)
const pool = mysql.createPool({
  connectionLimit: 10, // Limit the number of connections
  host: 'localhost',
  user: 'root',
  password: 'In123456.',
  database: 'r3',
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
})

// Test the pool connection
function testConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('Error getting connection from pool:', err.stack)
        reject(err)
      } else {
        console.log('Connected to MySQL pool as id ' + connection.threadId)
        connection.release() // Always release the connection back to pool
        resolve()
      }
    })
  })
}

// Execute query using connection pool
function exec(sql, data = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, data, (error, results) => {
      if (error) {
        console.log('Exec error:', error)
        return reject(error)
      }
      resolve(results)
    })
  })
}

// Get a connection from pool (for transactions)
function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}

// Close the pool (call this when shutting down the app)
function closePool() {
  return new Promise((resolve) => {
    pool.end(() => {
      console.log('MySQL pool closed')
      resolve()
    })
  })
}

module.exports = {
  pool,
  testConnection,
  exec,
  getConnection,
  closePool
}
```

## 创建连接：

**不需要每次执行SQL查询都创建新的连接！** 这样做效率很低且浪费资源。

### 主要优化方案：

**连接池 (Connection Pool) - 推荐方式**
- ✅ 自动管理多个连接
- ✅ 连接重用，性能更好
- ✅ 自动处理连接超时和重连
- ✅ 限制并发连接数

### 使用方式：

**简单查询：**
```javascript
const { exec } = require('./utils/mysql')

// 直接使用，连接池自动管理
const users = await exec('SELECT * FROM users WHERE age > ?', [18])
```

**事务处理：**
```javascript
const { getConnection } = require('./utils/mysql')

const connection = await getConnection()
// 执行事务...
connection.release() // 释放回连接池
```

**应用启动时：**
```javascript
const { testConnection } = require('./utils/mysql')

// 测试连接池
await testConnection()
console.log('数据库连接池已就绪')
```

### 关键优势：
1. **性能提升：** 连接复用，避免重复创建/销毁
2. **资源管理：** 控制并发连接数，防止数据库过载  
3. **稳定性：** 自动重连和错误处理
4. **简单使用：** 不需要手动管理连接生命周期
