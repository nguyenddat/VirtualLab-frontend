"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { StudentAssignmentStats } from "../utils/types";

interface StudentAssignmentBarChartProps {
  studentAssignmentStats?: StudentAssignmentStats;
  studentAssignmentError?: Error;
  isLoadingStudentAssignment: boolean;
}

export const StudentAssignmentBarChart = ({
  studentAssignmentStats,
  studentAssignmentError,
  isLoadingStudentAssignment,
}: StudentAssignmentBarChartProps) => {
  if (isLoadingStudentAssignment) {
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

  if (studentAssignmentError || !studentAssignmentStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Thống kê bài tập học sinh</CardTitle>
          <p className="text-sm text-muted-foreground">
            Tình trạng bài tập của học sinh
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Không có dữ liệu bài tập học sinh
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    {
      name: "Đã hoàn thành",
      value: studentAssignmentStats.completedAssignments,
      color: "#10b981",
    },
    {
      name: "Chờ làm",
      value: studentAssignmentStats.pendingAssignments,
      color: "#f59e0b",
    },
    {
      name: "Quá hạn",
      value: studentAssignmentStats.overdueAssignments,
      color: "#ef4444",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Thống kê bài tập học sinh</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tình trạng bài tập của học sinh
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
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
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {label}
                        </span>
                        <span className="font-bold">
                          {payload[0].value} bài tập
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {studentAssignmentStats.completedAssignments}
            </div>
            <div className="text-sm text-muted-foreground">Đã hoàn thành</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {studentAssignmentStats.pendingAssignments}
            </div>
            <div className="text-sm text-muted-foreground">Chờ làm</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {studentAssignmentStats.overdueAssignments}
            </div>
            <div className="text-sm text-muted-foreground">Quá hạn</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
