"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookOpen, Globe, Lock, FileText } from "lucide-react";
import type { CreateLessonData } from "../utils/types";
import { useCatalogSWR } from "@/features/catalog/hooks/use-catalog-swr";

interface CreateLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateLessonData) => Promise<void>;
}

export const CreateLessonDialog = ({ open, onOpenChange, onSubmit }: CreateLessonDialogProps) => {
  const [formData, setFormData] = useState<CreateLessonData>({
    name: "",
    description: "",
    status: "blank", // Default value, will be auto-updated
    public_status: "private",
    chapter_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get catalog data for dropdowns - this will be cached by SWR
  const { subjects, booksets, books, chapters, isLoading: catalogLoading } = useCatalogSWR();

  // State for selected values
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedBookset, setSelectedBookset] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");

  // Filter books based on selected subject and bookset
  const filteredBooks = books.filter(book => {
    // If both subject and bookset are selected, show books that match either
    if (selectedSubject && selectedBookset) {
      return String(book.subject_id) === selectedSubject || String(book.bookset_id) === selectedBookset;
    }
    // If only subject is selected
    if (selectedSubject && !selectedBookset) {
      return String(book.subject_id) === selectedSubject;
    }
    // If only bookset is selected
    if (!selectedSubject && selectedBookset) {
      return String(book.bookset_id) === selectedBookset;
    }
    // If neither is selected, show all books
    return true;
  });

  // Filter chapters based on selected book
  const filteredChapters = chapters.filter(chapter => {
    if (selectedBook && String(chapter.book_id) !== selectedBook) return false;
    return true;
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        description: "",
        status: "blank",
        public_status: "private",
        chapter_id: "",
      });
      setSelectedSubject("");
      setSelectedBookset("");
      setSelectedBook("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateLessonData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (value: string) => {
    console.log('Selected subject value:', value, typeof value);
    console.log('Available subjects:', subjects);
    setSelectedSubject(value);
    // Only clear book and chapter if the new subject doesn't match the current book
    if (selectedBook) {
      const currentBook = books.find(b => String(b.id) === selectedBook);
      if (currentBook && String(currentBook.subject_id) !== value) {
        setSelectedBook("");
        setFormData(prev => ({ ...prev, chapter_id: "" }));
      }
    }
  };

  const handleBooksetChange = (value: string) => {
    console.log('Selected bookset value:', value, typeof value);
    console.log('Available booksets:', booksets);
    setSelectedBookset(value);
    // Only clear book and chapter if the new bookset doesn't match the current book
    if (selectedBook) {
      const currentBook = books.find(b => String(b.id) === selectedBook);
      if (currentBook && String(currentBook.bookset_id) !== value) {
        setSelectedBook("");
        setFormData(prev => ({ ...prev, chapter_id: "" }));
      }
    }
  };

  const handleBookChange = (value: string) => {
    console.log('Selected book value:', value, typeof value);
    console.log('Available books:', filteredBooks);
    setSelectedBook(value);
    setFormData(prev => ({ ...prev, chapter_id: "" }));
  };

  const isFormValid = formData.name.trim() && formData.chapter_id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[95vh] h-[95vh] flex flex-col">
        <DialogHeader className="pb-4 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Tạo thí nghiệm mới
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Điền thông tin để tạo một thí nghiệm mới cho học sinh của bạn
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {/* Basic Information Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <FileText className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Thông tin cơ bản</h3>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Tên thí nghiệm <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ví dụ: Thí nghiệm mạch điện đơn giản"
                    className="h-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category and Status Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Phân loại & Trạng thái</h3>
              </div>
              
              <div className="space-y-3">
                {/* Row 1: Subject, Bookset, Public Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Môn học
                    </Label>
                    <Select value={selectedSubject} onValueChange={handleSubjectChange} disabled={catalogLoading}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder={catalogLoading ? "Đang tải..." : "Chọn môn học"} />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={String(subject.id)}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookset" className="text-sm font-medium">
                      Bộ sách
                    </Label>
                    <Select value={selectedBookset} onValueChange={handleBooksetChange} disabled={catalogLoading}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder={catalogLoading ? "Đang tải..." : "Chọn bộ sách"} />
                      </SelectTrigger>
                      <SelectContent>
                        {booksets.map((bookset) => (
                          <SelectItem key={bookset.id} value={String(bookset.id)}>
                            {bookset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="public_status" className="text-sm font-medium">
                      Trạng thái công khai <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.public_status} onValueChange={(value: 'private' | 'public') => handleInputChange("public_status", value)}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Riêng tư
                          </div>
                        </SelectItem>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Công khai
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 2: Book and Chapter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="book" className="text-sm font-medium">
                      Sách
                    </Label>
                                          <Select 
                        value={selectedBook} 
                        onValueChange={handleBookChange} 
                        disabled={catalogLoading || (!selectedSubject && !selectedBookset)}
                      >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder={
                          catalogLoading ? "Đang tải..." : 
                          (!selectedSubject && !selectedBookset) ? "Chọn môn học hoặc bộ sách trước" :
                          "Chọn sách"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredBooks.map((book) => (
                          <SelectItem key={book.id} value={String(book.id)}>
                            {book.name} - Lớp {book.grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chapter" className="text-sm font-medium">
                      Chương <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.chapter_id} 
                      onValueChange={(value) => handleInputChange("chapter_id", value)} 
                      disabled={catalogLoading || !selectedBook}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder={
                          catalogLoading ? "Đang tải..." : 
                          !selectedBook ? "Chọn sách trước" :
                          "Chọn chương"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredChapters.map((chapter) => (
                          <SelectItem key={chapter.id} value={String(chapter.id)}>
                            {chapter.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <FileText className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Mô tả</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Mô tả thí nghiệm
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Mô tả ngắn gọn về thí nghiệm, mục tiêu học tập, các bước thực hiện..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="px-6"
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !isFormValid || catalogLoading}
              className="px-6"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tạo thí nghiệm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
