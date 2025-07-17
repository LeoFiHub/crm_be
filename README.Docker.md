# OnChain CRM Backend

## 🚀 Quick Start với Docker

### Yêu cầu

- Docker
- Docker Compose

### Chạy ứng dụng

```bash
# Clone project
git clone <repo-url>
cd crm_be

# Chạy tất cả (database + app + seed data)
docker-compose up --build
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

### Dừng ứng dụng

```bash
docker-compose down
```

### Reset toàn bộ (xóa database)

```bash
docker-compose down -v
docker-compose up --build
```

---

## 📊 Test APIs

### Đăng nhập với dữ liệu mẫu

```json
{
  "email": "john.smith.employee@company.com",
  "password": "password123"
}
```

### Các role có sẵn

- **Employee**: `*.employee@company.com`
- **Accounting**: `*.accounting@company.com`
- **HR**: `*.hr@company.com`

Tất cả đều có password: `password123`

---

## 🛠️ Development

### Chạy local (không Docker)

```bash
npm install
npm run sync
npm run seed
npm start
```

### Database

- Host: localhost:3306
- User: crm_user
- Password: crm_password
- Database: onchain_CRM_db
