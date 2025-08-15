"use client";

import { redirect } from "next/navigation";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { PageLoading } from "@/components/common/page-loading";
import { getItem, removeItem, setItem } from "@/lib/utils/storage";
import { useAuthSWR } from "../hooks/use-auth-swr";
import type { IPostLogin, IPostRegister } from "../services/auth";
import type { IUser, UserRole } from "../utils/types";
import { canAccessDashboard, canAccessExplore, hasRole } from "../utils/functions";

interface IAuthContext {
	user: IUser | undefined;
	isAuthenticated: boolean;
	isLoading: boolean;

	login: (credentials: IPostLogin) => Promise<void>;
	register: (userData: IPostRegister) => Promise<void>;
	logout: () => void;
	refreshUser: () => Promise<void>;

	isLoggingIn: boolean;
	isRegistering: boolean;

	resetLogin: () => void;
	resetRegister: () => void;

	loginError: Error | null;
	registerError: Error | null;
	userError: Error | null;

	// Role-based utilities
	hasRole: (requiredRole: UserRole) => boolean;
	canAccessDashboard: () => boolean;
	canAccessExplore: () => boolean;
	userRole: UserRole | undefined;
}

const STORAGE_KEYS = {
	ACCESS_TOKEN: "auth_access_token",
	REFRESH_TOKEN: "auth_refresh_token",
	USER: "auth_user",
};

const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [isInitializing, setIsInitializing] = useState(true);
	const [localUser, setLocalUser] = useState<IUser | undefined>(undefined);

	const {
		user,
		isAuthenticated,
		isLoadingUser,
		userError,
		login: authLogin,
		register: authRegister,
		logout: authLogout,
		refreshUser: authRefreshUser,
		isLoggingIn,
		isRegistering,
		loginError,
		registerError,
		resetLogin,
		resetRegister,
	} = useAuthSWR();

	const clearStoredAuth = () => {
		removeItem(STORAGE_KEYS.ACCESS_TOKEN);
		removeItem(STORAGE_KEYS.REFRESH_TOKEN);
		removeItem(STORAGE_KEYS.USER);
		setLocalUser(undefined);
	};

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const accessToken = getItem(STORAGE_KEYS.ACCESS_TOKEN);
				const storedUser = getItem(STORAGE_KEYS.USER);

				if (accessToken && storedUser) {
					try {
						const parsedUser = JSON.parse(storedUser);
						setLocalUser(parsedUser);
						console.log("Restored user from localStorage:", parsedUser);
						
						// Try to refresh user data from API
						try {
							await authRefreshUser();
						} catch (error) {
							console.log("Failed to refresh user from API, using localStorage data");
						}
					} catch (error) {
						console.error("Failed to parse stored user:", error);
						clearStoredAuth();
					}
				}
			} catch (error) {
				console.error("Failed to initialize auth:", error);
			} finally {
				setIsInitializing(false);
			}
		};

		initializeAuth();
	}, [authRefreshUser]);

	const storeAuthData = (token: string, userData?: IUser) => {
		setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
		if (userData) {
			setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
			setLocalUser(userData);
		}
	};

	const login = async (credentials: IPostLogin) => {
		const response = await authLogin(credentials);
		if (response?.session.token) {
			storeAuthData(response.session.token, response.user);
		}
	};

	const register = async (userData: IPostRegister) => {
		const response = await authRegister(userData);
		if (response?.session.token) {
			storeAuthData(response.session.token, response.user);
		}
	};

	const logout = () => {
		clearStoredAuth();
		authLogout();
	};

	const refreshUser = async () => {
		// Try to get fresh user data from API
		try {
			await authRefreshUser();
		} catch (error) {
			console.log("Failed to refresh user from API, keeping localStorage data");
		}
	};

	// Use SWR user if available, otherwise fall back to localStorage user
	const currentUser = user || localUser;
	// Only consider userError if we don't have localStorage data
	const currentIsAuthenticated = Boolean(currentUser && (!userError || localUser));

	// Debug logs
	useEffect(() => {
		console.log("Auth state changed:", {
			localUser: !!localUser,
			swrUser: !!user,
			userError: !!userError,
			currentUser: !!currentUser,
			isAuthenticated: currentIsAuthenticated,
		});
	}, [localUser, user, userError, currentUser, currentIsAuthenticated]);

	const contextValue: IAuthContext = {
		user: currentUser,
		isAuthenticated: currentIsAuthenticated,
		isLoading: isInitializing || isLoadingUser,

		login,
		register,
		logout,
		refreshUser,

		isLoggingIn,
		isRegistering,

		loginError,
		registerError,
		userError,

		resetLogin,
		resetRegister,

		// Role-based utilities
		hasRole: (requiredRole: UserRole) => hasRole(currentUser?.role, requiredRole),
		canAccessDashboard: () => canAccessDashboard(currentUser?.role),
		canAccessExplore: () => canAccessExplore(currentUser?.role),
		userRole: currentUser?.role,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = (): IAuthContext => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}

	return context;
};

export const withAuth = <P extends object>(
	Component: React.ComponentType<P>,
): React.ComponentType<P> => {
	return (props: P) => {
		const { isAuthenticated, isLoading } = useAuthContext();

		if (isLoading) {
			return <PageLoading />;
		}

		if (!isAuthenticated) {
			return redirect("/unauthorized");
		}

		return <Component {...props} />;
	};
};

export const useRequireAuth = () => {
	const { isAuthenticated, isLoading } = useAuthContext();

	return {
		isLoading,
		isAuthenticated,
		shouldRedirect: !isLoading && !isAuthenticated,
	};
};
