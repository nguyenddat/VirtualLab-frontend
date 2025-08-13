# Simulation System

## Tổng quan

Hệ thống simulation cho phép load circuit data từ API và hiển thị trong iframe PhET simulation.

## Luồng hoạt động

1. **Khi vào trang simulation:**
   - Lấy `experiment_id` từ URL query parameter
   - Gọi API `/{experiment_id}` để lấy circuit data
   - Truyền data xuống component `PhetCCKDC`

2. **Trong component PhetCCKDC:**
   - Tạo iframe với PhET simulation
   - Khi có `experimentData`, gọi trực tiếp hàm `loadSavedCircuit` từ iframe
   - Iframe sẽ load circuit theo data được truyền vào

3. **Trong iframe (PhET simulation):**
   - Export hàm `loadSavedCircuit` ra window object
   - Hàm nhận circuit data và load vào simulation
   - Trả về kết quả success/error

## API Endpoint

- **URL:** `/{experiment_id}`
- **Method:** GET
- **Response:** Circuit data với format:
  ```json
  {
    "devices": [...],
    "connections": [...]
  }
  ```

## Function Call

```javascript
// Gọi trực tiếp hàm từ iframe
iframe.contentWindow.loadSavedCircuit(experimentData);
```

## Components

- `SimulationContainer`: Container chính, gọi API và quản lý state
- `PhetCCKDC`: Component iframe, gửi message đến iframe
- `useSimulationSWR`: Hook để gọi API với SWR caching

## Debug

- Console log `Experiment Data:` để xem data từ API
- Kiểm tra message trong iframe để đảm bảo `loadSavedCircuit` được gọi
