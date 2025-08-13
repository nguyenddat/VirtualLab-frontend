import { Subject, BookSet, Book, Chapter, Lesson } from '../utils/types';

const API_BASE_URL = 'https://virtuallab.onrender.com/api';

export const catalogService = {
  // Lấy danh sách các môn học
  async getSubjects(): Promise<Subject[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/subject`);
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
      const response = await fetch(`${API_BASE_URL}/bookset`);
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
      const response = await fetch(`${API_BASE_URL}/book`);
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
      const response = await fetch(`${API_BASE_URL}/chapter`);
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
      const response = await fetch(`${API_BASE_URL}/experiment`);
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
