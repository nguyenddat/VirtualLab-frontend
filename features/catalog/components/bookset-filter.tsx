'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCatalogSWR } from '../hooks/use-catalog-swr';

interface BookSetFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const BookSetFilter = ({ 
  value, 
  onValueChange, 
  placeholder = "Chọn bộ sách"
}: BookSetFilterProps) => {
  const { booksets, booksetsLoading } = useCatalogSWR();

  return (
    <Select value={value} onValueChange={onValueChange} disabled={booksetsLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={booksetsLoading ? "Đang tải..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả bộ sách</SelectItem>
        {booksets.map((bookset) => (
          <SelectItem key={bookset.id} value={bookset.id}>
            {bookset.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
