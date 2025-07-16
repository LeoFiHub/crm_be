const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

// GET /api/users - Lấy tất cả users
router.get('/', getAllUsers);

// GET /api/users/:id - Lấy user theo ID
router.get('/:id', getUserById);

// POST /api/users - Tạo user mới
router.post('/', createUser);

// PUT /api/users/:id - Cập nhật user
router.put('/:id', updateUser);

// DELETE /api/users/:id - Xóa user
router.delete('/:id', deleteUser);

module.exports = router;