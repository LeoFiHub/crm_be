const sequelize = require('./config/sequelize.config');
const User = require('./models/user.model');
const PayrollSchedule = require('./models/payroll.model');

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Synced models successfully!');
    console.log('📊 Database tables created/updated');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing models:', error);
    process.exit(1);
  }
}

syncModels();