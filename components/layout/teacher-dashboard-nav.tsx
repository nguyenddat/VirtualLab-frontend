"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import { 
	ChartNoAxesCombined, 
	Users, 
	TrendingUp, 
	Calendar,
	BookText,
	Home
} from "lucide-react";

const dashboardNavItems = [
	{
		title: "Dashboard",
		url: "/teacher",
		icon: Home,
	},
	{
		title: "Tổng quan",
		url: "/teacher/overview",
		icon: ChartNoAxesCombined,
	},
	{
		title: "Thống kê học sinh",
		url: "/teacher/student-stats",
		icon: Users,
	},
	{
		title: "Tiến độ dạy học",
		url: "/teacher/teaching-progress",
		icon: TrendingUp,
	},
	{
		title: "Báo cáo theo thời gian",
		url: "/teacher/time-reports",
		icon: Calendar,
	},
	{
		title: "Quản lý bài giảng",
		url: "/teacher/lessons",
		icon: BookText,
	},
];

export const TeacherDashboardNav = () => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg mb-6 overflow-x-auto">
			{dashboardNavItems.map((item) => {
				const isActive = pathname === item.url;
				return (
					<Button
						key={item.title}
						variant={isActive ? "default" : "ghost"}
						size="sm"
						onClick={() => router.push(item.url)}
						className={cn(
							"flex items-center gap-2 whitespace-nowrap",
							isActive && "bg-primary text-primary-foreground"
						)}
					>
						<item.icon className="h-4 w-4" />
						{item.title}
					</Button>
				);
			})}
		</div>
	);
};
