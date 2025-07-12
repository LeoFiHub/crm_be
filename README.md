LeoLab crm
- Chạy project: `npm start`
- Chạy sync để tạo/cập nhật bảng database: `node sync.js`

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
**Headers:** 
```
Content-Type: application/json
```
**Body:** None
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
  ],
  "count": 1
}
```

## 2. GET PAYROLL BY ID
**URL:** `GET /api/payrolls/:id`
**Headers:** 
```
Content-Type: application/json
```
**Body:** None
**Response:**
```json
{
  "success": true,
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
}
```

## Error Responses
**404 Not Found:**
```json
{
  "success": false,
  "message": "Không tìm thấy payroll"
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "message": "id_employee, amount và payday là bắt buộc"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Lỗi khi tạo payroll: [error details]"
}
```


