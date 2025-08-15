"use client";

import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/assets/imgs/logo.png";
import {
	AnimatedButton,
	AnimatedNavItem,
	ReusableHeader,
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { UserMenu } from "../common/user-menu";
import { Button } from "../ui/button";
import { 
	BookOpen, 
	FlaskConical, 
	Users, 
	GraduationCap, 
	HelpCircle,
	ArrowRight
} from "lucide-react";

const navbarItems = [
	{ 
		label: "Tính năng", 
		href: "#features",
		icon: <BookOpen className="size-4" />
	},
	{ 
		label: "Khám phá", 
		href: "/explore",
		icon: <FlaskConical className="size-4" />
	},
	{ 
		label: "Mô phỏng", 
		href: "/simulation",
		icon: <GraduationCap className="size-4" />
	},
	{ 
		label: "Hỗ trợ", 
		href: "/help",
		icon: <HelpCircle className="size-4" />
	},
];

const HeaderLeftSection = () => {
	return (
		<Link href="/" className="flex items-center gap-3">
			<Image
				src={LogoImg}
				alt="ViLAB Logo"
				width={120}
				height={40}
				className="h-10 w-auto"
				priority
			/>
			<div className="hidden sm:block">
				<span className="font-semibold text-foreground text-sm">ViLAB</span>
				<p className="text-xs text-muted-foreground">Nền tảng STEM</p>
			</div>
		</Link>
	);
};

const HeaderCenterSection = () => {
	const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const targetId = e.currentTarget.getAttribute("href")?.slice(1);
		if (!targetId) return;

		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<nav className="hidden lg:flex items-center gap-6">
			{navbarItems.map((item, i) => (
				<AnimatedNavItem
					key={item.label}
					href={item.href}
					delay={0.1 + i * 0.05}
					onClick={
						item.href.startsWith("#") ? handleScrollToSection : undefined
					}
					className="flex items-center gap-2 hover:text-primary transition-colors"
				>
					{item.icon}
					{item.label}
				</AnimatedNavItem>
			))}
		</nav>
	);
};

// Component cho Right Section
const HeaderRightSection = () => {
	return (
		<div className="flex items-center gap-3">
			{/* Chuyển đổi theme */}
			<AnimatedButton variant="ghost" delay={0.3} asChild>
				<ThemeSwitcher />
			</AnimatedButton>

			{/* User Menu */}
			<AnimatedButton
				delay={0.4}
				className="rounded-full font-medium hover:scale-105 transition-transform cursor-pointer"
				asChild
			>
				<UserMenu />
			</AnimatedButton>
		</div>
	);
};

const HeaderMobileMenuContent = () => {
	const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const targetId = e.currentTarget.getAttribute("href")?.slice(1);
		if (!targetId) return;

		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			{/* Menu items */}
			{navbarItems.map((item, i) => (
				<AnimatedNavItem
					key={item.label}
					href={item.href}
					delay={i * 0.05}
					onClick={handleScrollToSection}
					className="flex items-center gap-3 py-3 text-sm hover:bg-muted/50 rounded-lg px-3 transition-colors"
				>
					{item.icon}
					{item.label}
				</AnimatedNavItem>
			))}

			{/* Divider */}
			<div className="border-t border-border/30 my-2" />

			{/* User menu */}
			<div className="pt-2">
				<UserMenu />
			</div>
		</div>
	);
};

export const RootHeader = () => {
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			centerSection={<HeaderCenterSection />}
			rightSection={<HeaderRightSection />}
			mobileMenuContent={<HeaderMobileMenuContent />}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
		/>
	);
};
