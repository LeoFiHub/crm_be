const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const User = require('./user.model');

const PayrollSchedule = sequelize.define('PayrollSchedule', {
  amount: DataTypes.FLOAT,
  stablecoin_type: DataTypes.STRING,
  payday: DataTypes.DATEONLY,
  status: DataTypes.STRING
});

// Thiết lập quan hệ với User (nhân viên)
PayrollSchedule.belongsTo(User, {
  as: 'employee',
  foreignKey: 'id_employee'
});

// Quan hệ với người duyệt (cũng là User)
PayrollSchedule.belongsTo(User, {
  as: 'approver',
  foreignKey: 'approved_by'
});

module.exports = PayrollSchedule;
