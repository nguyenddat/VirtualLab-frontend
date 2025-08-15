export interface TeachingProgress {
  date: string;
  completedLessons: number;
  totalLessons: number;
  completionRate: number;
}

export interface StudentAssignmentStats {
  totalStudents: number;
  completedAssignments: number;
  pendingAssignments: number;
  overdueAssignments: number;
  completionRate: number;
}

export interface SubjectProgress {
  subject: string;
  completedLessons: number;
  totalLessons: number;
  completionRate: number;
  studentsEngaged: number;
}

export interface ClassPerformance {
  className: string;
  averageScore: number;
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
}

export interface TeacherOverviewStats {
  totalStudents: number;
  totalLessons: number;
  completedLessons: number;
  averageCompletionRate: number;
  activeClasses: number;
  pendingAssignments: number;
}
