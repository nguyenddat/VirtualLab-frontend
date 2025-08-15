import useSWR from "swr";
import { teacherOverviewStatsService } from "../services/teacher-overview-stats";

export const useTeacherOverviewSWR = () => {
  // Thống kê tổng quan
  const {
    data: overviewStats,
    error: overviewStatsError,
    isLoading: isLoadingOverviewStats,
  } = useSWR("teacher/overview/stats", teacherOverviewStatsService.getOverviewStats);

  // Tiến độ dạy học
  const {
    data: teachingProgressData,
    error: teachingProgressError,
    isLoading: isLoadingTeachingProgress,
  } = useSWR("teacher/overview/teaching-progress", () =>
    teacherOverviewStatsService.getTeachingProgress("30d")
  );

  // Thống kê bài tập học sinh
  const {
    data: studentAssignmentStats,
    error: studentAssignmentError,
    isLoading: isLoadingStudentAssignment,
  } = useSWR("teacher/overview/student-assignments", teacherOverviewStatsService.getStudentAssignmentStats);

  // Tiến độ theo môn học
  const {
    data: subjectProgressData,
    error: subjectProgressError,
    isLoading: isLoadingSubjectProgress,
  } = useSWR("teacher/overview/subject-progress", teacherOverviewStatsService.getSubjectProgress);

  // Hiệu suất lớp học
  const {
    data: classPerformanceData,
    error: classPerformanceError,
    isLoading: isLoadingClassPerformance,
  } = useSWR("teacher/overview/class-performance", teacherOverviewStatsService.getClassPerformance);

  return {
    // Overview stats
    overviewStats,
    overviewStatsError,
    isLoadingOverviewStats,

    // Teaching progress
    teachingProgressData,
    teachingProgressError,
    isLoadingTeachingProgress,

    // Student assignment stats
    studentAssignmentStats,
    studentAssignmentError,
    isLoadingStudentAssignment,

    // Subject progress
    subjectProgressData,
    subjectProgressError,
    isLoadingSubjectProgress,

    // Class performance
    classPerformanceData,
    classPerformanceError,
    isLoadingClassPerformance,
  };
};
