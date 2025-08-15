import type {
  TeachingProgress,
  StudentAssignmentStats,
  SubjectProgress,
  ClassPerformance,
  TeacherOverviewStats,
} from "../utils/types";

// Mock data cho thống kê tổng quan
const mockOverviewStats: TeacherOverviewStats = {
  totalStudents: 156,
  totalLessons: 24,
  completedLessons: 18,
  averageCompletionRate: 75,
  activeClasses: 8,
  pendingAssignments: 12,
};

// Mock data cho tiến độ dạy học (30 ngày gần nhất)
const mockTeachingProgress: TeachingProgress[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  return {
    date: date.toISOString().split('T')[0],
    completedLessons: Math.floor(Math.random() * 5) + 1,
    totalLessons: Math.floor(Math.random() * 8) + 3,
    completionRate: Math.floor(Math.random() * 40) + 60, // 60-100%
  };
});

// Mock data cho thống kê bài tập học sinh
const mockStudentAssignmentStats: StudentAssignmentStats = {
  totalStudents: 156,
  completedAssignments: 89,
  pendingAssignments: 45,
  overdueAssignments: 22,
  completionRate: 57,
};

// Mock data cho tiến độ theo môn học
const mockSubjectProgress: SubjectProgress[] = [
  {
    subject: "Toán học",
    completedLessons: 8,
    totalLessons: 10,
    completionRate: 80,
    studentsEngaged: 45,
  },
  {
    subject: "Vật lý",
    completedLessons: 6,
    totalLessons: 8,
    completionRate: 75,
    studentsEngaged: 38,
  },
  {
    subject: "Hóa học",
    completedLessons: 4,
    totalLessons: 6,
    completionRate: 67,
    studentsEngaged: 32,
  },
];

// Mock data cho hiệu suất lớp học
const mockClassPerformance: ClassPerformance[] = [
  {
    className: "10A1",
    averageScore: 8.5,
    totalStudents: 35,
    activeStudents: 32,
    completionRate: 91,
  },
  {
    className: "10A2",
    averageScore: 7.8,
    totalStudents: 38,
    activeStudents: 35,
    completionRate: 92,
  },
  {
    className: "11A1",
    averageScore: 8.2,
    totalStudents: 42,
    activeStudents: 39,
    completionRate: 93,
  },
  {
    className: "11A2",
    averageScore: 7.5,
    totalStudents: 41,
    activeStudents: 36,
    completionRate: 88,
  },
];

export const teacherOverviewStatsService = {
  // Lấy thống kê tổng quan
  getOverviewStats: async (): Promise<TeacherOverviewStats> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOverviewStats;
  },

  // Lấy dữ liệu tiến độ dạy học
  getTeachingProgress: async (period: string = "30d"): Promise<TeachingProgress[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTeachingProgress;
  },

  // Lấy thống kê bài tập học sinh
  getStudentAssignmentStats: async (): Promise<StudentAssignmentStats> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockStudentAssignmentStats;
  },

  // Lấy tiến độ theo môn học
  getSubjectProgress: async (): Promise<SubjectProgress[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSubjectProgress;
  },

  // Lấy hiệu suất lớp học
  getClassPerformance: async (): Promise<ClassPerformance[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockClassPerformance;
  },
};
