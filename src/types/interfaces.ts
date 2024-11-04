import { ZodError } from "zod";

export interface ErrorDetails {
  code: string;
  message: string;
  details: string | ZodError;
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
