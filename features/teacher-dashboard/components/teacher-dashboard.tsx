"use client";

import PageHeading from "@/components/common/page-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { 
	ChartNoAxesCombined, 
	Users, 
	TrendingUp, 
	Calendar,
	BookText,
	Play,
	BarChart3,
	Clock,
	Target,
	Activity
} from "lucide-react";

export const TeacherDashboard = () => {
	const router = useRouter();

	const quickAccessCards = [
		{
			title: "Tổng quan",
			description: "Cái nhìn tổng thể về hoạt động giảng dạy",
			icon: ChartNoAxesCombined,
			url: "/teacher/overview",
			stats: "156 học sinh",
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			title: "Thống kê học sinh",
			description: "Theo dõi hoạt động và tiến độ học sinh",
			icon: Users,
			url: "/teacher/student-stats",
			stats: "89% hoàn thành",
			color: "text-green-600",
			bgColor: "bg-green-50",
		},
		{
			title: "Tiến độ dạy học",
			description: "Theo dõi tiến độ và hiệu quả giảng dạy",
			icon: TrendingUp,
			url: "/teacher/teaching-progress",
			stats: "75% hoàn thành",
			color: "text-orange-600",
			bgColor: "bg-orange-50",
		},
		{
			title: "Báo cáo theo thời gian",
			description: "Phân tích hoạt động học tập theo thời gian",
			icon: Calendar,
			url: "/teacher/time-reports",
			stats: "+10.5% tăng trưởng",
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			title: "Quản lý bài giảng",
			description: "Tạo và quản lý các bài giảng",
			icon: BookText,
			url: "/teacher/lessons",
			stats: "24 bài giảng",
			color: "text-indigo-600",
			bgColor: "bg-indigo-50",
		},
		{
			title: "Mô phỏng",
			description: "Truy cập các mô phỏng giáo dục",
			icon: Play,
			url: "/simulation",
			stats: "Sẵn sàng",
			color: "text-red-600",
			bgColor: "bg-red-50",
		},
	];

	const recentActivity = [
		{ action: "Hoàn thành bài giảng Vật lý", time: "2 giờ trước", type: "lesson" },
		{ action: "45 học sinh hoàn thành bài tập", time: "4 giờ trước", type: "assignment" },
		{ action: "Tạo bài giảng mới Hóa học", time: "1 ngày trước", type: "lesson" },
		{ action: "Báo cáo tuần được tạo", time: "2 ngày trước", type: "report" },
	];

	return (
		<div className="flex flex-col gap-6">
			<PageHeading 
				title="Dashboard Giáo viên" 
				subtitle="Chào mừng trở lại! Đây là tổng quan về hoạt động giảng dạy của bạn"
			/>
			
			{/* Quick Access Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{quickAccessCards.map((card) => (
					<Card 
						key={card.title} 
						className="hover:shadow-lg transition-shadow cursor-pointer"
						onClick={() => router.push(card.url)}
					>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div className={`p-2 rounded-lg ${card.bgColor}`}>
									<card.icon className={`h-6 w-6 ${card.color}`} />
								</div>
								<Badge variant="outline" className="text-xs">
									{card.stats}
								</Badge>
							</div>
							<CardTitle className="text-lg">{card.title}</CardTitle>
							<CardDescription>{card.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Button 
								variant="outline" 
								size="sm" 
								className="w-full"
								onClick={(e) => {
									e.stopPropagation();
									router.push(card.url);
								}}
							>
								Truy cập
							</Button>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="h-5 w-5" />
							Hoạt động gần đây
						</CardTitle>
						<CardDescription>
							Các hoạt động mới nhất trong hệ thống
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.map((activity, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className={`p-1 rounded-full ${
											activity.type === 'lesson' ? 'bg-blue-100' :
											activity.type === 'assignment' ? 'bg-green-100' :
											'bg-purple-100'
										}`}>
											{activity.type === 'lesson' ? (
												<BookText className="h-3 w-3 text-blue-600" />
											) : activity.type === 'assignment' ? (
												<Target className="h-3 w-3 text-green-600" />
											) : (
												<BarChart3 className="h-3 w-3 text-purple-600" />
											)}
										</div>
										<div>
											<p className="text-sm font-medium">{activity.action}</p>
											<p className="text-xs text-muted-foreground">{activity.time}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="h-5 w-5" />
							Thống kê nhanh
						</CardTitle>
						<CardDescription>
							Các chỉ số quan trọng trong tuần này
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm">Tổng thời gian giảng dạy</span>
								<span className="font-medium">24 giờ</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">Học sinh tích cực</span>
								<span className="font-medium text-green-600">142/156</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">Bài giảng hoàn thành</span>
								<span className="font-medium">18/24</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">Điểm trung bình</span>
								<span className="font-medium text-blue-600">82/100</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">Tỷ lệ hoàn thành</span>
								<span className="font-medium text-orange-600">78%</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
