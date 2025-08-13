# Catalog Feature

Catalog feature đã được cập nhật để sử dụng API thay vì dữ liệu cứng.

## API Endpoints

Catalog sử dụng các API endpoints sau:

- `GET http://localhost:8000/api/subject` - Lấy danh sách các môn học
- `GET http://localhost:8000/api/bookset` - Lấy danh sách các bộ sách
- `GET http://localhost:8000/api/chapter` - Lấy danh sách các chapter
- `GET http://localhost:8000/api/experiment` - Lấy danh sách các thí nghiệm (lessons)

## Cấu trúc dữ liệu

### Subject
```typescript
interface Subject {
  id: string;
  name: string;
}
```

### Textbook
```typescript
interface Textbook {
  id: string;
  name: string;
  subject_id: string;
  static_image_path?: string;
}
```

### Chapter
```typescript
interface Chapter {
  id: string;
  name: string;
  bookset_id: string;
}
```

### Lesson (Experiment)
```typescript
interface Lesson {
  id: string;
  name: string;
  chapter_id: string;
}
```

## Components

### Catalog
Component chính để hiển thị danh mục bài học với các bộ lọc.

### CatalogFiltersComponent
Component chứa các bộ lọc:
- SubjectFilter: Lọc theo môn học
- TextbookFilter: Lọc theo bộ sách
- ChapterFilter: Lọc theo chương
- TopicFilter: Không có dữ liệu (disabled)

### CatalogGrid
Component hiển thị grid các bài học với loading state.

## Hooks

### useCatalogSWR
Hook SWR để quản lý state và cache cho các API calls:
- `subjects`: Danh sách môn học
- `textbooks`: Danh sách bộ sách
- `experiments`: Danh sách thí nghiệm
- `useChapters(booksetId)`: Hook để lấy chapters của một bookset

### useCatalog
Hook chính để quản lý state của catalog:
- `lessons`: Danh sách bài học đã được lọc
- `filters`: State của các bộ lọc
- `loading`: Trạng thái loading
- `error`: Thông báo lỗi
- `updateFilters`: Function cập nhật bộ lọc
- `getFilterStats`: Thống kê về bộ lọc

## Services

### catalogService
Service để gọi các API:
- `getSubjects()`: Lấy danh sách môn học
- `getTextbooks()`: Lấy danh sách bộ sách
- `getChapters()`: Lấy danh sách chapters
- `getExperiments()`: Lấy danh sách thí nghiệm

## Sử dụng

```tsx
import { Catalog } from '@/features/catalog';

const ExplorePage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Catalog onLessonSelect={(lesson) => {
        // Xử lý khi chọn bài học
        console.log('Selected lesson:', lesson);
      }} />
    </div>
  );
};
```

## Error Handling

Catalog component sẽ hiển thị error alert khi có lỗi xảy ra trong quá trình tải dữ liệu từ API.

## Loading States

Tất cả các filter components đều có loading state và sẽ disable khi đang tải dữ liệu.
