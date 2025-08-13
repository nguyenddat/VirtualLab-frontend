'use client';

import { useState } from 'react';
import { LessonCard } from './lesson-card';
import { Lesson } from '../utils/types';
import EmptyData from '@/components/common/empty-data';

interface CatalogGridProps {
  lessons: Lesson[];
  onLessonSelect?: (lesson: Lesson) => void;
  loading?: boolean;
}

export const CatalogGrid = ({ lessons, onLessonSelect, loading = false }: CatalogGridProps) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    onLessonSelect?.(lesson);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-fr">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse h-full">
            <div className="bg-muted rounded-lg h-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <EmptyData
        message="Không tìm thấy bài học. Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-fr">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onSelect={handleLessonSelect}
        />
      ))}
    </div>
  );
};
