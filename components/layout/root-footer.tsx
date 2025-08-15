"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { APP_INFO } from "@/lib/configs/app-info";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  BookOpen,
  FlaskConical,
  Users,
  Shield,
  Heart
} from "lucide-react";
import AppLogo from "../common/app-logo";
import { Button } from "../ui/button";
import Link from "next/link";

export const RootFooter = () => {
	return (
		<footer className="relative bg-background border-t w-full">
			<div className="top-0 right-1/2 left-1/2 absolute bg-foreground/20 rounded-full w-1/3 h-px -translate-x-1/2 -translate-y-1/2 blur" />

			<div className="container py-12 lg:py-16">
				<div className="gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					{/* Thông tin ViLAB */}
					<AnimatedContainer className="space-y-4" delay={0.1}>
						<AppLogo />
						<p className="text-muted-foreground text-sm leading-relaxed">
							Nền tảng học tập STEM hiện đại với mô phỏng thí nghiệm trực tuyến, 
							kho học liệu số phong phú và công cụ tương tác trực tiếp cho giáo viên và học sinh.
						</p>
						<div className="flex space-x-4">
							<Button variant="ghost" size="sm" className="p-2">
								<Facebook className="size-4" />
							</Button>
							<Button variant="ghost" size="sm" className="p-2">
								<Twitter className="size-4" />
							</Button>
							<Button variant="ghost" size="sm" className="p-2">
								<Youtube className="size-4" />
							</Button>
							<Button variant="ghost" size="sm" className="p-2">
								<Linkedin className="size-4" />
							</Button>
						</div>
					</AnimatedContainer>

					{/* Tính năng chính */}
					<AnimatedContainer className="space-y-4" delay={0.2}>
						<h3 className="font-semibold text-lg">Tính năng chính</h3>
						<ul className="space-y-3">
							<li className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
								<FlaskConical className="size-4 text-primary" />
								<span>Mô phỏng thí nghiệm</span>
							</li>
							<li className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
								<BookOpen className="size-4 text-primary" />
								<span>Kho học liệu số</span>
							</li>
							<li className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
								<Users className="size-4 text-primary" />
								<span>Quản lý lớp học</span>
							</li>
							<li className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
								<Shield className="size-4 text-primary" />
								<span>Bảo mật dữ liệu</span>
							</li>
						</ul>
					</AnimatedContainer>

					{/* Liên kết hữu ích */}
					<AnimatedContainer className="space-y-4" delay={0.3}>
						<h3 className="font-semibold text-lg">Liên kết hữu ích</h3>
						<ul className="space-y-3">
							<li>
								<Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
									Khám phá bài giảng
								</Link>
							</li>
							<li>
								<Link href="/simulation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
									Mô phỏng thí nghiệm
								</Link>
							</li>
							<li>
								<Link href="/auth/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
									Đăng ký tài khoản
								</Link>
							</li>
							<li>
								<Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
									Đăng nhập
								</Link>
							</li>
						</ul>
					</AnimatedContainer>

					{/* Thông tin liên hệ */}
					<AnimatedContainer className="space-y-4" delay={0.4}>
						<h3 className="font-semibold text-lg">Liên hệ</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-3 text-sm text-muted-foreground">
								<Mail className="size-4 text-primary" />
								<span>contact@vilab.edu.vn</span>
							</div>
							<div className="flex items-center space-x-3 text-sm text-muted-foreground">
								<Phone className="size-4 text-primary" />
								<span>+84 24 1234 5678</span>
							</div>
							<div className="flex items-center space-x-3 text-sm text-muted-foreground">
								<MapPin className="size-4 text-primary" />
								<span>Hà Nội, Việt Nam</span>
							</div>
						</div>
					</AnimatedContainer>
				</div>

				{/* Đường phân cách */}
				<div className="border-t border-border mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="flex items-center space-x-2 text-sm text-muted-foreground">
							<span>© {new Date().getFullYear()} {APP_INFO.name}. Được phát triển với</span>
							<Heart className="size-4 text-red-500" />
							<span>tại Việt Nam</span>
						</div>
						<div className="flex items-center space-x-6 text-sm">
							<Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
								Chính sách bảo mật
							</Link>
							<Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
								Điều khoản sử dụng
							</Link>
							<Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
								Trợ giúp
							</Link>
						</div>
					</div>
					{APP_INFO.appVersion && (
						<div className="text-center mt-4">
							<p className="text-muted-foreground/70 text-xs">
								Phiên bản {APP_INFO.appVersion}
							</p>
						</div>
					)}
				</div>
			</div>
		</footer>
	);
};

type IViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>["className"];
	children: ReactNode;
};

const AnimatedContainer = ({
	className,
	delay = 0.1,
	children,
}: IViewAnimationProps) => {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
			whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
