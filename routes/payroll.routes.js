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

// GET /api/payrolls - Lấy tất cả payrolls
router.get('/', getAllPayrolls);

// GET /api/payrolls/employee/:employeeId - Lấy payrolls theo employee
router.get('/employee/:employeeId', getPayrollsByEmployee);

// GET /api/payrolls/status/:status - Lấy payrolls theo status
router.get('/status/:status', getPayrollsByStatus);

// GET /api/payrolls/:id - Lấy payroll theo ID
router.get('/:id', getPayrollById);

// POST /api/payrolls - Tạo payroll mới
router.post('/', createPayroll);

// PUT /api/payrolls/:id - Cập nhật payroll
router.put('/:id', updatePayroll);

// DELETE /api/payrolls/:id - Xóa payroll
router.delete('/:id', deletePayroll);

module.exports = router;
