import { ErrorDetails, ErrorResponse } from "@/types/error";
import { formatValidationErrors } from "@/utils/formatted-message";
import { ZodIssue } from "zod";

export interface ErrorOptions {
  code?: string;
  statusCode?: number;
  message?: string;
  details?: string | ZodIssue[];
  suggestion?: string;
}

export default class ApplicationError extends Error {
  public code: string;
  public message: string;
  public statusCode: number;
  public details: string | ZodIssue[];
  public suggestion: string;

  constructor(options: ErrorOptions = {}) {
    const { code, message, statusCode, details, suggestion } = options;

    const defaultDetails: ErrorDetails = {
      code: code || "INTERNAL_SERVER_ERROR",
      message: message || "An error occurred",
      details: details || [],
      suggestion: suggestion || "Please try again later.",
    };

    super(message || defaultDetails.message);

    this.code = defaultDetails.code;
    this.message = defaultDetails.message;
    this.statusCode = statusCode || 500;
    this.details = defaultDetails.details;
    this.suggestion = defaultDetails.suggestion;
    this.name = this.constructor.name;
  }

  toErrorResponse(
    requestId?: string,
    documentationUrl?: string
  ): ErrorResponse {
    const formattedMessage = Array.isArray(this.details)
      ? formatValidationErrors(this.details)
      : this.details;

    return {
      status: "error",
      statusCode: this.statusCode,
      error: {
        code: this.code,
        message: this.message,
        details: formattedMessage,
        suggestion: this.suggestion,
      },
      requestId,
      documentation_url: documentationUrl,
      timestamp: new Date().toISOString(),
    };
  }
}
