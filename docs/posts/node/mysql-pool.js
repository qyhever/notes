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
function query(sql, data = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, data, (error, results) => {
      if (error) {
        console.log('Query error:', error)
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
  query,
  getConnection,
  closePool
}
