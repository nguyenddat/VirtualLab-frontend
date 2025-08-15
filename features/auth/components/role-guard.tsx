"use client";

import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { PageLoading } from "@/components/common/page-loading";
import { useAuthContext } from "../contexts/auth-context";
import type { UserRole } from "../utils/types";

interface IRoleGuardProps {
	children: ReactNode;
	requiredRole: UserRole;
	fallback?: ReactNode;
	redirectTo?: string;
}

export const RoleGuard = ({ 
	children, 
	requiredRole, 
	fallback = <PageLoading />,
	redirectTo = "/unauthorized"
}: IRoleGuardProps) => {
	const { isAuthenticated, isLoading, hasRole } = useAuthContext();

	if (isLoading) {
		return <PageLoading />;
	}

	if (!isAuthenticated) {
		redirect("/auth/login");
	}

	if (!hasRole(requiredRole)) {
		if (redirectTo) {
			redirect(redirectTo);
		}
		return <>{fallback}</>;
	}

	return <>{children}</>;
};

export const AdminGuard = ({ children, fallback, redirectTo }: Omit<IRoleGuardProps, 'requiredRole'>) => (
	<RoleGuard requiredRole="admin" fallback={fallback} redirectTo={redirectTo}>
		{children}
	</RoleGuard>
);

export const TeacherGuard = ({ children, fallback, redirectTo }: Omit<IRoleGuardProps, 'requiredRole'>) => (
	<RoleGuard requiredRole="teacher" fallback={fallback} redirectTo={redirectTo}>
		{children}
	</RoleGuard>
);

export const StudentGuard = ({ children, fallback, redirectTo }: Omit<IRoleGuardProps, 'requiredRole'>) => (
	<RoleGuard requiredRole="student" fallback={fallback} redirectTo={redirectTo}>
		{children}
	</RoleGuard>
);
