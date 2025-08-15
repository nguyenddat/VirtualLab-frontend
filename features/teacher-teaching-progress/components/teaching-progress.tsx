"use client";

import PageHeading from "@/components/common/page-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
	TrendingUp, 
	BookOpen, 
	CheckCircle, 
	Clock, 
	Target, 
	BarChart3,
	Calendar,
	FileText
} from "lucide-react";

export const TeachingProgress = () => {
	// Mock data - trong thực tế sẽ lấy từ API
	const teachingData = {
		totalLessons: 24,
		completedLessons: 18,
		upcomingLessons: 6,
		completionRate: 75,
		avgStudentPerformance: 82,
		weeklyProgress: [
			{ week: "Tuần 1", completed: 4, target: 4, performance: 85 },
			{ week: "Tuần 2", completed: 3, target: 4, performance: 78 },
			{ week: "Tuần 3", completed: 4, target: 4, performance: 88 },
			{ week: "Tuần 4", completed: 3, target: 4, performance: 79 },
			{ week: "Tuần 5", completed: 4, target: 4, performance: 82 },
			{ week: "Tuần 6", completed: 0, target: 4, performance: 0 },
		],
		subjectProgress: [
			{ subject: "Vật lý", progress: 85, students: 45, lessons: 8 },
			{ subject: "Hóa học", progress: 72, students: 38, lessons: 6 },
			{ subject: "Toán học", progress: 90, students: 52, lessons: 10 },
		],
		recentAchievements: [
			{ title: "Hoàn thành chương Vật lý cơ bản", date: "2 ngày trước", students: 42 },
			{ title: "100% học sinh hoàn thành bài kiểm tra", date: "1 tuần trước", students: 45 },
			{ title: "Tăng 15% điểm trung bình", date: "2 tuần trước", students: 48 },
		]
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeading 
				title="Tiến độ dạy học" 
				subtitle="Theo dõi tiến độ và hiệu quả giảng dạy"
			/>
			
			{/* Thống kê tổng quan */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Tổng bài giảng</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{teachingData.totalLessons}</div>
						<p className="text-xs text-muted-foreground">
							{teachingData.completedLessons} đã hoàn thành
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
						<CheckCircle className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">{teachingData.completionRate}%</div>
						<Progress value={teachingData.completionRate} className="mt-2" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Điểm TB học sinh</CardTitle>
						<TrendingUp className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">{teachingData.avgStudentPerformance}/100</div>
						<p className="text-xs text-muted-foreground">
							+5 điểm so với tháng trước
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Bài giảng sắp tới</CardTitle>
						<Clock className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-600">{teachingData.upcomingLessons}</div>
						<p className="text-xs text-muted-foreground">
							Trong 2 tuần tới
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Tiến độ theo tuần và môn học */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Tiến độ theo tuần
						</CardTitle>
						<CardDescription>
							Theo dõi tiến độ hoàn thành bài giảng theo tuần
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{teachingData.weeklyProgress.map((week) => (
								<div key={week.week} className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium">{week.week}</span>
										<span className="text-sm text-muted-foreground">
											{week.completed}/{week.target} bài
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Progress 
											value={(week.completed / week.target) * 100} 
											className="flex-1" 
										/>
										<Badge variant={week.performance > 80 ? "default" : "secondary"}>
											{week.performance}%
										</Badge>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BarChart3 className="h-5 w-5" />
							Tiến độ theo môn học
						</CardTitle>
						<CardDescription>
							Thống kê tiến độ giảng dạy theo từng môn học
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{teachingData.subjectProgress.map((subject) => (
								<div key={subject.subject} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex flex-col">
											<p className="font-medium">{subject.subject}</p>
											<p className="text-sm text-muted-foreground">
												{subject.students} học sinh • {subject.lessons} bài
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Progress value={subject.progress} className="w-20" />
										<Badge variant={subject.progress > 80 ? "default" : "secondary"}>
											{subject.progress}%
										</Badge>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Thành tích gần đây */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Target className="h-5 w-5" />
						Thành tích gần đây
					</CardTitle>
					<CardDescription>
						Các cột mốc và thành tích đạt được trong quá trình giảng dạy
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{teachingData.recentAchievements.map((achievement, index) => (
							<div key={index} className="flex flex-col gap-2 p-4 border rounded-lg">
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-600" />
									<h4 className="font-medium text-sm">{achievement.title}</h4>
								</div>
								<p className="text-xs text-muted-foreground">{achievement.date}</p>
								<Badge variant="outline" className="w-fit">
									{achievement.students} học sinh
								</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
