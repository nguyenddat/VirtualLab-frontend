import type { TeacherLesson, CreateLessonData, UpdateLessonData, LessonFilters } from "../utils/types";
import { API_ENDPOINTS, apiHelpers } from '@/lib/configs/api';

export const teacherLessonsService = {
  // Lấy danh sách bài giảng của giáo viên
  getLessons: async (userId: number, filters?: LessonFilters, offset?: number, limit?: number): Promise<TeacherLesson[]> => {
    try {
      const url = apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.USER_EXPERIMENTS(userId, offset, limit));
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const experiments: TeacherLesson[] = await response.json();
      
      // Apply client-side filters if needed
      let filteredExperiments = experiments;
      
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredExperiments = filteredExperiments.filter(experiment => 
          experiment.name.toLowerCase().includes(searchTerm) ||
          experiment.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters?.status) {
        // Map teacher status to experiment status
        const statusMap: Record<string, 'blank' | 'populated'> = {
          'draft': 'blank',
          'published': 'populated',
          'archived': 'blank'
        };
        const targetStatus = statusMap[filters.status];
        if (targetStatus) {
          filteredExperiments = filteredExperiments.filter(experiment => experiment.status === targetStatus);
        }
      }
      
      return filteredExperiments;
    } catch (error) {
      console.error('Error fetching teacher lessons:', error);
      throw error;
    }
  },

  // Lấy chi tiết bài giảng
  getLesson: async (id: string): Promise<TeacherLesson> => {
    try {
      const response = await fetch(apiHelpers.buildUrl(`/experiment/${id}`));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching lesson details:', error);
      throw error;
    }
  },

  // Tạo bài giảng mới
  createLesson: async (userId: number, data: CreateLessonData): Promise<TeacherLesson> => {
    try {
      const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.CREATE_EXPERIMENT(userId)), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  },

  // Cập nhật bài giảng
  updateLesson: async (id: string, data: UpdateLessonData): Promise<TeacherLesson> => {
    try {
      const response = await fetch(apiHelpers.buildUrl(`/experiment/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  },

  // Xóa bài giảng
  deleteLesson: async (id: string): Promise<void> => {
    try {
      const response = await fetch(apiHelpers.buildUrl(`/experiment/${id}`), {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  },

  // Thay đổi trạng thái bài giảng
  changeLessonStatus: async (id: string, status: 'draft' | 'published' | 'archived'): Promise<TeacherLesson> => {
    try {
      // Map teacher status to experiment public_status
      const publicStatusMap: Record<string, 'private' | 'public'> = {
        'draft': 'private',
        'published': 'public',
        'archived': 'private'
      };
      
      const publicStatus = publicStatusMap[status];
      
      const response = await fetch(apiHelpers.buildUrl(`/experiment/${id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_status: publicStatus
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error changing lesson status:', error);
      throw error;
    }
  },
};
