require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route test connection database
app.get('/test_connection', async (req, res) => {
  try {
    const result = await testConnection();
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
        database_info: {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_NAME,
          user: process.env.DB_USER
        },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server: ' + error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Route chính
app.get('/', (req, res) => {
  res.json({
    message: 'CRM Backend API',
    endpoints: {
      test_connection: '/test_connection'
    }
  });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔍 Test connection: http://localhost:${PORT}/test_connection`);
});