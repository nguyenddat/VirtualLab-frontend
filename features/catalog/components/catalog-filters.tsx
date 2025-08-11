'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, X } from 'lucide-react';
import { SubjectFilter } from './subject-filter';
import { TextbookFilter } from './textbook-filter';
import { ChapterFilter } from './chapter-filter';
import { TopicFilter } from './topic-filter';
import { CatalogFilters } from '../utils/types';
import { GRADE_OPTIONS } from '../utils/constants';

interface CatalogFiltersProps {
    filters: CatalogFilters;
    onFiltersChange: (filters: CatalogFilters) => void;
}

export const CatalogFiltersComponent = ({ filters, onFiltersChange }: CatalogFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

      const handleFilterChange = (key: keyof CatalogFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value,
    });
  };

    const clearAllFilters = () => {
        onFiltersChange({});
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== 'all');

    return (
        <Card className="mb-6">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Bộ lọc
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearAllFilters}
                                className="text-xs"
                            >
                                <X className="w-3 h-3 mr-1" />
                                Xóa tất cả
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Tìm kiếm bài học..."
                        value={filters.search || ''}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Basic Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SubjectFilter
                        value={filters.subject}
                        onValueChange={(value) => handleFilterChange('subject', value)}
                    />
                    <TextbookFilter
                        value={filters.textbook}
                        onValueChange={(value) => handleFilterChange('textbook', value)}
                        subjectFilter={filters.subject}
                    />
                    <Select value={filters.grade} onValueChange={(value) => handleFilterChange('grade', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn lớp" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả lớp</SelectItem>
                            {GRADE_OPTIONS.map((grade) => (
                                <SelectItem key={grade.value} value={grade.value}>
                                    {grade.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Chapter Filter - Show when subject, textbook, and grade are selected */}
                {filters.subject && filters.subject !== 'all' && 
                 filters.textbook && filters.textbook !== 'all' && 
                 filters.grade && filters.grade !== 'all' && (
                    <div className="pt-4 border-t">
                        <ChapterFilter
                            value={filters.chapter}
                            onValueChange={(value) => handleFilterChange('chapter', value)}
                            subjectFilter={filters.subject}
                            textbookFilter={filters.textbook}
                            gradeFilter={filters.grade}
                            placeholder="Chọn chương theo bộ sách và lớp"
                        />
                    </div>
                )}

                {/* Advanced Filters */}
                {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <TopicFilter
                            value={filters.topic}
                            onValueChange={(value) => handleFilterChange('topic', value)}
                            subjectFilter={filters.subject}
                            chapterFilter={filters.chapter}
                            gradeFilter={filters.grade}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
