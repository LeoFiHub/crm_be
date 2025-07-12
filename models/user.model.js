// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const User = sequelize.define('User', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phoneNumber: { type: DataTypes.STRING },
  walletAddress: { type: DataTypes.STRING },
  salary: { type: DataTypes.FLOAT }, // chỉ dùng cho employee
  status: { type: DataTypes.STRING },
  role: { // employee / accounting / hr
    type: DataTypes.ENUM('employee', 'accounting', 'hr'),
    allowNull: false,
  },
});

module.exports = User;
