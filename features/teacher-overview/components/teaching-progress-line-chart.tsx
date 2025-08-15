"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatDate } from "@/lib/utils/format-date";
import type { TeachingProgress } from "../utils/types";

interface TeachingProgressLineChartProps {
  teachingProgressData: TeachingProgress[];
  teachingProgressError?: Error;
  isLoadingTeachingProgress: boolean;
}

export const TeachingProgressLineChart = ({
  teachingProgressData,
  teachingProgressError,
  isLoadingTeachingProgress,
}: TeachingProgressLineChartProps) => {
  if (isLoadingTeachingProgress) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (teachingProgressError || !teachingProgressData || teachingProgressData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Tiến độ dạy học</CardTitle>
          <p className="text-sm text-muted-foreground">
            Biểu đồ theo dõi tiến độ dạy học theo thời gian
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Không có dữ liệu tiến độ dạy học
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = teachingProgressData.map((item) => ({
    date: formatDate(new Date(item.date), { day: "2-digit", month: "2-digit" }),
    completionRate: item.completionRate,
    completedLessons: item.completedLessons,
    totalLessons: item.totalLessons,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tiến độ dạy học</CardTitle>
        <p className="text-sm text-muted-foreground">
          Biểu đồ theo dõi tiến độ dạy học theo thời gian
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Ngày
                          </span>
                          <span className="font-bold text-muted-foreground">{label}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Tỷ lệ hoàn thành
                          </span>
                          <span className="font-bold">
                            {payload[0].value}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="completionRate"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
