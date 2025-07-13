// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const User = sequelize.define('User', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: { type: DataTypes.STRING, allowNull: false }, // Thêm field password
  phoneNumber: { type: DataTypes.STRING },
  walletAddress: { type: DataTypes.STRING },
  salary: { type: DataTypes.FLOAT }, // chỉ dùng cho employee
  status: { 
    type: DataTypes.STRING, 
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive']]
    }
  },
  role: { // employee / accounting / hr
    type: DataTypes.ENUM('employee', 'accounting', 'hr'),
    allowNull: false,
  },
});

module.exports = User;
