import { Subject, BookSet, Book, Chapter, Lesson } from '../utils/types';
import { API_ENDPOINTS, apiHelpers } from '@/lib/configs/api';

export const catalogService = {
  // Lấy danh sách các môn học
  async getSubjects(): Promise<Subject[]> {
    try {
      const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.SUBJECTS));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  },

  // Lấy danh sách các bộ sách
  async getBookSets(): Promise<BookSet[]> {
    try {
      const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.BOOK_SETS));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching booksets:', error);
      throw error;
    }
  },

  // Lấy danh sách các sách
  async getBooks(): Promise<Book[]> {
    try {
      const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.BOOKS));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Lấy danh sách các chapter
  async getChapters(): Promise<Chapter[]> {
    try {
      const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.CHAPTERS));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  },

  // Lấy danh sách các thí nghiệm (lessons)
  async getExperiments(): Promise<Lesson[]> {
    try {
      const response = await fetch(apiHelpers.buildUrl(API_ENDPOINTS.CATALOG.EXPERIMENTS));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching experiments:', error);
      throw error;
    }
  },
};
