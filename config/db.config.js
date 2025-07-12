require('dotenv').config();
const mysql = require('mysql2');

// Tạo connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crm_blockchain',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Sử dụng promise
const promisePool = pool.promise();

// Function test kết nối
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    await connection.ping();
    connection.release();
    return { success: true, message: 'Kết nối database thành công!' };
  } catch (error) {
    return { success: false, message: 'Lỗi kết nối database: ' + error.message };
  }
};

module.exports = {
  pool,
  promisePool,
  testConnection
};