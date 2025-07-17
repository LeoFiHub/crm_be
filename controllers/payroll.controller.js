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
          // attributes: ['id', 'fullName', 'email', 'role', 'walletAddress', 'dateOfBirth']
        },
        {
          model: User,
          as: 'approver',
          // attributes: ['id', 'fullName', 'email', 'role']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      message: 'Get payrolls list successfully',
      data: payrolls,
      count: payrolls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting payrolls list: ' + error.message
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
        message: 'Payroll not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Get payroll successfully',
      data: payroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting payroll: ' + error.message
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
        message: 'id_employee, amount and payday are required'
      });
    }

    // Check if employee exists
    const employee = await User.findByPk(id_employee);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
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
      message: 'Payroll created successfully',
      data: payrollWithEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating payroll: ' + error.message
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
        message: 'Payroll not found'
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
      message: 'Payroll updated successfully',
      data: updatedPayroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating payroll: ' + error.message
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
        message: 'Payroll not found'
      });
    }
    
    await payroll.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Payroll deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting payroll: ' + error.message
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
      message: 'Get payrolls by employee successfully',
      data: payrolls,
      count: payrolls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting payrolls by employee: ' + error.message
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
      message: `Get payrolls with status ${status} successfully`,
      data: payrolls,
      count: payrolls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting payrolls by status: ' + error.message
    });
  }
};


// APPROVE PAYROLL
const putApprovePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payroll = await PayrollSchedule.findByPk(id);
    
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll not found'
      });
    }

    // Chỉ cho phép đổi status từ 'pending' sang 'approved'
    if (payroll.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Payroll can only be approved when status is pending'
      });
    }

    // Cập nhật status và lưu người duyệt
    payroll.status = 'approved';
    payroll.approved_by = req.userId;
    await payroll.save();

    res.status(200).json({
      success: true,
      message: 'Payroll approved successfully',
      data: payroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving payroll: ' + error.message
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
  getPayrollsByStatus,
  putApprovePayroll
};
