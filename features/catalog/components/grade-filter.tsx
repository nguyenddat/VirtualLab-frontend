'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCatalogSWR } from '../hooks/use-catalog-swr';
import { useMemo } from 'react';

interface GradeFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const GradeFilter = ({ 
  value, 
  onValueChange, 
  placeholder = "Chọn lớp"
}: GradeFilterProps) => {
  const { books, booksLoading } = useCatalogSWR();

  const grades = useMemo(() => {
    const uniqueGrades = [...new Set(books.map(book => book.grade))];
    return uniqueGrades.sort((a, b) => {
      // Sort grades numerically (e.g., "10", "11", "12")
      const gradeA = parseInt(a, 10);
      const gradeB = parseInt(b, 10);
      return gradeA - gradeB;
    });
  }, [books]);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={booksLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={booksLoading ? "Đang tải..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả lớp</SelectItem>
        {grades.map((grade) => (
          <SelectItem key={grade} value={grade}>
            Lớp {grade}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
