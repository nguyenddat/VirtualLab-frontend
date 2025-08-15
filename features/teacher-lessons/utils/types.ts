export interface TeacherLesson {
  id: string;
  name: string;
  description: string;
  status: 'blank' | 'populated';
  public_status: 'private' | 'public';
  chapter_id: string;
  created_by: string;
  // Additional fields for teacher dashboard
  studentCount?: number;
  completionRate?: number;
  averageScore?: number;
}

export interface CreateLessonData {
  name: string;
  description: string;
  status: 'blank' | 'populated';
  public_status: 'private' | 'public';
  chapter_id: string;
}

export interface UpdateLessonData extends Partial<CreateLessonData> {
  status?: 'blank' | 'populated';
  public_status?: 'private' | 'public';
}

export interface LessonFilters {
  subject?: string;
  grade?: string;
  topic?: string;
  status?: 'draft' | 'published' | 'archived';
  search?: string;
}
