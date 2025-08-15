"use client";

import PageHeading from "@/components/common/page-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
	Calendar, 
	Clock, 
	TrendingUp, 
	TrendingDown,
	BarChart3,
	PieChart,
	Activity,
	Target,
	Users,
	BookOpen
} from "lucide-react";

export const TimeReports = () => {
	// Mock data - trong thực tế sẽ lấy từ API
	const timeData = {
		dailyStats: {
			totalStudyTime: 156,
			avgSessionDuration: 45,
			peakHours: "14:00 - 16:00",
			activeStudents: 89,
		},
		weeklyTrends: [
			{ day: "Thứ 2", studyTime: 180, students: 45, lessons: 8 },
			{ day: "Thứ 3", studyTime: 165, students: 42, lessons: 7 },
			{ day: "Thứ 4", studyTime: 190, students: 48, lessons: 9 },
			{ day: "Thứ 5", studyTime: 175, students: 44, lessons: 8 },
			{ day: "Thứ 6", studyTime: 200, students: 52, lessons: 10 },
			{ day: "Thứ 7", studyTime: 140, students: 35, lessons: 6 },
			{ day: "Chủ nhật", studyTime: 120, students: 30, lessons: 5 },
		],
		monthlyComparison: {
			currentMonth: { studyTime: 4200, students: 156, lessons: 24 },
			previousMonth: { studyTime: 3800, students: 142, lessons: 22 },
			growth: {
				studyTime: 10.5,
				students: 9.9,
				lessons: 9.1,
			}
		},
		timeDistribution: [
			{ period: "Sáng (6h-12h)", percentage: 25, students: 39 },
			{ period: "Chiều (12h-18h)", percentage: 45, students: 70 },
			{ period: "Tối (18h-24h)", percentage: 30, students: 47 },
		],
		subjectTimeAllocation: [
			{ subject: "Vật lý", hours: 8.5, students: 45, trend: "up" },
			{ subject: "Hóa học", hours: 6.2, students: 38, trend: "down" },
			{ subject: "Toán học", hours: 10.3, students: 52, trend: "up" },
		]
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeading 
				title="Báo cáo theo thời gian" 
				subtitle="Phân tích hoạt động học tập theo thời gian"
			/>
			
			{/* Bộ lọc thời gian */}
			<div className="flex items-center gap-4">
				<Select defaultValue="week">
					<SelectTrigger className="w-32">
						<SelectValue placeholder="Thời gian" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="day">Ngày</SelectItem>
						<SelectItem value="week">Tuần</SelectItem>
						<SelectItem value="month">Tháng</SelectItem>
						<SelectItem value="quarter">Quý</SelectItem>
					</SelectContent>
				</Select>
				<Button variant="outline" size="sm">
					<Calendar className="h-4 w-4 mr-2" />
					Xuất báo cáo
				</Button>
			</div>

			{/* Thống kê tổng quan */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Tổng thời gian học</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{timeData.dailyStats.totalStudyTime}h</div>
						<p className="text-xs text-muted-foreground">
							Trung bình {timeData.dailyStats.avgSessionDuration} phút/buổi
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Giờ cao điểm</CardTitle>
						<Activity className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-600">{timeData.dailyStats.peakHours}</div>
						<p className="text-xs text-muted-foreground">
							{timeData.dailyStats.activeStudents} học sinh hoạt động
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Tăng trưởng tháng</CardTitle>
						<TrendingUp className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">+{timeData.monthlyComparison.growth.studyTime}%</div>
						<p className="text-xs text-muted-foreground">
							So với tháng trước
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Học sinh mới</CardTitle>
						<Users className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">+{timeData.monthlyComparison.growth.students}%</div>
						<p className="text-xs text-muted-foreground">
							{timeData.monthlyComparison.currentMonth.students} tổng số
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Biểu đồ xu hướng tuần và phân bố thời gian */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BarChart3 className="h-5 w-5" />
							Xu hướng tuần
						</CardTitle>
						<CardDescription>
							Thống kê hoạt động học tập theo ngày trong tuần
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{timeData.weeklyTrends.map((day) => (
								<div key={day.day} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-16 text-sm font-medium">{day.day}</div>
										<div className="flex flex-col">
											<p className="text-sm font-medium">{day.studyTime}h</p>
											<p className="text-xs text-muted-foreground">
												{day.students} học sinh • {day.lessons} bài
											</p>
										</div>
									</div>
									<Badge variant={day.studyTime > 180 ? "default" : "secondary"}>
										{day.studyTime > 180 ? "Cao" : "Trung bình"}
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<PieChart className="h-5 w-5" />
							Phân bố thời gian
						</CardTitle>
						<CardDescription>
							Phân bố hoạt động học tập theo khung giờ
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{timeData.timeDistribution.map((period) => (
								<div key={period.period} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex flex-col">
											<p className="text-sm font-medium">{period.period}</p>
											<p className="text-xs text-muted-foreground">
												{period.students} học sinh
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-20 bg-gray-200 rounded-full h-2">
											<div 
												className="bg-blue-600 h-2 rounded-full" 
												style={{ width: `${period.percentage}%` }}
											></div>
										</div>
										<Badge variant="outline">{period.percentage}%</Badge>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Phân bổ thời gian theo môn học */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BookOpen className="h-5 w-5" />
						Phân bổ thời gian theo môn học
					</CardTitle>
					<CardDescription>
						Thống kê thời gian học tập theo từng môn học
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{timeData.subjectTimeAllocation.map((subject) => (
							<div key={subject.subject} className="flex flex-col gap-3 p-4 border rounded-lg">
								<div className="flex items-center justify-between">
									<h4 className="font-medium">{subject.subject}</h4>
									{subject.trend === "up" ? (
										<TrendingUp className="h-4 w-4 text-green-600" />
									) : (
										<TrendingDown className="h-4 w-4 text-red-600" />
									)}
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-sm text-muted-foreground">Thời gian</span>
										<span className="font-medium">{subject.hours}h</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm text-muted-foreground">Học sinh</span>
										<span className="font-medium">{subject.students}</span>
									</div>
								</div>
								<Badge variant={subject.trend === "up" ? "default" : "secondary"}>
									{subject.trend === "up" ? "Tăng" : "Giảm"}
								</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
