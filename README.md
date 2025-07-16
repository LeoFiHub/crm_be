# LeoLab crm
- Chạy project: `npm start`
- Chạy sync để tạo/cập nhật bảng database: `node sync.js`


# API Authentication (JWT)

## 1. ĐĂNG KÝ
**URL:** `POST /api/auth/register`


# API Payroll
## Field Validation
- **id_employee**: Required, Integer (FK to User)
- **amount**: Required, Float
- **stablecoin_type**: Optional, String (default: 'USDT')
- **payday**: Required, Date (YYYY-MM-DD format)
- **status**: Optional, String (default: 'pending')

## Status Values
- `pending`: Chờ duyệt
- `approved`: Đã duyệt
- `paid`: Đã thanh toán
- `rejected`: Bị từ chối

## 1. GET ALL PAYROLLS
**URL:** `GET /api/payrolls`

# API User
## Field Validation
- **fullName**: Required, String
- **email**: Required, String (email format, unique)
- **password**: Required, String (will be hashed automatically)
- **phoneNumber**: Optional, String
- **walletAddress**: Optional, String
- **salary**: Optional, Float (only for employee role)
- **status**: Optional, String (default: 'active')
- **role**: Required, Enum ('employee', 'accounting', 'hr') 

## 1. GET ALL USERS
**URL:** `GET /api/users`


**Headers:** 
```
Content-Type: application/json
```

**Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@email.com",
  "password": "password123",
  "phoneNumber": "0123456789",
  "walletAddress": "0x123...",
  "salary": 15000000,
  "role": "employee",
  "status": "active"
}
```

**Body:** None

**Response:**
```json
{
  "success": true,

  "message": "Đăng ký thành công",
  "data": {
    "user": {


  "message": "Lấy danh sách payrolls thành công",
  "data": [
    {
      "id": 1,
      "id_employee": 1,
      "amount": 15000000,
      "stablecoin_type": "USDT",
      "payday": "2024-01-31",
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "employee": {
        "id": 1,
        "fullName": "Nguyễn Văn A",
        "email": "nguyenvana@email.com",
        "role": "employee",
        "walletAddress": "0x123..."
      },
      "approver": null

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
      "role": "employee",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"

    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

## 2. ĐĂNG NHẬP
**URL:** `POST /api/auth/login`


    }
  ],
  "count": 1
}
```


## 2. GET PAYROLL BY ID
**URL:** `GET /api/payrolls/:id`

## 2. GET USER BY ID
**URL:** `GET /api/users/:id`


**Headers:** 
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "nguyenvana@email.com",
  "password": "password123"
}
```

**Body:** None

**Response:**
```json
{
  "success": true,

  "message": "Đăng nhập thành công",
  "data": {
    "user": {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@email.com",
      "phoneNumber": "0123456789",
      "walletAddress": "0x123...",
      "salary": 15000000,
      "status": "active",
      "role": "employee",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

## 3. XEM HỒ SƠ (Protected Route)
**URL:** `GET /api/auth/profile`
**Headers:** 
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


  "message": "Lấy thông tin payroll thành công",
  "data": {
    "id": 1,
    "id_employee": 1,
    "amount": 15000000,
    "stablecoin_type": "USDT",
    "payday": "2024-01-31",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "employee": {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@email.com",
      "role": "employee",
      "walletAddress": "0x123..."
    },
    "approver": null
  }
}
```

## 3. GET PAYROLLS BY EMPLOYEE
**URL:** `GET /api/payrolls/employee/:employeeId`
**Headers:** 
```
Content-Type: application/json

```
**Body:** None
**Response:**
```json
{
  "success": true,

  "message": "Lấy thông tin hồ sơ thành công",

  "message": "Lấy danh sách payrolls của employee thành công",
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
      }
    }
  ],
  "count": 1
}
```

## 4. GET PAYROLLS BY STATUS
**URL:** `GET /api/payrolls/status/:status`
**Headers:** 
```
Content-Type: application/json
```
**Body:** None
**Possible status values:** `pending`, `approved`, `paid`, `rejected`
**Response:**
```json
{
  "success": true,
  "message": "Lấy danh sách payrolls có status pending thành công",
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
        "role": "employee"
      }
    }
  ],
  "count": 1
}
```

## 5. CREATE PAYROLL
**URL:** `POST /api/payrolls`

  "message": "Lấy thông tin user thành công",

  "data": {
    "id": 1,
    "fullName": "Nguyễn Văn A",
    "email": "nguyenvana@email.com",
    "phoneNumber": "0123456789",
    "walletAddress": "0x123...",
    "salary": 15000000,
    "status": "active",
    "role": "employee",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```


## Error Responses

**400 Bad Request (Thiếu thông tin):**
```json
{
  "success": false,
  "message": "fullName, email, password và role là bắt buộc"
}
```

**400 Bad Request (Email đã tồn tại):**
```json
{
  "success": false,
  "message": "Email đã được sử dụng"
}
```

**401 Unauthorized (Sai thông tin đăng nhập):**
```json
{
  "success": false,
  "message": "Email hoặc password không đúng"
}
```

**401 Unauthorized (Token không hợp lệ):**
```json
{
  "success": false,
  "message": "Token không hợp lệ. Vui lòng đăng nhập"
}
```

**401 Unauthorized (Token hết hạn):**
```json
{
  "success": false,
  "message": "Token đã hết hạn"
}
```

## Field Validation
- **fullName**: Required, String
- **email**: Required, String (unique, email format)
- **password**: Required, String (minimum 6 characters)
- **phoneNumber**: Optional, String
- **walletAddress**: Optional, String
- **salary**: Optional, Float
- **status**: Optional, String (default: 'active')
- **role**: Required, Enum ('employee', 'accounting', 'hr')

## Cách sử dụng JWT Token
1. Sau khi đăng ký/đăng nhập thành công, lưu token từ response
2. Để truy cập protected routes, thêm token vào header:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```
3. Token có thời hạn 7 ngày, sau đó cần đăng nhập lại

## Security Features
- Password được hash bằng bcrypt với salt rounds = 12
- JWT token có thời hạn để tăng bảo mật
- Password không bao giờ được trả về trong response
- Kiểm tra trạng thái user (active/inactive) trước khi cho phép truy cập

## 3. CREATE USER
**URL:** `POST /api/users`

**Headers:** 
```
Content-Type: application/json
```
**Body:**
```json
{

  "id_employee": 1,
  "amount": 15000000,
  "stablecoin_type": "USDT",
  "payday": "2024-01-31",
  "status": "pending"

  "fullName": "Nguyễn Văn B",
  "email": "nguyenvanb@email.com",
  "password": "password123",
  "phoneNumber": "0987654321",
  "walletAddress": "0x456...",
  "salary": 12000000,
  "status": "active",
  "role": "accounting"

}
```
**Response:**
```json
{
  "success": true,

  "message": "Tạo payroll thành công",
  "data": {
    "id": 2,
    "id_employee": 1,
    "amount": 15000000,
    "stablecoin_type": "USDT",
    "payday": "2024-01-31",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "employee": {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@email.com",
      "role": "employee",
      "walletAddress": "0x123..."
    }
  }
}
```

## 6. UPDATE PAYROLL
**URL:** `PUT /api/payrolls/:id`

  "message": "Tạo user thành công",
  "data": {
    "id": 2,
    "fullName": "Nguyễn Văn B",
    "email": "nguyenvanb@email.com",
    "phoneNumber": "0987654321",
    "walletAddress": "0x456...",
    "salary": 12000000,
    "status": "active",
    "role": "accounting",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 4. UPDATE USER
**URL:** `PUT /api/users/:id`

**Headers:** 
```
Content-Type: application/json
```
**Body:**
```json
{

  "amount": 20000000,
  "stablecoin_type": "USDC",
  "payday": "2024-02-29",
  "status": "approved"

  "fullName": "Nguyễn Văn A Updated",
  "email": "nguyenvana.updated@email.com",
  "password": "newpassword123",
  "phoneNumber": "0111222333",
  "salary": 20000000,
  "status": "active",
  "role": "hr"

}
```
**Response:**
```json
{
  "success": true,

  "message": "Cập nhật payroll thành công",
  "data": {
    "id": 1,
    "id_employee": 1,
    "amount": 20000000,
    "stablecoin_type": "USDC",
    "payday": "2024-02-29",
    "status": "approved",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z",
    "employee": {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@email.com",
      "role": "employee",
      "walletAddress": "0x123..."
    },
    "approver": null
  }
}
```

## 7. DELETE PAYROLL
**URL:** `DELETE /api/payrolls/:id`

  "message": "Cập nhật user thành công",
  "data": {
    "id": 1,
    "fullName": "Nguyễn Văn A Updated",
    "email": "nguyenvana.updated@email.com",
    "phoneNumber": "0111222333",
    "walletAddress": "0x123...",
    "salary": 20000000,
    "status": "active",
    "role": "hr",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## 5. DELETE USER
**URL:** `DELETE /api/users/:id`

**Headers:** 
```
Content-Type: application/json
```
**Body:** None
**Response:**
```json
{
  "success": true,

  "message": "Xóa payroll thành công"

  "message": "Xóa user thành công"

}
```

## Error Responses
**404 Not Found:**
```json
{
  "success": false,

  "message": "Không tìm thấy payroll"

  "message": "Không tìm thấy user"

}
```

**400 Bad Request:**
```json
{
  "success": false,

  "message": "id_employee, amount và payday là bắt buộc"

  "message": "fullName, email, password và role là bắt buộc"
}
```

**400 Email Already Exists:**
```json
{
  "success": false,
  "message": "Email đã được sử dụng"

}
```

**500 Internal Server Error:**
```json
{
  "success": false,

  "message": "Lỗi khi tạo payroll: [error details]"
}
```


  "message": "Lỗi khi tạo user: [error details]"
}
```

**Note:** Password sẽ được hash tự động và không bao giờ trả về trong response để đảm bảo bảo mật.




