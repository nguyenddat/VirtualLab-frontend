'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCatalogSWR } from '../hooks/use-catalog-swr';

interface BookFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  booksetFilter?: string;
}

export const BookFilter = ({ 
  value, 
  onValueChange, 
  placeholder = "Chọn sách",
  booksetFilter 
}: BookFilterProps) => {
  const { books, booksLoading } = useCatalogSWR();
  
  const filteredBooks = booksetFilter && booksetFilter !== 'all'
    ? books.filter(book => book.bookset_id === booksetFilter)
    : books;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={booksLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={booksLoading ? "Đang tải..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả sách</SelectItem>
        {filteredBooks.map((book) => (
          <SelectItem key={book.id} value={book.id}>
            {book.name} (Lớp {book.grade})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
