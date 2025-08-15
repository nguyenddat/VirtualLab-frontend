import { BACKEND_API } from "@/lib/configs/environment";
import { fetcher } from "@/lib/utils/fetcher";
import { generateSampleSession } from "../utils/functions";
import type { ISession, IUser } from "../utils/types";

const AUTH_ENDPOINTS = {
  LOGIN: `${BACKEND_API}/api/auth/login`,
  REGISTER: `${BACKEND_API}/api/auth/register`,
  ME: `${BACKEND_API}/api/auth/me`,
};

export interface IPostLogin {
  username: string;
  password: string;
}

export interface IPostRegister {
  username: string;
  email: string;
  password: string;
  role?: 'student' | 'teacher' | 'admin';
}

export interface IAuthResponse {
  session: ISession;
  user: IUser;
}

// API response interface based on your backend
interface IApiLoginResponse {
  id: string;
  role: 'student' | 'teacher' | 'admin';
}

interface IApiMeResponse {
  id: string;
  username: string;
  role: 'student' | 'teacher' | 'admin';
}

const getUserByRole = (id: string, role: 'student' | 'teacher' | 'admin', username: string): IUser => {
  const baseUser = {
    id,
    userName: username,
    email: `${username}@example.com`,
    emailVerified: true,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    role,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  };

  return baseUser;
};

export const authServices = {
  login: async (params: IPostLogin): Promise<IAuthResponse> => {
    try {
      console.log("Login service called with params:", params);
      
      // Call real API
      const response = await fetcher<IApiLoginResponse>([
        AUTH_ENDPOINTS.LOGIN,
        { method: "POST", data: { username: params.username, password: params.password } },
      ]);

      console.log("API response:", response);

      // Create user object with API response + hardcoded fields
      const user = getUserByRole(response.id, response.role, params.username);
      
      // Generate session with fake token
      const session = generateSampleSession();
      session.userId = response.id;
      session.token = `fake_token_${response.id}_${Date.now()}`;

      return {
        session,
        user,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (params: IPostRegister): Promise<IAuthResponse> => {
    // const response = await fetcher<IAuthResponse>([
    //   AUTH_ENDPOINTS.REGISTER,
    //   { method: "POST", data: params },
    // ]);
    console.log("Register service called with params:", params);
    
    // Create user with specified role
    const user = getUserByRole(params.username, params.role || 'student', params.username);
    
    return {
      session: generateSampleSession(),
      user,
    };
    // return response;
  },

  me: async (): Promise<IUser> => {
    // Get user_id from localStorage
    const accessToken = localStorage.getItem('auth_access_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (!accessToken || !storedUser) {
      throw new Error('No authentication data found');
    }
    
    try {
      const userData = JSON.parse(storedUser);
      const userId = userData.id;
      
      const response = await fetcher<IApiMeResponse>([
        `${AUTH_ENDPOINTS.ME}?user_id=${userId}`,
        { method: "GET" },
      ]);
      
      // Create user object with API response (now includes role)
      const user = getUserByRole(response.id, response.role, response.username);
      
      return user;
    } catch (error) {
      console.error("Failed to get user info:", error);
      throw error;
    }
  },
};
