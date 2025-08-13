'use client';

import useSWR from 'swr';
import { catalogService } from '../services/catalog';
import { Subject, BookSet, Book, Chapter, Lesson } from '../utils/types';

export const useCatalogSWR = () => {
  // Fetch subjects
  const {
    data: subjects = [],
    error: subjectsError,
    isLoading: subjectsLoading,
    mutate: mutateSubjects,
  } = useSWR<Subject[]>('subjects', () => catalogService.getSubjects());

  // Fetch booksets
  const {
    data: booksets = [],
    error: booksetsError,
    isLoading: booksetsLoading,
    mutate: mutateBookSets,
  } = useSWR<BookSet[]>('booksets', () => catalogService.getBookSets());

  // Fetch books
  const {
    data: books = [],
    error: booksError,
    isLoading: booksLoading,
    mutate: mutateBooks,
  } = useSWR<Book[]>('books', () => catalogService.getBooks());

  // Fetch experiments (lessons)
  const {
    data: experiments = [],
    error: experimentsError,
    isLoading: experimentsLoading,
    mutate: mutateExperiments,
  } = useSWR<Lesson[]>('experiments', () => catalogService.getExperiments());

  // Fetch chapters
  const {
    data: chapters = [],
    error: chaptersError,
    isLoading: chaptersLoading,
    mutate: mutateChapters,
  } = useSWR<Chapter[]>('chapters', () => catalogService.getChapters());

  const isLoading = subjectsLoading || booksetsLoading || booksLoading || experimentsLoading || chaptersLoading;
  const error = subjectsError || booksetsError || booksError || experimentsError || chaptersError;

  return {
    // Data
    subjects,
    booksets,
    books,
    experiments,
    chapters,
    
    // Loading states
    isLoading,
    subjectsLoading,
    booksetsLoading,
    booksLoading,
    experimentsLoading,
    chaptersLoading,
    
    // Error states
    error,
    subjectsError,
    booksetsError,
    booksError,
    experimentsError,
    chaptersError,
    
    // Mutate functions
    mutateSubjects,
    mutateBookSets,
    mutateBooks,
    mutateExperiments,
    mutateChapters,
  };
};
