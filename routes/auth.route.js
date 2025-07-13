const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/auth/register - Đăng ký
router.post('/register', register);

// POST /api/auth/login - Đăng nhập
router.post('/login', login);

// GET /api/auth/profile - Xem hồ sơ (Protected route)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;