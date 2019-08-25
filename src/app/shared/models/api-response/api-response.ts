export interface ApiResponse {
  status: number;
  content: Object;
  message: string;
}

export interface ApiListResponse {
  status: number;
  content: Array<any>;
  message: string;
}

export interface PagingModel {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  data: Array<any>;
}

export interface ApiError {
  status: number;
  errorMessage: string;
  message: string;
  error: string;
}

export interface ApiDescriptionError {
  status: number;
  error_description: string;
  error: string;
}
