"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import type { TeacherLesson } from "../utils/types";

interface DeleteLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: TeacherLesson | null;
  onConfirm: () => Promise<void>;
}

export const DeleteLessonDialog = ({ open, onOpenChange, lesson, onConfirm }: DeleteLessonDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error deleting lesson:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Xác nhận xóa bài giảng
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa bài giảng "{lesson.name}"? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Thông tin bài giảng:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Tên:</strong> {lesson.name}</p>
              <p><strong>Mô tả:</strong> {lesson.description}</p>
              <p><strong>Trạng thái:</strong> {lesson.status}</p>
              <p><strong>Học sinh:</strong> {lesson.studentCount || 0}</p>
              <p><strong>Tỷ lệ hoàn thành:</strong> {lesson.completionRate || 0}%</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isDeleting}
            >
              Hủy
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xóa bài giảng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
