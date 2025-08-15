# Test API Integration

## 1. Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_BACKEND_API=http://localhost:8000
NEXT_PUBLIC_BACKEND_IP=localhost
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Kiểm tra Server

Đảm bảo server đang chạy trên port 8000 và có endpoint:
- `POST http://localhost:8000/api/auth/login`

## 3. Test API với curl

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

## 4. Test trong Browser

1. Mở DevTools (F12)
2. Vào tab Console
3. Thử login với credentials hợp lệ
4. Kiểm tra logs:
   - "Login service called with params:"
   - "API response:"
   - Hoặc "Login error:" nếu có lỗi

## 5. Kiểm tra Network Tab

1. Vào tab Network trong DevTools
2. Thử login
3. Tìm request đến `/api/auth/login`
4. Kiểm tra:
   - Request URL: `http://localhost:8000/api/auth/login`
   - Request Method: POST
   - Request Payload: `{"username": "...", "password": "..."}`
   - Response: `{"id": "...", "role": "..."}`

## Troubleshooting

### Nếu không thấy request:
- Kiểm tra file `.env.local` có đúng không
- Restart Next.js dev server
- Kiểm tra console có lỗi gì không

### Nếu có lỗi CORS:
- Đảm bảo server cho phép CORS từ `http://localhost:3000`

### Nếu có lỗi 404:
- Kiểm tra endpoint có đúng `/api/auth/login` không
- Kiểm tra server có chạy không
