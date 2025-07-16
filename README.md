# LeoLab CRM - Backend API

## 📋 Tổng quan
LeoLab CRM

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy project
npm start

# Sync database (tạo/cập nhật bảng)
node sync.js
```

## 🔧 Cấu hình môi trường (.env)

```env
# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=crm_blockchain

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=

```

## 📊 Database Models

### User Model
```javascript
{
  id: Integer (Primary Key),
  fullName: String (Required),
  email: String (Required, Unique, Email format),
  password: String (Required, Hashed),
  phoneNumber: String (Optional),
  walletAddress: String (Optional),
  salary: Float (Optional),
  status: Enum ['active', 'inactive'] (Default: 'active'),
  role: Enum ['employee', 'accounting', 'hr'] (Required)
}
```

### PayrollSchedule Model
```javascript
{
  id: Integer (Primary Key),
  id_employee: Integer (FK to User),
  amount: Float (Required),
  stablecoin_type: String (Default: 'USDT'),
  payday: Date (Required),
  status: String (Default: 'pending'),
  approved_by: Integer (FK to User, Optional)
}
```

# 🔐 API Authentication

## 1. ĐĂNG KÝ
**URL:** `POST /api/auth/register`

**Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@email.com",
  "password": "password123",
  "phoneNumber": "0123456789",
  "walletAddress": "0x123...",
  "salary": 15000000,
  "role": "employee"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "user": {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@email.com",
      "phoneNumber": "0123456789",
      "walletAddress": "0x123...",
      "salary": 15000000,
      "status": "active",
      "role": "employee"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

## 2. ĐĂNG NHẬP
**URL:** `POST /api/auth/login`

**Body:**
```json
{
  "email": "nguyenvana@email.com",
  "password": "password123"
}
```

**Response:** Same as register

## 3. XEM HỒ SƠ (Protected)
**URL:** `GET /api/auth/profile`
**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "message": "Lấy thông tin hồ sơ thành công",
  "data": {
    "id": 1,
    "fullName": "Nguyễn Văn A",
    "email": "nguyenvana@email.com",
    "role": "employee"
  }
}
```

---

# 👥 API User Management

