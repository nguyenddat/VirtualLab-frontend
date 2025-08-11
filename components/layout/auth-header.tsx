"use client";

import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/assets/imgs/logo.png";
import {
	AnimatedButton,
	ReusableHeader
} from "../common/reuse-header";
import { ThemeSwitcher } from "../common/theme-switcher";
import { UserMenu } from "../common/user-menu";

const HeaderLeftSection = () => {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Image
				src={LogoImg}
				alt="ViLAB Logo"
				width={120}
				height={40}
				className="h-10 w-auto"
				priority
			/>
			<span className="font-medium text-muted-foreground hover:text-primary text-xs lg:text-sm transition-colors">ViLAB</span>
		</Link>
	);
};

// Component cho Right Section
const HeaderRightSection = () => {
	return (
		<AnimatedButton variant="ghost" delay={0.4} asChild>
			<ThemeSwitcher />
		</AnimatedButton>
	);
};

const HeaderMobileMenuContent = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="mt-2 pt-2 border-t border-border/30">
				<UserMenu shouldShowGoToApp />
			</div>
		</div>
	);
};

export const AuthHeader = () => {
	return (
		<ReusableHeader
			leftSection={<HeaderLeftSection />}
			rightSection={<HeaderRightSection />}
			mobileMenuContent={<HeaderMobileMenuContent />}
			enableScrollEffect={true}
			enableMobileMenu={true}
			stickyHeader={true}
			backdropBlur={true}
			containerClassName=""
		/>
	);
};
