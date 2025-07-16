require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db.config');



// Import routes
const authRoutes = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 3000;

//================Cau hinh CORS================
// Cho phép truy cập từ frontend (React, Vue, Angular, v.v.)
app.use(cors({
  origin: 'http://localhost:3000', // hoặc mảng origin
  credentials: true
}));


// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

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
      test_connection: '/test_connection',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile (Protected)'
      }
    }
  });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔍 Test connection: http://localhost:${PORT}/test_connection`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
});