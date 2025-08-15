/**
 * API Configuration
 * Quản lý tất cả các API endpoints và biến môi trường
 */

// Environment variables
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// API Base URLs
export const API_CONFIG = {
  // Backend API
  BACKEND_URL: process.env.NEXT_PUBLIC_API_URL || 'https://virtuallab.onrender.com',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : 'https://virtuallab.onrender.com/api',
  
  // External APIs
  DICEBEAR_API: 'https://api.dicebear.com',
  GITHUB_API: 'https://api.github.com',
  
  // Static files
  STATIC_URL: process.env.NEXT_PUBLIC_STATIC_URL || 'https://virtuallab.onrender.com/static',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // User endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
  },
  
  // Catalog endpoints
  CATALOG: {
    SUBJECTS: '/subject',
    BOOK_SETS: '/bookset',
    BOOKS: '/book',
    CHAPTERS: '/chapter',
    EXPERIMENTS: '/experiment',
    USER_EXPERIMENTS: (userId: number, offset?: number, limit?: number) => {
      const params = new URLSearchParams();
      if (offset !== undefined) params.append('offset', offset.toString());
      if (limit !== undefined) params.append('limit', limit.toString());
      const queryString = params.toString();
      return `/experiment/user/${userId}${queryString ? `?${queryString}` : ''}`;
    },
    CREATE_EXPERIMENT: (userId: number) => `/experiment/user/${userId}`,
  },
  
  // Simulation endpoints
  SIMULATION: {
    EXPERIMENT_DATA: (id: number) => `/experiment/${id}`,
    STUDENT_EXPLAIN: '/physics/student_explain',
  },
  
  // Members endpoints
  MEMBERS: {
    LIST: '/members',
    CREATE: '/members',
    UPDATE: (id: string) => `/members/${id}`,
    DELETE: (id: string) => `/members/${id}`,
  },
  
  // Overview/Stats endpoints
  OVERVIEW: {
    STATS: '/overview/stats',
    PROJECT_PROGRESS: '/overview/project-progress',
    TASK_COMPLETION: '/overview/task-completion',
    TOP_PERFORMERS: '/overview/top-performers',
    MEMBER_WORKLOAD: '/overview/member-workload',
  },
  
  // Tasks endpoints
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
  },
} as const;

// Helper functions
export const apiHelpers = {
  /**
   * Tạo URL đầy đủ cho API endpoint
   */
  buildUrl: (endpoint: string): string => {
    return `${API_CONFIG.API_BASE_URL}${endpoint}`;
  },
  
  /**
   * Tạo URL cho static files
   */
  buildStaticUrl: (path: string): string => {
    return `${API_CONFIG.STATIC_URL}/${path}`;
  },
  
  /**
   * Tạo URL cho Dicebear avatar
   */
  buildAvatarUrl: (seed: string, style: string = 'lorelei'): string => {
    return `${API_CONFIG.DICEBEAR_API}/9.x/${style}/svg?seed=${seed}`;
  },
  
  /**
   * Tạo URL cho GitHub API
   */
  buildGithubUrl: (owner: string, repo: string): string => {
    return `${API_CONFIG.GITHUB_API}/repos/${owner}/${repo}`;
  },
  
  /**
   * Kiểm tra xem có phải môi trường development không
   */
  isDevelopment: (): boolean => isDevelopment,
  
  /**
   * Kiểm tra xem có phải môi trường production không
   */
  isProduction: (): boolean => isProduction,
} as const;

// Default request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

// Request timeout (ms)
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Retry configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  BACKOFF_MULTIPLIER: 2,
} as const;

// Export types
export type ApiEndpoint = typeof API_ENDPOINTS;
export type ApiConfig = typeof API_CONFIG;
