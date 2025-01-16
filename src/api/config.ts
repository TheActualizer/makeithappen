export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  cacheDuration: 5 * 60 * 1000, // 5 minutes
};

export const CACHE_KEYS = {
  user: 'user',
  projects: 'projects',
  analytics: 'analytics',
  gameState: 'gameState',
} as const;