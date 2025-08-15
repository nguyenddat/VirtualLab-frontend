# API Setup Guide

## Environment Variables

Tạo file `.env.local` trong thư mục gốc với các biến môi trường sau:

```env
# Backend API Configuration
NEXT_PUBLIC_BACKEND_API=http://localhost:8000
NEXT_PUBLIC_BACKEND_IP=localhost
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Integration

### Login API
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "role": "student" | "teacher" | "admin"
  }
  ```

### Me API
- **Endpoint**: `GET /api/auth/me?user_id={user_id}`
- **Parameters**: `user_id` (query parameter)
- **Response**:
  ```json
  {
    "id": "string",
    "username": "string"
  }
  ```

### Current Implementation
- Login API chỉ trả về `id` và `role`
- Me API chỉ trả về `id` và `username`
- Các trường khác được fix cứng:
  - `userName`: sử dụng username từ Me API hoặc login request
  - `email`: `${username}@example.com`
  - `emailVerified`: `true`
  - `image`: avatar từ DiceBear API
  - `createdAt`/`updatedAt`: `"2023-01-01T00:00:00Z"`
  - `session.token`: fake token được tạo tự động
- User data được lưu trong localStorage để persistence
- App sẽ thử gọi Me API để refresh data, nếu fail sẽ dùng localStorage data

### Next Steps
Khi API được cập nhật, chỉ cần thay đổi:
1. Interface `IApiLoginResponse` trong `features/auth/services/auth.ts`
2. Logic trong hàm `getUserByRole` để sử dụng dữ liệu thực từ API
