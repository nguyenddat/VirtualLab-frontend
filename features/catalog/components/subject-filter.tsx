'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_SUBJECTS } from '../utils/constants';

interface SubjectFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const SubjectFilter = ({ value, onValueChange, placeholder = "Chọn môn học" }: SubjectFilterProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả môn học</SelectItem>
        {SAMPLE_SUBJECTS.map((subject) => (
          <SelectItem key={subject.id} value={subject.id}>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: subject.color }}
              />
              {subject.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
