"use client";

import { useState } from 'react';
import PageHeading from '@/components/common/page-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Play, BookOpen, Lock, Globe, CheckCircle, Circle } from 'lucide-react';
import { useTeacherLessonsSWR } from '../hooks/use-teacher-lessons-swr';
import { TeacherLesson } from '../utils/types';
import ErrorAlert from '@/components/common/error-alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthContext } from '@/features/auth/contexts/auth-context';
import { CreateLessonDialog } from './create-lesson-dialog';
import { useCatalogSWR } from '@/features/catalog/hooks/use-catalog-swr';
import { useRouter } from 'next/navigation';

// Custom Lesson Card for Management
const ManagementLessonCard = ({ 
  lesson, 
  onEdit, 
  onDelete 
}: { 
  lesson: TeacherLesson; 
  onEdit: (lesson: TeacherLesson) => void; 
  onDelete: (lesson: TeacherLesson) => void; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { subjects, chapters, booksets, books } = useCatalogSWR();
  const router = useRouter();

  // Tìm chapter từ chapter_id
  const chapter = chapters.find(c => c.id === lesson.chapter_id);
  // Tìm book từ chapter's book_id
  const book = chapter ? books.find(b => b.id === chapter.book_id) : null;
  // Tìm bookset từ book's bookset_id
  const bookset = book ? booksets.find(b => b.id === book.bookset_id) : null;
  // Tìm subject từ book's subject_id
  const subject = book ? subjects.find(s => s.id === book.subject_id) : null;

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
    >
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 pb-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent dark:from-blue-800/20 rounded-full -translate-y-16 translate-x-16"></div>
        
        {/* Management buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(lesson);
            }}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(lesson);
            }}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Status badges */}
        <div className="flex gap-2 mb-3">
          {getStatusBadge()}
          {getPublicStatusBadge()}
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 leading-tight pr-16">
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
            onClick={() => router.push(`/teacher/experiments/${lesson.id}/edit`)}
          >
            <Play className="w-5 h-5 mr-2" />
            Chỉnh sửa thí nghiệm
            <Edit className={`w-5 h-5 ml-2 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Loading Skeleton
const LessonCardSkeleton = () => (
  <Card className="h-full flex flex-col border-0 shadow-md min-h-[420px]">
    <div className="p-6 pb-4">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full" />
    </div>
    <CardContent className="p-6 pt-4 flex-1 flex flex-col">
      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-6 w-24" />
        <div className="flex-1"></div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TeacherLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState<TeacherLesson | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const { user } = useAuthContext();
  const {
    lessons: filteredLessons,
    error,
    isLoading,
    createLesson,
    updateLesson,
    deleteLesson,
    changeLessonStatus,
  } = useTeacherLessonsSWR(user?.id ? parseInt(user.id) : 0);

  // Don't render if user is not available
  if (!user?.id) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">Vui lòng đăng nhập để xem bài giảng của bạn</p>
          </div>
        </div>
      </div>
    );
  }

  const handleFiltersChange = (newFilters: any) => {
    // TODO: Implement filters for teacher lessons
    console.log('Filters changed:', newFilters);
  };

  const handleCreateLesson = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateLessonSubmit = async (data: any) => {
    try {
      await createLesson(data);
      // Dialog will close automatically after successful creation
      // The SWR hook will automatically revalidate and update the UI
    } catch (error) {
      console.error('Error creating lesson:', error);
      // You might want to show an error toast here
    }
  };

  const handleEditLesson = (lesson: TeacherLesson) => {
    // TODO: Implement edit lesson functionality
    console.log('Edit lesson:', lesson);
  };

  const handleDeleteLesson = (lesson: TeacherLesson) => {
    // TODO: Implement delete lesson functionality
    console.log('Delete lesson:', lesson);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeading
            title="Quản lý bài giảng"
            subtitle="Tạo, chỉnh sửa và quản lý các bài giảng của bạn"
          />
          <Button onClick={handleCreateLesson}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo bài giảng
          </Button>
        </div>

        {error && (
          <ErrorAlert
            title="Lỗi tải dữ liệu"
            description="Không thể tải dữ liệu từ máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại."
            variant="destructive"
            showCloseButton={true}
          />
        )}

        {/* CatalogFiltersComponent is removed as per new_code, assuming it's not needed here */}

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            Tìm thấy {Array.isArray(filteredLessons) ? filteredLessons.length : 0} bài giảng
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Chế độ quản lý</span>
          </div>
        </div>

        {/* Custom Grid with Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <LessonCardSkeleton key={index} />
            ))
          ) : !Array.isArray(filteredLessons) || filteredLessons.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <p className="text-muted-foreground">Chưa có bài giảng nào</p>
                    <Button variant="outline" className="mt-2" onClick={handleCreateLesson}>
                      Tạo bài giảng đầu tiên
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredLessons.map((lesson) => (
              <ManagementLessonCard
                key={lesson.id}
                lesson={lesson}
                onEdit={handleEditLesson}
                onDelete={handleDeleteLesson}
              />
            ))
                     )}
         </div>
       </div>

       {/* Create Lesson Dialog */}
       <CreateLessonDialog
         open={isCreateDialogOpen}
         onOpenChange={setIsCreateDialogOpen}
         onSubmit={handleCreateLessonSubmit}
       />
     </div>
   );
 };
