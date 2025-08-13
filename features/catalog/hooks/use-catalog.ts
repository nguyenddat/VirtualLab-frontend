'use client';

import { useState, useMemo } from 'react';
import { Lesson, CatalogFilters } from '../utils/types';
import { useCatalogSWR } from './use-catalog-swr';

export const useCatalog = () => {
  const {
    experiments: lessons,
    books,
    chapters,
    isLoading: apiLoading,
    error: apiError,
  } = useCatalogSWR();
  
  const [filters, setFilters] = useState<CatalogFilters>({});
  const [loading, setLoading] = useState(false);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = lesson.name.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Chapter filter
      if (filters.chapter && filters.chapter !== 'all' && lesson.chapter_id !== filters.chapter) {
        return false;
      }

      // Subject, Grade, BookSet, Book filters - cần tìm thông tin từ chapter và book
      if (filters.subject || filters.grade || filters.bookset || filters.book) {
        // Tìm chapter của lesson
        const chapter = chapters.find(c => c.id === lesson.chapter_id);
        if (!chapter) return false;

        // Tìm book của chapter
        const book = books.find(b => b.id === chapter.book_id);
        if (!book) return false;

        // Subject filter
        if (filters.subject && filters.subject !== 'all' && book.subject_id !== filters.subject) {
          return false;
        }

        // Grade filter
        if (filters.grade && filters.grade !== 'all' && book.grade !== filters.grade) {
          return false;
        }

        // BookSet filter
        if (filters.bookset && filters.bookset !== 'all' && book.bookset_id !== filters.bookset) {
          return false;
        }

        // Book filter
        if (filters.book && filters.book !== 'all' && chapter.book_id !== filters.book) {
          return false;
        }
      }

      return true;
    });
  }, [lessons, filters, books, chapters]);

  const updateFilters = (newFilters: CatalogFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getFilterStats = () => {
    const totalLessons = lessons.length;
    const filteredCount = filteredLessons.length;
    const activeFilters = Object.values(filters).filter(value => value !== undefined && value !== 'all').length;

    return {
      totalLessons,
      filteredCount,
      activeFilters,
    };
  };

  return {
    lessons: filteredLessons,
    filters,
    loading: loading || apiLoading,
    error: apiError,
    updateFilters,
    clearFilters,
    getFilterStats,
    setLoading,
  };
};
