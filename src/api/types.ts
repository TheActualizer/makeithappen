export interface ApiResponse<T> {
  data: T;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  totalPages: number;
  totalItems: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}