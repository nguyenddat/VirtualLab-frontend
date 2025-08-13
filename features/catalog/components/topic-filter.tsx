'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCatalogSWR } from '../hooks/use-catalog-swr';
import { useMemo } from 'react';

interface TopicFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  subjectFilter?: string;
  chapterFilter?: string;
  gradeFilter?: string;
}

export const TopicFilter = ({ 
  value, 
  onValueChange, 
  placeholder = "Chọn chủ đề",
  subjectFilter,
  chapterFilter,
  gradeFilter
}: TopicFilterProps) => {
  const { experiments, experimentsLoading } = useCatalogSWR();
  
  // Vì API không cung cấp thông tin topic, hiển thị thông báo
  return (
    <Select value={value} onValueChange={onValueChange} disabled={true}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Không có dữ liệu" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Không có dữ liệu</SelectItem>
      </SelectContent>
    </Select>
  );
};
