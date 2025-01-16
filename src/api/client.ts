import { API_CONFIG } from './config';
import type { ApiResponse, ApiError } from './types';

class ApiClient {
  private static instance: ApiClient;
  
  private constructor() {
    console.log('ApiClient: Initializing');
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      console.log(`ApiClient: Making request to ${endpoint}`);
      
      const url = `${API_CONFIG.baseUrl}${endpoint}`;
      const headers = {
        ...API_CONFIG.defaultHeaders,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('ApiClient: Request failed', error);
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'REQUEST_FAILED',
      };
      return { 
        data: null as T,
        error: apiError.message 
      };
    }
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = ApiClient.getInstance();