// scripts/seed.js
// Script to seed dummy data for User and Payroll models

const sequelize = require('../config/sequelize.config');
const User = require('../models/user.model');
const PayrollSchedule = require('../models/payroll.model');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        await sequelize.sync({ force: true }); // Reset DB

        // Dummy users with hashed passwords
        const userData = [
            // Employees
            {
                fullName: 'John Smith',
                email: 'john.smith.employee@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0101',
                walletAddress: '0x1a2b3c4d5e6f7890abcdef1234567890',
                salary: 15000000,
                status: 'active',
                role: 'employee',
            },
            {
                fullName: 'Sarah Johnson',
                email: 'sarah.johnson.employee@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0102',
                walletAddress: '0x2b3c4d5e6f7890abcdef1234567890ab',
                salary: 18000000,
                status: 'active',
                role: 'employee',
            },
            {
                fullName: 'Michael Brown',
                email: 'michael.brown.employee@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0103',
                walletAddress: '0x3c4d5e6f7890abcdef1234567890abcd',
                salary: 16500000,
                status: 'inactive',
                role: 'employee',
            },
            {
                fullName: 'Emily Davis',
                email: 'emily.davis.employee@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0104',
                walletAddress: '0x4d5e6f7890abcdef1234567890abcdef',
                salary: 17200000,
                status: 'active',
                role: 'employee',
            },
            {
                fullName: 'David Wilson',
                email: 'david.wilson.employee@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0105',
                walletAddress: '0x5e6f7890abcdef1234567890abcdef12',
                salary: 19500000,
                status: 'active',
                role: 'employee',
            },

            // Accounting
            {
                fullName: 'Lisa Anderson',
                email: 'lisa.anderson.accounting@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0201',
                walletAddress: '0x6f7890abcdef1234567890abcdef1234',
                salary: 25000000,
                status: 'active',
                role: 'accounting',
            },
            {
                fullName: 'Robert Taylor',
                email: 'robert.taylor.accounting@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0202',
                walletAddress: '0x7890abcdef1234567890abcdef123456',
                salary: 23000000,
                status: 'active',
                role: 'accounting',
            },

            // HR
            {
                fullName: 'Jessica Martinez',
                email: 'jessica.martinez.hr@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0301',
                walletAddress: '0x890abcdef1234567890abcdef1234567',
                salary: 28000000,
                status: 'active',
                role: 'hr',
            },
            {
                fullName: 'Thomas Garcia',
                email: 'thomas.garcia.hr@company.com',
                password: 'password123',
                phoneNumber: '+1-555-0302',
                walletAddress: '0x90abcdef1234567890abcdef12345678',
                salary: 26000000,
                status: 'active',
                role: 'hr',
            },
        ];

        // Hash passwords
        for (const user of userData) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        const users = await User.bulkCreate(userData);

        // Dummy payroll schedules
        await PayrollSchedule.bulkCreate([
            // January payrolls
            {
                id_employee: users[0].id, // John Smith
                amount: 15000000,
                stablecoin_type: 'USDT',
                payday: '2025-01-31',
                status: 'pending',
            },
            {
                id_employee: users[1].id, // Sarah Johnson
                amount: 18000000,
                stablecoin_type: 'USDT',
                payday: '2025-01-31',
                status: 'approved',
                approved_by: users[5].id, // approved by Lisa Anderson (accounting)
            },
            {
                id_employee: users[2].id, // Michael Brown
                amount: 16500000,
                stablecoin_type: 'USDC',
                payday: '2025-01-31',
                status: 'rejected',
                approved_by: users[7].id, // rejected by Jessica Martinez (hr)
            },
            {
                id_employee: users[3].id, // Emily Davis
                amount: 17200000,
                stablecoin_type: 'USDT',
                payday: '2025-01-31',
                status: 'paid',
                approved_by: users[6].id, // approved by Robert Taylor (accounting)
            },
            {
                id_employee: users[4].id, // David Wilson
                amount: 19500000,
                stablecoin_type: 'USDT',
                payday: '2025-01-31',
                status: 'approved',
                approved_by: users[8].id, // approved by Thomas Garcia (hr)
            },

            // February payrolls
            {
                id_employee: users[0].id, // John Smith
                amount: 15000000,
                stablecoin_type: 'USDT',
                payday: '2025-02-28',
                status: 'pending',
            },
            {
                id_employee: users[1].id, // Sarah Johnson
                amount: 18000000,
                stablecoin_type: 'USDT',
                payday: '2025-02-28',
                status: 'pending',
            },
            {
                id_employee: users[3].id, // Emily Davis
                amount: 17200000,
                stablecoin_type: 'USDC',
                payday: '2025-02-28',
                status: 'approved',
                approved_by: users[5].id, // approved by Lisa Anderson (accounting)
            },

            // March payrolls
            {
                id_employee: users[4].id, // David Wilson
                amount: 19500000,
                stablecoin_type: 'USDT',
                payday: '2025-03-31',
                status: 'pending',
            },

            // Accounting and HR payrolls
            {
                id_employee: users[5].id, // Lisa Anderson (accounting)
                amount: 25000000,
                stablecoin_type: 'USDT',
                payday: '2025-01-31',
                status: 'paid',
                approved_by: users[7].id, // approved by Jessica Martinez (hr)
            },
            {
                id_employee: users[6].id, // Robert Taylor (accounting)
                amount: 23000000,
                stablecoin_type: 'USDT',
                payday: '2025-01-31',
                status: 'approved',
                approved_by: users[8].id, // approved by Thomas Garcia (hr)
            },
            {
                id_employee: users[7].id, // Jessica Martinez (hr)
                amount: 28000000,
                stablecoin_type: 'USDT',
                payday: '2025-01-31',
                status: 'paid',
                approved_by: users[8].id, // approved by Thomas Garcia (hr)
            },
        ]);

        console.log('Dummy data seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
