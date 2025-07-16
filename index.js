require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db.config');




// Import routes
const authRoutes = require('./routes/auth.route');

// Import routes

const payrollRoutes = require('./routes/payroll.routes');

const userRoutes = require('./routes/user.routes');



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


app.use('/api/payrolls', payrollRoutes);

app.use('/api/users', userRoutes);



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


      payrolls: {
        get_all: 'GET /api/payrolls',
        get_by_id: 'GET /api/payrolls/:id',
        get_by_employee: 'GET /api/payrolls/employee/:employeeId',
        get_by_status: 'GET /api/payrolls/status/:status',
        create: 'POST /api/payrolls',
        update: 'PUT /api/payrolls/:id',
        delete: 'DELETE /api/payrolls/:id'

      users: {
        get_all: 'GET /api/users',
        get_by_id: 'GET /api/users/:id',
        create: 'POST /api/users',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id'

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


  console.log(`💰 Payrolls API: http://localhost:${PORT}/api/payrolls`);

  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);


});