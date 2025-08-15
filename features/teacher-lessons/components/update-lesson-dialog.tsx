"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { UpdateLessonData, TeacherLesson } from "../utils/types";

interface UpdateLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: TeacherLesson | null;
  onSubmit: (data: UpdateLessonData) => Promise<void>;
}

export const UpdateLessonDialog = ({ open, onOpenChange, lesson, onSubmit }: UpdateLessonDialogProps) => {
  const [formData, setFormData] = useState<UpdateLessonData>({
    name: "",
    description: "",
    status: "blank",
    public_status: "private",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (lesson) {
      setFormData({
        name: lesson.name,
        description: lesson.description,
        status: lesson.status,
        public_status: lesson.public_status,
      });
    }
  }, [lesson]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error updating lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof UpdateLessonData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cập nhật bài giảng</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên bài giảng *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nhập tên bài giảng"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Mô tả ngắn gọn về bài giảng"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blank">Trống</SelectItem>
                  <SelectItem value="populated">Đã có nội dung</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="public_status">Trạng thái công khai</Label>
              <Select value={formData.public_status} onValueChange={(value) => handleInputChange("public_status", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái công khai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Riêng tư</SelectItem>
                  <SelectItem value="public">Công khai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cập nhật
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
