'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCatalogSWR } from '../hooks/use-catalog-swr';

interface SubjectFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const SubjectFilter = ({ value, onValueChange, placeholder = "Chọn môn học" }: SubjectFilterProps) => {
  const { subjects, subjectsLoading } = useCatalogSWR();

  return (
    <Select value={value} onValueChange={onValueChange} disabled={subjectsLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={subjectsLoading ? "Đang tải..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả môn học</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject.id} value={subject.id}>
            {subject.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
