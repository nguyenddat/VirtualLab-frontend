import {
	BiomeJSIcon,
	FramerIcon,
	NextIcon,
	ShadcnIcon,
	SWRIcon,
	TailwindIcon
} from "@/components/common/icons";
import { Blocks, Layers, Palette, RefreshCw, Shield, Zap, Monitor, BookOpen, Video, DollarSign, BarChart3, Globe, FlaskConical, Database, FileText, Bot, Wrench, CheckCircle } from "lucide-react";
import type { IFeature, ITechStack } from "./types";

export const TECH_STACK: ITechStack[] = [
	{
		id: "stack_1",
		icon: <Monitor className="size-6" />,
		name: "Dễ triển khai",
		description: "Hoạt động trên trình duyệt web.",
		link: "#",
	},
	{
		id: "stack_2",
		icon: <BookOpen className="size-6" />,
		name: "Học tập chủ động",
		description: "Phương pháp học tập tích cực.",
		link: "#",
	},
	{
		id: "stack_3",
		icon: <Video className="size-6" />,
		name: "Tương tác cao",
		description: "Học tập đa phương tiện.",
		link: "#",
	},
	{
		id: "stack_4",
		icon: <DollarSign className="size-6" />,
		name: "Tiết kiệm chi phí",
		description: "Giảm chi phí đầu tư thiết bị.",
		link: "#",
	},
	{
		id: "stack_5",
		icon: <BarChart3 className="size-6" />,
		name: "Theo dõi thông minh",
		description: "Báo cáo tự động, trực quan.",
		link: "#",
	},
	{
		id: "stack_6",
		icon: <Globe className="size-6" />,
		name: "Chuẩn chương trình",
		description: "Xây dựng theo chuẩn SGK.",
		link: "#",
	},
];

export const FEATURES: IFeature[] = [
	{
		icon: <FlaskConical className="size-6" />,
		name: "Mô phỏng thí nghiệm trực tuyến",
		description:
			"Hỗ trợ vật lý, hóa học, sinh học, toán học với công cụ mô phỏng mượt mà ngay trên web.",
	},
	{
		icon: <Database className="size-6" />,
		name: "Kho học liệu mở phong phú",
		description:
			"Lưu trữ và chia sẻ nội dung, có thể sử dụng cho nhiều lớp học và giáo viên.",
	},
	{
		icon: <FileText className="size-6" />,
		name: "Tạo và lưu bài giảng STEM",
		description:
			"Tạo và lưu bài giảng STEM, cung cấp tính năng giao bài tập và tự động chấm.",
	},
	{
		icon: <Bot className="size-6" />,
		name: "AI gia sư và hỗ trợ cá nhân",
		description:
		"AI gia sư kiểm tra kiến thức học sinh và hỗ trợ giảng dạy cho giáo viên.",
	},
	{
		icon: <Wrench className="size-6" />,
		name: "AI tạo sinh dụng cụ linh hoạt",
		description:
			"AI hỗ trợ tạo sinh dụng cụ mô phỏng linh hoạt theo mô tả của giáo viên.",
	},
	{
		icon: <CheckCircle className="size-6" />,
		name: "Hệ thống kiểm soát chất lượng",
		description:
			"Hệ thống kiểm soát chất lượng giảng dạy và chất lượng đầu ra của AI.",
	},
];
