'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_TEXTBOOKS } from '../utils/constants';

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
  const filteredTextbooks = subjectFilter && subjectFilter !== 'all'
    ? SAMPLE_TEXTBOOKS.filter(book => book.subject === subjectFilter)
    : SAMPLE_TEXTBOOKS;

  // Loại bỏ các bộ sách trùng lặp dựa trên tên và nhà xuất bản
  const uniqueTextbooks = filteredTextbooks.reduce((acc, textbook) => {
    const key = `${textbook.name}-${textbook.publisher}`;
    if (!acc.find(item => `${item.name}-${item.publisher}` === key)) {
      acc.push(textbook);
    }
    return acc;
  }, [] as typeof SAMPLE_TEXTBOOKS);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả bộ sách</SelectItem>
        {uniqueTextbooks.map((textbook) => (
          <SelectItem key={`${textbook.name}-${textbook.publisher}`} value={`${textbook.name}-${textbook.publisher}`}>
            {textbook.name} - {textbook.publisher}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
