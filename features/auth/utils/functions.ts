import type { ISession, UserRole } from "./types";

export const generateSampleSession = (): ISession => {
  return {
    id: "sample-session-id",
    token: "sample-access-token",
    userId: "sample-user-id",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userAgent: "sample-user-agent",
  };
};

export const getRedirectPathByRole = (role?: UserRole): string => {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'student':
    case 'teacher':
      return '/explore';
    default:
      return '/explore'; // Default to explore for unknown roles
  }
};

export const hasRole = (userRole?: UserRole, requiredRole?: UserRole): boolean => {
  if (!userRole || !requiredRole) return false;
  
  const roleHierarchy: Record<UserRole, number> = {
    student: 1,
    teacher: 2,
    admin: 3,
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const canAccessDashboard = (role?: UserRole): boolean => {
  return role === 'admin';
};

export const canAccessExplore = (role?: UserRole): boolean => {
  return role === 'student' || role === 'teacher' || role === 'admin';
};
