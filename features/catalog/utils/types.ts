export interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  textbook: string;
  chapter: string;
  topic: string;
  grade: string;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  thumbnail?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
}

export interface Textbook {
  id: string;
  name: string;
  publisher: string;
  subject: string;
}

export interface Chapter {
  id: string;
  name: string;
  number: number;
  subject: string;
  textbook: string;
}

export interface Topic {
  id: string;
  name: string;
  chapter: string;
  subject: string;
}

export interface CatalogFilters {
  subject?: string;
  textbook?: string;
  chapter?: string;
  topic?: string;
  grade?: string;
  search?: string;
  tags?: string[];
}

export interface CatalogState {
  lessons: Lesson[];
  subjects: Subject[];
  textbooks: Textbook[];
  chapters: Chapter[];
  topics: Topic[];
  filters: CatalogFilters;
  loading: boolean;
  error?: string;
}
