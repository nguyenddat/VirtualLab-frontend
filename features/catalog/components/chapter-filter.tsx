'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_CHAPTERS, SAMPLE_TEXTBOOKS, SAMPLE_LESSONS } from '../utils/constants';

interface ChapterFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  subjectFilter?: string;
  textbookFilter?: string;
  gradeFilter?: string;
}

export const ChapterFilter = ({ 
  value, 
  onValueChange, 
  placeholder = "Chọn chương",
  subjectFilter,
  textbookFilter,
  gradeFilter
}: ChapterFilterProps) => {
  const filteredChapters = SAMPLE_CHAPTERS.filter(chapter => {
    if (subjectFilter && subjectFilter !== 'all' && chapter.subject !== subjectFilter) return false;
    if (textbookFilter && textbookFilter !== 'all') {
      const textbook = SAMPLE_TEXTBOOKS.find(t => t.id === chapter.textbook);
      if (!textbook || `${textbook.name}-${textbook.publisher}` !== textbookFilter) return false;
    }
    if (gradeFilter && gradeFilter !== 'all') {
      // Kiểm tra xem có bài học nào thuộc chương này và lớp được chọn không
      const hasLessonInGrade = SAMPLE_LESSONS.some(lesson => 
        lesson.chapter === chapter.id && lesson.grade === gradeFilter
      );
      if (!hasLessonInGrade) return false;
    }
    return true;
  });

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả chương</SelectItem>
        {filteredChapters.map((chapter) => (
          <SelectItem key={chapter.id} value={chapter.id}>
            Chương {chapter.number}: {chapter.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
