'use client';

import { useState, useMemo } from 'react';
import { Lesson, CatalogFilters } from '../utils/types';
import { SAMPLE_LESSONS, SAMPLE_TEXTBOOKS } from '../utils/constants';

export const useCatalog = (initialLessons: Lesson[] = SAMPLE_LESSONS) => {
  const [lessons] = useState<Lesson[]>(initialLessons);
  const [filters, setFilters] = useState<CatalogFilters>({});
  const [loading, setLoading] = useState(false);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          lesson.title.toLowerCase().includes(searchLower) ||
          lesson.description.toLowerCase().includes(searchLower) ||
          lesson.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Subject filter
      if (filters.subject && filters.subject !== 'all' && lesson.subject !== filters.subject) {
        return false;
      }

      // Textbook filter
      if (filters.textbook && filters.textbook !== 'all') {
        const textbook = SAMPLE_TEXTBOOKS.find(t => t.id === lesson.textbook);
        if (!textbook || `${textbook.name}-${textbook.publisher}` !== filters.textbook) {
          return false;
        }
      }

      // Chapter filter
      if (filters.chapter && filters.chapter !== 'all' && lesson.chapter !== filters.chapter) {
        return false;
      }

      // Topic filter
      if (filters.topic && filters.topic !== 'all' && lesson.topic !== filters.topic) {
        return false;
      }

      // Grade filter
      if (filters.grade && filters.grade !== 'all' && lesson.grade !== filters.grade) {
        return false;
      }



      return true;
    });
  }, [lessons, filters]);

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
    loading,
    updateFilters,
    clearFilters,
    getFilterStats,
    setLoading,
  };
};
