import {
	ChartNoAxesCombined,
	type LucideIcon,
	BookText,
	BarChart3,
	Users,
	TrendingUp,
	Calendar,
} from "lucide-react";
import type { INavigationConfig } from "../types/navigation";

export const TEACHER_NAVIGATION: INavigationConfig = {
	root: {
		title: "Teacher Console",
		url: "/teacher",
	},
	navMain: [
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
	],
	navSecondary: [],
};
