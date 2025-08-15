export interface Lesson {
  id: string;
  name: string;
  description: string;
  status: 'blank' | 'populated';
  public_status: 'private' | 'public';
  chapter_id: string;
  created_by: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface BookSet {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  name: string;
  grade: string;
  static_file_path?: string;
  subject_id: string;
  bookset_id: string;
}

export interface Chapter {
  id: string;
  name: string;
  book_id: string;
}

export interface Topic {
  id: string;
  name: string;
  chapter: string;
  subject: string;
}

export interface CatalogFilters {
  subject?: string;
  bookset?: string;
  book?: string;
  chapter?: string;
  topic?: string;
  grade?: string;
  search?: string;
  tags?: string[];
}

export interface CatalogState {
  lessons: Lesson[];
  subjects: Subject[];
  booksets: BookSet[];
  books: Book[];
  chapters: Chapter[];
  topics: Topic[];
  filters: CatalogFilters;
  loading: boolean;
  error?: string;
}
