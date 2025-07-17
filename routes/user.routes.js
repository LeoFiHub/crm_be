const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { requireAccounting } = require('../middleware/role.middleware');

// GET /api/users - Lấy tất cả users
router.get('/', authMiddleware, requireAccounting, getAllUsers);

// GET /api/users/:id - Lấy user theo ID
router.get('/:id', authMiddleware, requireAccounting, getUserById);

// POST /api/users - Tạo user mới
router.post('/', authMiddleware, requireAccounting, createUser);

// PUT /api/users/:id - Cập nhật user
router.put('/:id', authMiddleware, requireAccounting, updateUser);

// DELETE /api/users/:id - Xóa user
router.delete('/:id', authMiddleware, requireAccounting, deleteUser);

module.exports = router;