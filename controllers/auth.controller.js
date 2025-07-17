const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Tạo JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// ĐĂNG KÝ - donneeeeeeeeeeeeeee
const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, walletAddress, salary, status, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email, password and role are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo user mới
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      walletAddress,
      salary,
      status: status || 'active',
      role
    });

    // Tạo token
    const token = generateToken(newUser.id);

    // Loại bỏ password khỏi response
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: userResponse,
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering: ' + error.message
    });
  }
};

// ĐĂNG NHẬP - donneeeeeeeeeeeeeee
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Kiểm tra trạng thái user
    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Account has been disabled'
      });
    }

    // Tạo token
    const token = generateToken(user.id);

    // Loại bỏ password khỏi response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in: ' + error.message
    });
  }
};

// XEM HỒ SƠ (Protected route) - donneeeeeeeeeeeeeee
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
        
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Loại bỏ password khỏi response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting profile: ' + error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};