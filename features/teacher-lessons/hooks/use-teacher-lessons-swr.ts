import useSWR, { mutate } from "swr";
import { teacherLessonsService } from "../services/teacher-lessons";
import type { LessonFilters, CreateLessonData, UpdateLessonData } from "../utils/types";

export const useTeacherLessonsSWR = (userId: number, filters?: LessonFilters, offset?: number, limit?: number) => {
  const cacheKey = userId > 0 ? `teacher/lessons/${userId}?${new URLSearchParams({
    ...(filters as Record<string, string>),
    ...(offset !== undefined && { offset: offset.toString() }),
    ...(limit !== undefined && { limit: limit.toString() })
  }).toString()}` : null;

  const {
    data: lessons,
    error,
    isLoading,
  } = useSWR(
    cacheKey,
    () => teacherLessonsService.getLessons(userId, filters, offset, limit)
  );

  const createLesson = async (data: CreateLessonData) => {
    try {
      const newLesson = await teacherLessonsService.createLesson(userId, data);
      // Mutate all teacher lessons cache keys for this user
      await mutate(`teacher/lessons/${userId}`);
      // Also mutate the specific cache key if it exists
      if (cacheKey) {
        await mutate(cacheKey);
      }
      return newLesson;
    } catch (error) {
      throw error;
    }
  };

  const updateLesson = async (id: string, data: UpdateLessonData) => {
    try {
      const updatedLesson = await teacherLessonsService.updateLesson(id, data);
      await mutate(`teacher/lessons/${userId}`);
      return updatedLesson;
    } catch (error) {
      throw error;
    }
  };

  const deleteLesson = async (id: string) => {
    try {
      await teacherLessonsService.deleteLesson(id);
      await mutate(`teacher/lessons/${userId}`);
    } catch (error) {
      throw error;
    }
  };

  const changeLessonStatus = async (id: string, status: 'draft' | 'published' | 'archived') => {
    try {
      const updatedLesson = await teacherLessonsService.changeLessonStatus(id, status);
      await mutate(`teacher/lessons/${userId}`);
      return updatedLesson;
    } catch (error) {
      throw error;
    }
  };

  return {
    lessons: Array.isArray(lessons) ? lessons : [],
    error,
    isLoading,
    createLesson,
    updateLesson,
    deleteLesson,
    changeLessonStatus,
  };
};
