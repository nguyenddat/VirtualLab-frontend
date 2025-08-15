"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { TEACHER_NAVIGATION } from "@/lib/configs/teacher-navigation";
import { useBreadcrumb } from "@/lib/hooks/use-breadcrumb";
import { cn } from "@/lib/utils/tailwind";
import { usePathname } from "next/navigation";
import { BreadcrumbNav } from "./breadcrumb-navigation";

export const TeacherSidebar = () => {
	const pathname = usePathname();
	const breadcrumbItems = useBreadcrumb(TEACHER_NAVIGATION);

	return (
		<Sidebar>
			<SidebarHeader className="border-b border-border/40">
				<div className="flex items-center gap-2 px-2">
					<SidebarTrigger className="-ml-1" />
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<span className="text-sm font-semibold">T</span>
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-semibold">Teacher Console</span>
							<span className="text-xs text-muted-foreground">Quản lý giáo viên</span>
						</div>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					{TEACHER_NAVIGATION.navMain.map((item) => {
						const isActive = pathname === item.url;
						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									isActive={isActive}
									className={cn(
										"flex items-center gap-2",
										isActive && "bg-primary/10 text-primary"
									)}
								>
									<a href={item.url}>
										{item.icon && <item.icon className="size-4" />}
										<span className="hidden lg:inline">{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
};
