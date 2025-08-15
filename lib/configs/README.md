# API Configuration

File này chứa cấu hình tập trung cho tất cả các API endpoints và biến môi trường.

## Cấu trúc

### API_CONFIG
Chứa các URL cơ sở cho các dịch vụ khác nhau:
- `BACKEND_URL`: URL của backend API
- `API_BASE_URL`: URL đầy đủ cho API endpoints
- `DICEBEAR_API`: URL cho Dicebear avatar service
- `GITHUB_API`: URL cho GitHub API
- `STATIC_URL`: URL cho static files

### API_ENDPOINTS
Chứa tất cả các API endpoints được tổ chức theo nhóm:
- `AUTH`: Các endpoints xác thực
- `USER`: Các endpoints quản lý người dùng
- `CATALOG`: Các endpoints danh mục
- `SIMULATION`: Các endpoints mô phỏng
- `MEMBERS`: Các endpoints quản lý thành viên
- `OVERVIEW`: Các endpoints thống kê
- `TASKS`: Các endpoints quản lý công việc

### apiHelpers
Các hàm tiện ích để tạo URL:
- `buildUrl()`: Tạo URL đầy đủ cho API endpoint
- `buildStaticUrl()`: Tạo URL cho static files
- `buildAvatarUrl()`: Tạo URL cho Dicebear avatar
- `buildGithubUrl()`: Tạo URL cho GitHub API

## Cách sử dụng

### 1. Import cấu hình
```typescript
import { API_ENDPOINTS, apiHelpers } from '@/lib/configs/api';
```

### 2. Sử dụng trong services
```typescript
// Thay vì hardcode URL
const response = await fetch('https://virtuallab.onrender.com/api/subject');

// Sử dụng cấu hình
const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.SUBJECTS));
```

### 3. Sử dụng với parameters
```typescript
// Endpoint với parameter
const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.SIMULATION.EXPERIMENT_DATA(experimentId)));
```

## Biến môi trường

Tạo file `.env.local` trong thư mục gốc với các biến sau:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://virtuallab.onrender.com
NEXT_PUBLIC_STATIC_URL=https://virtuallab.onrender.com/static

# Development environment
NODE_ENV=development
```

## Lợi ích

1. **Dễ bảo trì**: Tất cả URL được tập trung tại một nơi
2. **Linh hoạt**: Dễ dàng thay đổi URL thông qua biến môi trường
3. **Type safety**: TypeScript hỗ trợ autocomplete và type checking
4. **Consistency**: Đảm bảo tất cả services sử dụng cùng format
5. **Environment support**: Hỗ trợ các môi trường khác nhau (dev, staging, prod)

## Migration Guide

Để chuyển đổi từ hardcode URL sang sử dụng cấu hình:

1. Import cấu hình:
```typescript
import { API_ENDPOINTS, apiHelpers } from '@/lib/configs/api';
```

2. Thay thế hardcode URL:
```typescript
// Trước
const response = await fetch('https://virtuallab.onrender.com/api/endpoint');

// Sau
const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.GROUP.ENDPOINT));
```

3. Cập nhật static URLs:
```typescript
// Trước
const url = 'https://virtuallab.onrender.com/static/file.pdf';

// Sau
const url = apiHelpers.buildStaticUrl('file.pdf');
```
