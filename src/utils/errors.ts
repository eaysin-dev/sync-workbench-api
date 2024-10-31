import { ErrorResponse } from "@/types/interfaces";
import { formatErrorResponse } from "./format-error-response";

interface ErrorRequestParams {
  statusCode: number;
  code: string;
  message: string;
  details?: string;
  path?: string;
  requestId?: string;
  suggestion?: string;
}

export const generateErrorResponse = ({
  statusCode,
  code,
  message,
  details = "Please check your request and try again.",
  path = "",
  requestId = "",
  suggestion = "If the problem persists, please contact support.",
}: ErrorRequestParams): ErrorResponse => {
  const errorResponse = formatErrorResponse({
    status: "error",
    statusCode,
    code,
    message,
    details,
    path,
    suggestion,
    requestId,
    documentationUrl: "https://api.example.com/docs/errors",
  });

  return {
    ...errorResponse,
    error: {
      ...errorResponse.error,
      timestamp: new Date().toISOString(),
    },
  };
};

export const badRequest = {
  statusCode: 400,
  code: "BAD_REQUEST",
  message: "Bad Request",
  details: "Validation failed for the input data.",
  suggestion: "Please check the input fields and try again.",
};

export const internalServerError = {
  statusCode: 500,
  code: "INTERNAL_SERVER_ERROR",
  message: "Internal Server Error",
  details: "An unexpected error occurred on the server.",
  suggestion:
    "Please try again later or contact support if the issue persists.",
};

export const authenticationError = {
  statusCode: 401,
  code: "AUTHENTICATION_FAILED",
  message: "Authentication Error",
  details: "Authentication failed due to invalid credentials.",
  suggestion: "Please verify your credentials and try again.",
};

export const authorizationError = {
  statusCode: 403,
  code: "PERMISSION_DENIED",
  message: "Authorization Error",
  details: "You do not have permission to access this resource.",
  suggestion: "Please check your permissions or contact the administrator.",
};

export const conflictError = {
  statusCode: 409,
  code: "CONFLICT_ERROR",
  message: "Conflict Error",
  details: "A conflict occurred with the current state of the resource.",
  suggestion: "Please review the request and try again.",
};

export const unprocessableEntityError = {
  statusCode: 422,
  code: "UNPROCESSABLE_ENTITY",
  message: "Unprocessable Entity",
  details: "The request could not be processed due to semantic errors.",
  suggestion: "Please verify the input data and try again.",
};

export const methodNotAllowedError = {
  statusCode: 405,
  code: "METHOD_NOT_ALLOWED",
  message: "Method Not Allowed",
  details: "The HTTP method used is not allowed for this endpoint.",
  suggestion: "Please check the allowed methods for this endpoint.",
};

export const tooManyRequestsError = {
  statusCode: 429,
  code: "TOO_MANY_REQUESTS",
  message: "Too Many Requests",
  details: "Too many requests were sent in a short period.",
  suggestion: "Please wait before sending more requests.",
};
