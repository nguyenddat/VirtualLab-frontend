'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCatalogSWR } from '../hooks/use-catalog-swr';
import { useMemo } from 'react';

interface ChapterFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  bookFilter?: string;
}

export const ChapterFilter = ({ 
  value, 
  onValueChange, 
  placeholder = "Chọn chương",
  bookFilter
}: ChapterFilterProps) => {
  const { chapters, chaptersLoading } = useCatalogSWR();

  const filteredChapters = useMemo(() => {
    return bookFilter && bookFilter !== 'all'
      ? chapters.filter(chapter => chapter.book_id === bookFilter)
      : chapters;
  }, [chapters, bookFilter]);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={chaptersLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={chaptersLoading ? "Đang tải..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả chương</SelectItem>
        {filteredChapters.map((chapter) => (
          <SelectItem key={chapter.id} value={chapter.id}>
            {chapter.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
