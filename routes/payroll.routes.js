const express = require('express');
const router = express.Router();
const {
  getAllPayrolls,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll,
  getPayrollsByEmployee,
  getPayrollsByStatus
} = require('../controllers/payroll.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { requireAccounting } = require('../middleware/role.middleware');

// GET /api/payrolls - Lấy tất cả payrolls
router.get('/', authMiddleware, getAllPayrolls);

// GET /api/payrolls/employee/:employeeId - Lấy payrolls theo employee
router.get('/employee/:employeeId', authMiddleware, getPayrollsByEmployee);

// GET /api/payrolls/status/:status - Lấy payrolls theo status
router.get('/status/:status', authMiddleware, requireAccounting, getPayrollsByStatus);

// GET /api/payrolls/:id - Lấy payroll theo ID
router.get('/:id',authMiddleware, getPayrollById);

// POST /api/payrolls - Tạo payroll mới
router.post('/', authMiddleware, requireAccounting, createPayroll);
// PUT /api/payrolls/:id - Cập nhật payroll
router.put('/:id', authMiddleware, requireAccounting, updatePayroll);
// DELETE /api/payrolls/:id - Xóa payroll
router.delete('/:id',authMiddleware, requireAccounting, deletePayroll);

module.exports = router;
