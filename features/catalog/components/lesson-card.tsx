'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Tag, Play, ArrowRight } from 'lucide-react';
import { Lesson } from '../utils/types';
import { SAMPLE_SUBJECTS, SAMPLE_CHAPTERS } from '../utils/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LessonCardProps {
  lesson: Lesson;
  onSelect?: (lesson: Lesson) => void;
}

export const LessonCard = ({ lesson, onSelect }: LessonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const router = useRouter();

  const subject = SAMPLE_SUBJECTS.find(s => s.id === lesson.subject);
  const chapter = SAMPLE_CHAPTERS.find(c => c.id === lesson.chapter);

  const handleSimulationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const encodedTitle = encodeURIComponent(lesson.title);
    router.push(`/simulation?lesson=${encodedTitle}`);
  };

  return (
    <Card
      className={`transition-all duration-200 cursor-pointer hover:shadow-lg h-full flex flex-col group ${isHovered ? 'scale-[1.02]' : ''
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(lesson)}
    >
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg line-clamp-2 mb-2 h-14 flex items-start group-hover:text-primary transition-colors">
              {lesson.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10 flex items-start">
              {lesson.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="space-y-3 flex-1 flex flex-col">
          {/* Subject and Grade */}
          <div className="flex items-center justify-between flex-shrink-0">
            <Badge
              variant="secondary"
              style={{ backgroundColor: subject?.color + '20', color: subject?.color }}
              className="text-xs"
            >
              {subject?.name}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>Lớp {lesson.grade}</span>
            </div>
          </div>

          {/* Chapter Information */}
          {chapter && (
            <div className="flex items-start gap-2 flex-shrink-0 p-2 bg-muted/30 rounded-md border border-dashed border-muted-foreground/20 transition-all duration-200 group-hover:bg-muted/50 group-hover:border-muted-foreground/30">
              <Badge
                variant="outline"
                className="text-xs border-dashed flex-shrink-0 bg-background/80 group-hover:bg-background/90 transition-colors"
              >
                Chương {chapter.number}
              </Badge>
              <div className="flex-1 min-w-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 font-medium group-hover:text-foreground/80 transition-colors cursor-help">
                        {chapter.name}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-sm">{chapter.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex-1 min-h-[24px]">
            {lesson.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {lesson.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {lesson.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{lesson.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            className={`w-full mt-auto transition-all duration-200 bg-background`}
            size="sm"
            variant="outline"
            onClick={handleSimulationClick}
          >
            <Play className="w-4 h-4 mr-2" />
            Thực hành thí nghiệm
            <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''
              }`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
