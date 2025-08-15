# Test Authentication Persistence

## Vấn đề đã sửa

Trước đây, user state bị mất khi navigate giữa các trang vì:
1. SWR gọi API `/api/auth/me` không hoạt động
2. User data không được lưu trữ đúng cách trong localStorage

## Giải pháp đã implement

1. **Sử dụng localStorage**: User data được lưu trữ trong localStorage
2. **API /me endpoint**: Gọi API `/api/auth/me?user_id={user_id}` để refresh user data
3. **Fallback logic**: Nếu API /me fail, sử dụng localStorage data
4. **Hybrid approach**: Kết hợp SWR và localStorage để đảm bảo persistence

## Cách test

### 1. Test Login và Persistence

1. Mở DevTools → Application → Local Storage
2. Xóa tất cả data trong localStorage
3. Login với tài khoản học sinh
4. Kiểm tra localStorage có data:
   ```json
   {
     "auth_access_token": "fake_token_...",
     "auth_user": "{\"id\":\"...\",\"userName\":\"...\",\"role\":\"student\",...}"
   }
   ```

### 2. Test API /me

1. Sau khi login thành công
2. Kiểm tra Network tab có request đến `/api/auth/me?user_id={user_id}`
3. Kiểm tra response có format đúng:
   ```json
   {
     "id": "string",
     "username": "string"
   }
   ```

### 3. Test Navigation

1. Sau khi login thành công
2. Vào trang Simulation
3. Quay lại Dashboard
4. Kiểm tra user vẫn còn đăng nhập
5. Kiểm tra console có log "Restored user from localStorage"

### 4. Test Browser Refresh

1. Login thành công
2. Refresh trang (F5)
3. Kiểm tra user vẫn còn đăng nhập
4. Kiểm tra có gọi API /me để refresh data

### 5. Test API /me Failure

1. Tắt server backend
2. Refresh trang
3. Kiểm tra app vẫn hoạt động với localStorage data
4. Kiểm tra console có log "Failed to refresh user from API, using localStorage data"

### 4. Test Logout

1. Click logout
2. Kiểm tra localStorage đã được xóa
3. Kiểm tra user đã đăng xuất

## Debug

### Kiểm tra Console Logs

Khi khởi động app, sẽ thấy log:
```
"Restored user from localStorage: {id: "...", userName: "...", role: "student", ...}"
```

### Kiểm tra localStorage

```javascript
// Trong browser console
console.log('Access Token:', localStorage.getItem('auth_access_token'));
console.log('User:', JSON.parse(localStorage.getItem('auth_user')));
```

## Troubleshooting

### Nếu vẫn bị logout:

1. Kiểm tra localStorage có data không
2. Kiểm tra console có lỗi gì không
3. Kiểm tra `isAuthenticated` state trong React DevTools

### Nếu localStorage không lưu:

1. Kiểm tra browser có cho phép localStorage không
2. Kiểm tra có lỗi JSON.parse không
3. Kiểm tra `storeAuthData` function có được gọi không
