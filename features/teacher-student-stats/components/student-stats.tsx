"use client";

import PageHeading from "@/components/common/page-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, UserX, TrendingUp, BookOpen, Clock } from "lucide-react";

export const StudentStats = () => {
	// Mock data - trong thực tế sẽ lấy từ API
	const studentStats = {
		totalStudents: 156,
		activeStudents: 142,
		inactiveStudents: 14,
		avgCompletionRate: 78,
		avgStudyTime: 2.5,
		topPerformingStudents: [
			{ name: "Nguyễn Văn A", completionRate: 95, studyTime: 3.2 },
			{ name: "Trần Thị B", completionRate: 92, studyTime: 2.8 },
			{ name: "Lê Văn C", completionRate: 89, studyTime: 3.0 },
		],
		recentActivity: [
			{ student: "Nguyễn Văn A", action: "Hoàn thành bài tập", time: "2 giờ trước" },
			{ student: "Trần Thị B", action: "Bắt đầu bài học mới", time: "3 giờ trước" },
			{ student: "Lê Văn C", action: "Nộp bài kiểm tra", time: "5 giờ trước" },
		]
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeading 
				title="Thống kê học sinh" 
				subtitle="Theo dõi hoạt động và tiến độ của học sinh"
			/>
			
			{/* Thống kê tổng quan */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Tổng học sinh</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{studentStats.totalStudents}</div>
						<p className="text-xs text-muted-foreground">
							+12% so với tháng trước
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Học sinh tích cực</CardTitle>
						<UserCheck className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">{studentStats.activeStudents}</div>
						<p className="text-xs text-muted-foreground">
							{Math.round((studentStats.activeStudents / studentStats.totalStudents) * 100)}% tổng số
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
						<TrendingUp className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">{studentStats.avgCompletionRate}%</div>
						<Progress value={studentStats.avgCompletionRate} className="mt-2" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Thời gian học TB</CardTitle>
						<Clock className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-600">{studentStats.avgStudyTime}h/ngày</div>
						<p className="text-xs text-muted-foreground">
							+0.3h so với tuần trước
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Học sinh xuất sắc và hoạt động gần đây */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BookOpen className="h-5 w-5" />
							Học sinh xuất sắc
						</CardTitle>
						<CardDescription>
							Top 3 học sinh có thành tích tốt nhất
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{studentStats.topPerformingStudents.map((student, index) => (
								<div key={student.name} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Badge variant={index === 0 ? "default" : "secondary"}>
											#{index + 1}
										</Badge>
										<div>
											<p className="font-medium">{student.name}</p>
											<p className="text-sm text-muted-foreground">
												{student.completionRate}% hoàn thành • {student.studyTime}h/ngày
											</p>
										</div>
									</div>
									<Badge variant="outline" className="text-green-600">
										Xuất sắc
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="h-5 w-5" />
							Hoạt động gần đây
						</CardTitle>
						<CardDescription>
							Các hoạt động mới nhất của học sinh
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{studentStats.recentActivity.map((activity, index) => (
								<div key={index} className="flex items-center justify-between">
									<div>
										<p className="font-medium">{activity.student}</p>
										<p className="text-sm text-muted-foreground">{activity.action}</p>
									</div>
									<Badge variant="outline" className="text-xs">
										{activity.time}
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
