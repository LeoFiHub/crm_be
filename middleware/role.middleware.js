// Middleware kiểm tra quyền dựa vào role
const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // req.user được set từ auth middleware
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Không tìm thấy thông tin user'
        });
      }

      const userRole = req.user.role;

      // Kiểm tra role của user có trong danh sách cho phép không
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Bạn không có quyền truy cập. Cần role: ${allowedRoles.join(' hoặc ')}`
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi kiểm tra quyền: ' + error.message
      });
    }
  };
};

// Các role constants để dễ quản lý
const ROLES = {
  EMPLOYEE: 'employee',
  ACCOUNTING: 'accounting', 
  HR: 'hr'
};

// Shorthand middlewares cho từng role
const requireEmployee = checkRole(ROLES.EMPLOYEE);
const requireAccounting = checkRole(ROLES.ACCOUNTING);
const requireHR = checkRole(ROLES.HR);

// Combined roles
const requireAccountingOrHR = checkRole(ROLES.ACCOUNTING, ROLES.HR);
const requireHROrAccounting = checkRole(ROLES.HR, ROLES.ACCOUNTING);
const requireAnyRole = checkRole(ROLES.EMPLOYEE, ROLES.ACCOUNTING, ROLES.HR);

module.exports = {
  checkRole,
  ROLES,
  requireEmployee,
  requireAccounting,
  requireHR,
  requireAccountingOrHR,
  requireHROrAccounting,
  requireAnyRole
};