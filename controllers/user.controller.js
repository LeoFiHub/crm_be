const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Loại bỏ password khỏi response
    });
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
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] } // Loại bỏ password khỏi response
    });
    
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
    const { fullName, email, phoneNumber, walletAddress, salary, status, role, password } = req.body;
    
    // Validate required fields
    if (!fullName || !role || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email, password và role là bắt buộc'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      walletAddress,
      salary,
      status: status || 'active',
      role,
      password: hashedPassword
    });

    // Remove password from response
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'Tạo user thành công',
      data: userResponse
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
    const updateData = { ...req.body };
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }

    // If password is being updated, hash it
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    // Check email uniqueness if email is being updated
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({ where: { email: updateData.email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng'
        });
      }
    }
    
    await user.update(updateData);

    // Remove password from response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật user thành công',
      data: userResponse
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