const User = require('../models/user.model');

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      message: 'Lấy danh sách users thành công',
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách users: ' + error.message
    });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Lấy thông tin user thành công',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin user: ' + error.message
    });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, walletAddress, salary, status, role } = req.body;
    
    if (!fullName || !role) {
      return res.status(400).json({
        success: false,
        message: 'fullName và role là bắt buộc'
      });
    }
    
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      walletAddress,
      salary,
      status,
      role
    });
    
    res.status(201).json({
      success: true,
      message: 'Tạo user thành công',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo user: ' + error.message
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }
    
    await user.update(updateData);
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật user thành công',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật user: ' + error.message
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }
    
    await user.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Xóa user thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa user: ' + error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};