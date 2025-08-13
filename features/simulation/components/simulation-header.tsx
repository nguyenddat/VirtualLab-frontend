'use client';

import { BreadcrumbNav } from "@/components/layout/breadcrumb-navigation";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { ExperimentData } from "../services/simulation";

interface SimulationHeaderProps {
	lessonName: string;
	experimentData?: ExperimentData;
	isChatbotOpen: boolean;
	onToggleChatbot: () => void;
}

export const SimulationHeader = ({ 
	lessonName, 
	isChatbotOpen,
	onToggleChatbot
}: SimulationHeaderProps) => {
	const breadcrumbItems = [
		{
			title: lessonName,
			url: "/explore",
			isCurrentPage: false,
		},
		{
			title: "Simulation",
			url: undefined,
			isCurrentPage: true,
		},
	];

	return (
		<header className="border-b bg-background/80 backdrop-blur-sm">
			<div className="flex items-center justify-between px-6 py-4">
				<div className="flex items-center gap-4">
					<Link
						href="/explore"
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						Quay lại
					</Link>
					<Separator className="min-h-6" orientation="vertical" />
					<BreadcrumbNav
						items={breadcrumbItems}
						className="hidden md:flex"
						maxItems={4}
					/>
				</div>
				<div className="flex items-center gap-4">
					<ThemeSwitcher />
					<Button
						variant="ghost"
						size="sm"
						onClick={onToggleChatbot}
						className="flex items-center gap-2"
					>
						<MessageCircle className="w-4 h-4" />
						{isChatbotOpen ? 'Ẩn' : 'Hiện'} Chatbot
					</Button>
				</div>
			</div>
		</header>
	);
};