## 1. GET ALL USERS (HR/Accounting only)
**URL:** `GET /api/users`
**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "message": "Lấy danh sách users thành công",
  "data": [
    {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@email.com",
      "phoneNumber": "0123456789",
      "walletAddress": "0x123...",
      "salary": 15000000,
      "status": "active",
      "role": "employee"
    }
  ],
  "count": 1
}
```

## 2. GET USER BY ID (All roles)
**URL:** `GET /api/users/:id`
**Headers:** `Authorization: Bearer TOKEN`

## 3. CREATE USER (HR only)
**URL:** `POST /api/users`
**Headers:** `Authorization: Bearer TOKEN`

**Body:**
```json
{
  "fullName": "Nguyễn Văn B",
  "email": "nguyenvanb@email.com",
  "password": "password123",
  "phoneNumber": "0987654321",
  "role": "accounting"
}
```

## 4. UPDATE USER (HR only)
**URL:** `PUT /api/users/:id`
**Headers:** `Authorization: Bearer TOKEN`

## 5. DELETE USER (HR only)
**URL:** `DELETE /api/users/:id`
**Headers:** `Authorization: Bearer TOKEN`

---

# 💰 API Payroll Management

## 1. GET ALL PAYROLLS (HR/Accounting only)
**URL:** `GET /api/payrolls`
**Headers:** `Authorization: Bearer TOKEN`

**Response:**
```json
{
  "success": true,
  "message": "Lấy danh sách payrolls thành công",
  "data": [
    {
      "id": 1,
      "id_employee": 1,
      "amount": 15000000,
      "stablecoin_type": "USDT",
      "payday": "2024-01-31",
      "status": "pending",
      "employee": {
        "id": 1,
        "fullName": "Nguyễn Văn A",
        "email": "nguyenvana@email.com",
        "role": "employee",
        "walletAddress": "0x123..."
      },
      "approver": null
    }
  ],
  "count": 1
}
```

## 2. GET PAYROLL BY ID
**URL:** `GET /api/payrolls/:id`
**Headers:** `Authorization: Bearer TOKEN`

## 3. GET PAYROLLS BY EMPLOYEE (HR/Accounting only)
**URL:** `GET /api/payrolls/employee/:employeeId`
**Headers:** `Authorization: Bearer TOKEN`

## 4. GET PAYROLLS BY STATUS (HR/Accounting only)
**URL:** `GET /api/payrolls/status/:status`
**Headers:** `Authorization: Bearer TOKEN`
**Status values:** `pending`, `approved`, `paid`, `rejected`

## 5. CREATE PAYROLL (HR only)
**URL:** `POST /api/payrolls`
**Headers:** `Authorization: Bearer TOKEN`

**Body:**
```json
{
  "id_employee": 1,
  "amount": 15000000,
  "stablecoin_type": "USDT",
  "payday": "2024-01-31",
  "status": "pending"
}
```

## 6. UPDATE PAYROLL (HR/Accounting)
**URL:** `PUT /api/payrolls/:id`
**Headers:** `Authorization: Bearer TOKEN`

## 7. DELETE PAYROLL (HR only)
**URL:** `DELETE /api/payrolls/:id`
**Headers:** `Authorization: Bearer TOKEN`

---

# ⚠️ Error Responses

## Authentication Errors
```json
{
  "success": false,
  "message": "Token không hợp lệ. Vui lòng đăng nhập"
}
```

## Authorization Errors
```json
{
  "success": false,
  "message": "Bạn không có quyền truy cập. Cần role: hr"
}
```

## Validation Errors
```json
{
  "success": false,
  "message": "fullName, email, password và role là bắt buộc"
}
```

## Not Found Errors
```json
{
  "success": false,
  "message": "Không tìm thấy user"
}
```

---

# 🌐 CORS Configuration

Backend đã được cấu hình CORS để hỗ trợ frontend:

```javascript
// Allowed origins
'http://localhost:3000',  // React
```

---


# 📡 API Endpoints Summary

| Method | Endpoint | Description | Auth | Role Required |
|--------|----------|-------------|------|---------------|
| POST | `/api/auth/register` | Đăng ký | ❌ | - |
| POST | `/api/auth/login` | Đăng nhập | ❌ | - |
| GET | `/api/auth/profile` | Xem hồ sơ | ✅ | HR |
| GET | `/api/users` | Danh sách users | ✅ | HR/Accounting |
| GET | `/api/users/:id` | Chi tiết user | ✅ | Any |
| POST | `/api/users` | Tạo user | ✅ | HR |
| PUT | `/api/users/:id` | Cập nhật user | ✅ | HR |
| DELETE | `/api/users/:id` | Xóa user | ✅ | HR |
| GET | `/api/payrolls` | Danh sách payrolls | ✅ | HR/Accounting |
| GET | `/api/payrolls/:id` | Chi tiết payroll | ✅ | Any |
| GET | `/api/payrolls/employee/:id` | Payrolls theo employee | ✅ | HR/Accounting |
| GET | `/api/payrolls/status/:status` | Payrolls theo status | ✅ | HR/Accounting |
| POST | `/api/payrolls` | Tạo payroll | ✅ | HR |
| PUT | `/api/payrolls/:id` | Cập nhật payroll | ✅ | HR/Accounting |
| DELETE | `/api/payrolls/:id` | Xóa payroll | ✅ | HR |

---

# 🔧 Development

## Project Structure
```
crm_be/
├── config/           # Database & app configuration
├── controllers/      # Business logic
├── middleware/       # Authentication & role middleware  
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Helper functions
├── .env            # Environment variables
├── index.js        # Main server file
├── sync.js         # Database sync
└── package.json    # Dependencies
```

## Available Scripts
- `npm start` - Start server
- `node sync.js` - Sync database
- `npm install` - Install dependencies

## Test Connection
- Visit: `http://localhost:3000/test_connection`




