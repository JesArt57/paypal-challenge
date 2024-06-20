export interface APISuccessfulResponse<T> {
  traceId: string;

  message: string;

  data?: T;
}

export interface APIErrorResponse {
  traceId: string;

  message: string;

  errors: string[];
}
