const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getProfile
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { requireHR } = require('../middleware/role.middleware'); // Import role middleware

// POST /api/auth/register - Đăng ký
router.post('/register', register);

// POST /api/auth/login - Đăng nhập
router.post('/login', login);

// GET /api/auth/profile - Xem hồ sơ (Protected route) - phân quyền
router.get('/profile', authMiddleware, requireHR, getProfile);

module.exports = router;