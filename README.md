LeoLab crm
- Chạy project: `npm start`
- Chạy sync để tạo/cập nhật bảng database: `node sync.js`

# API Authentication (JWT)

## 1. ĐĂNG KÝ
**URL:** `POST /api/auth/register`
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
```
**Body:** None
**Response:**
```json
{
  "success": true,
  "message": "Lấy thông tin hồ sơ thành công",
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
