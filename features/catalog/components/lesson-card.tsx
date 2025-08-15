'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, ArrowRight, Lock, Globe, CheckCircle, Circle } from 'lucide-react';
import { Lesson } from '../utils/types';
import { useCatalogSWR } from '../hooks/use-catalog-swr';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LessonCardProps {
  lesson: Lesson;
  onSelect?: (lesson: Lesson) => void;
}

export const LessonCard = ({ lesson, onSelect }: LessonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { subjects, chapters, booksets, books } = useCatalogSWR();

  // Tìm chapter từ chapter_id
  const chapter = chapters.find(c => c.id === lesson.chapter_id);
  // Tìm book từ chapter's book_id
  const book = chapter ? books.find(b => b.id === chapter.book_id) : null;
  // Tìm bookset từ book's bookset_id
  const bookset = book ? booksets.find(b => b.id === book.bookset_id) : null;
  // Tìm subject từ book's subject_id
  const subject = book ? subjects.find(s => s.id === book.subject_id) : null;

  // Debug: Log thông tin để kiểm tra
  console.log('LessonCard Debug:', {
    lessonId: lesson.id,
    chapterId: lesson.chapter_id,
    chapter: chapter?.name,
    bookset: bookset?.name,
    book: book?.name,
    subject: subject?.name,
    booksetsCount: booksets.length,
    booksCount: books.length,
    subjectsCount: subjects.length
  });

  const handleSimulationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Sử dụng lesson.id làm experiment_id
    router.push(`/simulation?experiment_id=${lesson.id}`);
  };

  // Helper function to get status badge
  const getStatusBadge = () => {
    if (lesson.status === 'populated') {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Đã có dữ liệu
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        <Circle className="w-3 h-3 mr-1" />
        Chưa có dữ liệu
      </Badge>
    );
  };

  // Helper function to get public status badge
  const getPublicStatusBadge = () => {
    if (lesson.public_status === 'public') {
      return (
        <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
          <Globe className="w-3 h-3 mr-1" />
          Công khai
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">
        <Lock className="w-3 h-3 mr-1" />
        Riêng tư
      </Badge>
    );
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col border-0 shadow-md hover:shadow-2xl min-h-[420px] ${
        isHovered ? 'ring-2 ring-primary/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(lesson)}
    >
             {/* Header with gradient background */}
       <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 pb-4">
         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent dark:from-blue-800/20 rounded-full -translate-y-16 translate-x-16"></div>
         
         {/* Status badges */}
         <div className="flex gap-2 mb-3">
           {getStatusBadge()}
           {getPublicStatusBadge()}
         </div>
         
         {/* Title */}
         <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 leading-tight">
           {lesson.name}
         </h3>
         
         {/* Description */}
         <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
           {lesson.description || 'Chưa có mô tả cho thí nghiệm này.'}
         </p>
       </div>

            {/* Content */}
      <CardContent className="p-6 pt-4 flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          {/* Info Grid - Grade and Subject on same row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Grade */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {book ? `Lớp ${book.grade}` : 'Lớp 11'}
              </span>
            </div>
            
            {/* Subject */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {subject ? subject.name : 'Chưa có môn học'}
              </span>
            </div>
          </div>

                       {/* BookSet Information */}
            <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg border border-purple-200/50 dark:border-purple-800/30">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                  Bộ sách
                </span>
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {bookset ? bookset.name : 'Chưa có bộ sách'}
              </p>
            </div>

           {/* Chapter Information */}
           {chapter && (
             <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                 {chapter.name}
               </span>
             </div>
           )}

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Action Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]"
            size="lg"
            onClick={handleSimulationClick}
          >
            <Play className="w-5 h-5 mr-2" />
            Thực hành thí nghiệm
            <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
