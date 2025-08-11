'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_TOPICS, SAMPLE_LESSONS } from '../utils/constants';

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
  const filteredTopics = SAMPLE_TOPICS.filter(topic => {
    if (subjectFilter && subjectFilter !== 'all' && topic.subject !== subjectFilter) return false;
    if (chapterFilter && chapterFilter !== 'all' && topic.chapter !== chapterFilter) return false;
    if (gradeFilter && gradeFilter !== 'all') {
      // Kiểm tra xem có bài học nào thuộc chủ đề này và lớp được chọn không
      const hasLessonInGrade = SAMPLE_LESSONS.some(lesson => 
        lesson.topic === topic.id && lesson.grade === gradeFilter
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
        <SelectItem value="all">Tất cả chủ đề</SelectItem>
        {filteredTopics.map((topic) => (
          <SelectItem key={topic.id} value={topic.id}>
            {topic.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
