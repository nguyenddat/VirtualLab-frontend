"use client";

import { ChevronRight, User, Settings, LogOut, LayoutDashboard, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/features/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface IUserMenu {
	shouldShowGoToApp?: boolean;
}
export const UserMenu = ({ shouldShowGoToApp = false }: IUserMenu) => {
	const { isAuthenticated, isLoading, user, logout, hasRole } = useAuthContext();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/auth/login");
	};

	if (isLoading) return <Skeleton className="rounded-full size-6" />;

	if (isAuthenticated) {
		if (shouldShowGoToApp) {
			const dashboardUrl = hasRole("teacher") ? "/teacher/overview" : "/dashboard";
			return (
				<Link href={dashboardUrl}>
					<Button className="rounded-full w-full">
						{hasRole("teacher") ? "Console quản lý" : "Vào ứng dụng"}
						<ChevronRight className="ml-2 size-4" />
					</Button>
				</Link>
			);
		}
		
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-200">
						<AvatarImage src={user?.image} alt={user?.userName} />
						<AvatarFallback className="bg-primary/10 text-primary font-semibold">
							{user?.userName?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="center">
					<DropdownMenuLabel className="flex flex-col items-start">
						{user?.userName}
						{user?.email && (
							<span className="text-muted-foreground text-xs">{user.email}</span>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link 
								href={hasRole("teacher") ? "/teacher/overview" : "/dashboard"} 
								className="flex items-center gap-2"
							>
								{hasRole("teacher") ? (
									<GraduationCap className="size-4" />
								) : (
									<LayoutDashboard className="size-4" />
								)}
								{hasRole("teacher") ? "Console quản lý" : "Dashboard"}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-2">
							<User className="size-4" />
							Hồ sơ
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-2">
							<Settings className="size-4" />
							Cài đặt
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600 dark:text-red-400">
						<LogOut className="size-4" />
						Đăng xuất
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<Link href="/auth/login">
			<Button className="rounded-full w-full">
				Đăng nhập
				<ChevronRight className="ml-2 size-4" />
			</Button>
		</Link>
	);
};