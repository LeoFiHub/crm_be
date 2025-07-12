# LeoLab crm
- Chạy project: `npm start`
- Chạy sync để tạo/cập nhật bảng database: `node sync.js`

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
**Body:** None
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
      "role": "employee",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

## 2. GET USER BY ID
**URL:** `GET /api/users/:id`
**Headers:** 
```
Content-Type: application/json
```
**Body:** None
**Response:**
```json
{
  "success": true,
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

## 3. CREATE USER
**URL:** `POST /api/users`
**Headers:** 
```
Content-Type: application/json
```
**Body:**
```json
{
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
  "message": "Xóa user thành công"
}
```

## Error Responses
**404 Not Found:**
```json
{
  "success": false,
  "message": "Không tìm thấy user"
}
```

**400 Bad Request:**
```json
{
  "success": false,
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
  "message": "Lỗi khi tạo user: [error details]"
}
```

**Note:** Password sẽ được hash tự động và không bao giờ trả về trong response để đảm bảo bảo mật.


