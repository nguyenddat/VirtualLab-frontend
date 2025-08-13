'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCatalogSWR } from '../hooks/use-catalog-swr';

interface TextbookFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  subjectFilter?: string;
}

export const TextbookFilter = ({ 
  value, 
  onValueChange, 
  placeholder = "Chọn bộ sách",
  subjectFilter 
}: TextbookFilterProps) => {
  const { books, booksLoading } = useCatalogSWR();
  
  const filteredTextbooks = subjectFilter && subjectFilter !== 'all'
    ? books.filter(book => book.subject_id === subjectFilter)
    : books;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={booksLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={booksLoading ? "Đang tải..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả bộ sách</SelectItem>
        {filteredTextbooks.map((textbook) => (
          <SelectItem key={textbook.id} value={textbook.id}>
            {textbook.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
