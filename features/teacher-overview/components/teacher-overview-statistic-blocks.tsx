"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticBlock } from "@/components/common/statistic-block";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  AlertCircle 
} from "lucide-react";
import type { TeacherOverviewStats } from "../utils/types";

interface TeacherOverviewStatisticBlocksProps {
  overviewStats?: TeacherOverviewStats;
  overviewStatsError?: Error;
  isLoadingOverviewStats: boolean;
}

export const TeacherOverviewStatisticBlocks = ({
  overviewStats,
  overviewStatsError,
  isLoadingOverviewStats,
}: TeacherOverviewStatisticBlocksProps) => {
  if (isLoadingOverviewStats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="min-h-[140px]">
            <CardHeader className="space-y-3 pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-4 w-4 ml-2" />
              </div>
              <div className="flex justify-between items-end">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (overviewStatsError || !overviewStats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="min-h-[140px]">
            <CardHeader className="space-y-3 pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    N/A
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Không có dữ liệu</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold text-muted-foreground">--</div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Tổng học sinh",
      value: overviewStats.totalStudents,
      icon: <Users className="h-4 w-4" />,
      description: "Số học sinh đang theo học",
      trend: {
        value: "12%",
        direction: "up" as const,
        label: "so với tháng trước",
      },
    },
    {
      title: "Tổng bài giảng",
      value: overviewStats.totalLessons,
      icon: <BookOpen className="h-4 w-4" />,
      description: "Tổng số bài giảng đã tạo",
      trend: {
        value: "+5 bài mới",
        direction: "up" as const,
      },
    },
    {
      title: "Bài giảng hoàn thành",
      value: overviewStats.completedLessons,
      icon: <CheckCircle className="h-4 w-4" />,
      description: "Số bài giảng đã hoàn thành",
      trend: {
        value: `${Math.round((overviewStats.completedLessons / overviewStats.totalLessons) * 100)}%`,
        direction: "up" as const,
        label: "hoàn thành",
      },
    },
    {
      title: "Tỷ lệ hoàn thành",
      value: `${Math.round(overviewStats.averageCompletionRate)}%`,
      icon: <GraduationCap className="h-4 w-4" />,
      description: "Tỷ lệ hoàn thành trung bình",
      trend: {
        value: "8%",
        direction: "up" as const,
        label: "so với tháng trước",
      },
    },
    {
      title: "Lớp học đang hoạt động",
      value: overviewStats.activeClasses,
      icon: <Clock className="h-4 w-4" />,
      description: "Số lớp học đang hoạt động",
      trend: {
        value: "Đang giảng dạy",
        direction: "neutral" as const,
      },
    },
    {
      title: "Bài tập chờ xử lý",
      value: overviewStats.pendingAssignments,
      icon: <AlertCircle className="h-4 w-4" />,
      description: "Số bài tập chờ chấm điểm",
      trend: {
        value: "Cần xử lý sớm",
        direction: "down" as const,
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
      {stats.map((stat, index) => (
        <StatisticBlock
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
          trend={stat.trend}
          className="min-h-[140px]"
        />
      ))}
    </div>
  );
};
