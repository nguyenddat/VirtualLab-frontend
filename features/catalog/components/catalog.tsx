'use client';

import PageHeading from '@/components/common/page-heading';
import { CatalogFiltersComponent } from './catalog-filters';
import { CatalogGrid } from './catalog-grid';
import { Lesson } from '../utils/types';
import { useCatalog } from '../hooks/use-catalog';

interface CatalogProps {
  lessons?: Lesson[];
  onLessonSelect?: (lesson: Lesson) => void;
}

export const Catalog = ({ lessons, onLessonSelect }: CatalogProps) => {
  const {
    lessons: filteredLessons,
    filters,
    loading,
    updateFilters,
    getFilterStats,
  } = useCatalog(lessons);

  const handleFiltersChange = (newFilters: any) => {
    updateFilters(newFilters);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    onLessonSelect?.(lesson);
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Danh mục bài học"
        subtitle="Khám phá các bài học theo môn học, bộ sách và chủ đề"
      />

      <CatalogFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          Tìm thấy {getFilterStats().filteredCount} bài học
          {getFilterStats().activeFilters > 0 && (
            <span className="ml-2 text-xs bg-muted px-2 py-1 rounded">
              {getFilterStats().activeFilters} bộ lọc đang hoạt động
            </span>
          )}
        </div>
      </div>

      <CatalogGrid
        lessons={filteredLessons}
        onLessonSelect={handleLessonSelect}
        loading={loading}
      />
    </div>
  );
};
