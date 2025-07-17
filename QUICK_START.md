# 🚀 OnChain CRM - Quick Start

## Chạy với Docker (Khuyến nghị)

### Yêu cầu

- Docker Desktop

### Chạy ứng dụng

```bash
# Clone project
git clone <your-repo-url>
cd crm_be

# Chạy tất cả
docker-compose up --build
```

✅ **Hoàn tất!** API sẽ chạy tại `http://localhost:3000`

### Test API

Đăng nhập với tài khoản mẫu:

```json
POST http://localhost:3000/api/auth/login
{
  "email": "john.smith.employee@company.com",
  "password": "password123"
}
```

### Dừng ứng dụng

```bash
docker-compose down
```

---

## 📱 Tài khoản test

| Role | Email | Password |
|------|-------|----------|
| Employee | <john.smith.employee@company.com> | password123 |
| Accounting | <lisa.anderson.accounting@company.com> | password123 |
| HR | <jessica.martinez.hr@company.com> | password123 |

---

## 🛠️ API Endpoints

- **POST** `/api/auth/login` - Đăng nhập
- **GET** `/api/auth/profile` - Xem profile
- **GET** `/api/users` - Danh sách users (HR/Accounting)
- **GET** `/api/payrolls` - Danh sách payrolls (HR/Accounting)

Xem chi tiết trong [README.md](README.md)
