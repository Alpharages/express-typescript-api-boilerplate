export interface ErrorResponse {
  status: number;
  message: string;
  stack?: string;
}

export interface SuccessResponse<T> {
  status: number;
  data: T;
}

export interface PaginatedResponse<T> extends SuccessResponse<T> {
  page: number;
  limit: number;
  total: number;
}