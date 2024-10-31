export interface ErrorDetails {
  code: string;
  message: string;
  details: string | Record<string, string>;
  timestamp: string;
  path: string;
  suggestion: string;
}

export interface ErrorResponse {
  status: string;
  statusCode: number;
  error: ErrorDetails;
  requestId: string;
  documentation_url: string;
}
