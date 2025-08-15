"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoImg from "@/assets/imgs/logo.png";
import {
	AnimatedButton,
	AnimatedNavItem,
	ReusableHeader,
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { UserMenu } from "../common/user-menu";
import { Button } from "../ui/button";
import { useAuthContext } from "@/features/auth";
import { 
	BookOpen, 
	FlaskConical, 
	GraduationCap, 
	HelpCircle,
	ArrowRight,
	Settings
} from "lucide-react";

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

const HeaderCenterSection = ({ userRole, isAuthenticated }: { userRole?: string; isAuthenticated: boolean }) => {
	// Navigation items for all users
	const navItems = [
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

	// Add teacher console for teachers only when authenticated
	if (isAuthenticated && userRole === 'teacher') {
		navItems.push({
			label: "Console quản lý",
			href: "/teacher/overview",
			icon: <Settings className="size-4" />
		});
	}

	return (
		<nav className="hidden lg:flex items-center gap-6">
			{navItems.map((item, i) => (
				<AnimatedNavItem
					key={item.label}
					href={item.href}
					delay={0.1 + i * 0.05}
					className="flex items-center gap-2 hover:text-primary transition-colors"
				>
					{item.icon}
					{item.label}
				</AnimatedNavItem>
			))}
		</nav>
	);
};

const HeaderRightSection = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
	return (
		<div className="flex items-center gap-3">
			{/* Theme switcher - always visible */}
			<AnimatedButton variant="ghost" delay={0.3} asChild>
				<ThemeSwitcher />
			</AnimatedButton>

			{/* Login button for unauthenticated users */}
			{!isAuthenticated && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3, delay: 0.4 }}
				>
					<Button asChild className="rounded-full">
						<Link href="/auth/login" className="flex items-center">
							Đăng nhập
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>
				</motion.div>
			)}

			{/* User menu for authenticated users */}
			{isAuthenticated && (
				<AnimatedButton
					delay={0.4}
					className="rounded-full font-medium hover:scale-105 transition-transform cursor-pointer"
					asChild
				>
					<UserMenu />
				</AnimatedButton>
			)}
		</div>
	);
};

const HeaderMobileMenuContent = ({ userRole, isAuthenticated }: { userRole?: string; isAuthenticated: boolean }) => {
	// Navigation items for all users
	const navItems = [
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

	// Add teacher console for teachers only when authenticated
	if (isAuthenticated && userRole === 'teacher') {
		navItems.push({
			label: "Console quản lý",
			href: "/teacher/overview",
			icon: <Settings className="size-4" />
		});
	}

	return (
		<div className="flex flex-col gap-4 p-4">
			{/* Menu items for all users */}
			{navItems.map((item, i) => (
				<AnimatedNavItem
					key={item.label}
					href={item.href}
					delay={i * 0.05}
					className="flex items-center gap-3 py-3 text-sm hover:bg-muted/50 rounded-lg px-3 transition-colors"
				>
					{item.icon}
					{item.label}
				</AnimatedNavItem>
			))}

			{/* Login button for unauthenticated users */}
			{!isAuthenticated && (
				<Link
					href="/auth/login"
					className="flex items-center gap-3 py-3 text-sm hover:bg-muted/50 rounded-lg px-3 transition-colors"
				>
					<ArrowRight className="size-4" />
					Đăng nhập
				</Link>
			)}

			{/* Divider */}
			<div className="border-t border-border/30 my-2" />

			{/* User menu for authenticated users */}
			{isAuthenticated && (
				<div className="pt-2">
					<UserMenu />
				</div>
			)}
		</div>
	);
};

export const ExploreHeader = () => {
	const { isAuthenticated, userRole } = useAuthContext();

	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			centerSection={<HeaderCenterSection userRole={userRole} isAuthenticated={isAuthenticated} />}
			rightSection={<HeaderRightSection isAuthenticated={isAuthenticated} />}
			mobileMenuContent={<HeaderMobileMenuContent userRole={userRole} isAuthenticated={isAuthenticated} />}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
		/>
	);
};
