const PayrollSchedule = require('../models/payroll.model');
const User = require('../models/user.model');

// GET ALL PAYROLLS
const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await PayrollSchedule.findAll({
      include: [
        {
          model: User,
          as: 'employee',
          attributes: ['id', 'fullName', 'email', 'role', 'walletAddress']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'fullName', 'email', 'role']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách payrolls thành công',
      data: payrolls,
      count: payrolls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách payrolls: ' + error.message
    });
  }
};

// GET PAYROLL BY ID
const getPayrollById = async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await PayrollSchedule.findByPk(id, {
      include: [
        {
          model: User,
          as: 'employee',
          attributes: ['id', 'fullName', 'email', 'role', 'walletAddress']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'fullName', 'email', 'role']
        }
      ]
    });
    
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy payroll'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Lấy thông tin payroll thành công',
      data: payroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin payroll: ' + error.message
    });
  }
};

// CREATE PAYROLL
const createPayroll = async (req, res) => {
  try {
    const { id_employee, amount, stablecoin_type, payday, status } = req.body;
    
    if (!id_employee || !amount || !payday) {
      return res.status(400).json({
        success: false,
        message: 'id_employee, amount và payday là bắt buộc'
      });
    }

    // Kiểm tra employee có tồn tại không
    const employee = await User.findByPk(id_employee);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy employee'
      });
    }
    
    const newPayroll = await PayrollSchedule.create({
      id_employee,
      amount,
      stablecoin_type: stablecoin_type || 'USDT',
      payday,
      status: status || 'pending'
    });

    // Lấy payroll vừa tạo kèm thông tin employee
    const payrollWithEmployee = await PayrollSchedule.findByPk(newPayroll.id, {
      include: [
        {
          model: User,
          as: 'employee',
          attributes: ['id', 'fullName', 'email', 'role', 'walletAddress']
        }
      ]
    });
    
    res.status(201).json({
      success: true,
      message: 'Tạo payroll thành công',
      data: payrollWithEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo payroll: ' + error.message
    });
  }
};

// UPDATE PAYROLL
const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const payroll = await PayrollSchedule.findByPk(id);
    
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy payroll'
      });
    }

    // Nếu cập nhật id_employee, kiểm tra employee có tồn tại không
    if (updateData.id_employee) {
      const employee = await User.findByPk(updateData.id_employee);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy employee'
        });
      }
    }
    
    await payroll.update(updateData);

    // Lấy payroll sau khi update kèm thông tin liên quan
    const updatedPayroll = await PayrollSchedule.findByPk(id, {
      include: [
        {
          model: User,
          as: 'employee',
          attributes: ['id', 'fullName', 'email', 'role', 'walletAddress']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'fullName', 'email', 'role']
        }
      ]
    });
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật payroll thành công',
      data: updatedPayroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật payroll: ' + error.message
    });
  }
};

// DELETE PAYROLL
const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payroll = await PayrollSchedule.findByPk(id);
    
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy payroll'
      });
    }
    
    await payroll.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Xóa payroll thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa payroll: ' + error.message
    });
  }
};

// GET PAYROLLS BY EMPLOYEE
const getPayrollsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const payrolls = await PayrollSchedule.findAll({
      where: { id_employee: employeeId },
      include: [
        {
          model: User,
          as: 'employee',
          attributes: ['id', 'fullName', 'email', 'role', 'walletAddress']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'fullName', 'email', 'role']
        }
      ],
      order: [['payday', 'DESC']]
    });

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách payrolls của employee thành công',
      data: payrolls,
      count: payrolls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy payrolls của employee: ' + error.message
    });
  }
};

// GET PAYROLLS BY STATUS
const getPayrollsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const payrolls = await PayrollSchedule.findAll({
      where: { status },
      include: [
        {
          model: User,
          as: 'employee',
          attributes: ['id', 'fullName', 'email', 'role', 'walletAddress']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'fullName', 'email', 'role']
        }
      ],
      order: [['payday', 'ASC']]
    });

    res.status(200).json({
      success: true,
      message: `Lấy danh sách payrolls có status ${status} thành công`,
      data: payrolls,
      count: payrolls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy payrolls theo status: ' + error.message
    });
  }
};

module.exports = {
  getAllPayrolls,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll,
  getPayrollsByEmployee,
  getPayrollsByStatus
};
