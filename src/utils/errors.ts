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

export const handleDefaultError = (
  err: any,
  path: string,
  requestId?: string
): ErrorResponse => {
  const errorData = {
    ...internalServerError,
    code: err.error?.code || "INTERNAL_SERVER_ERROR",
    message: err.error?.message || "An unexpected error occurred.",
    details: err.error?.details || "No additional details available.",
    path,
    suggestion: err.error?.suggestion || undefined,
    requestId,
  };
  return generateErrorResponse(errorData);
};

export const handleSyntaxError = (
  path: string,
  requestId?: string
): ErrorResponse => {
  return generateErrorResponse({
    ...badRequest,
    code: "SYNTAX_ERROR",
    message: "Invalid JSON format in request body.",
    details: "Check for syntax errors like missing quotes or extra commas.",
    path,
    suggestion:
      "Ensure JSON keys are double-quoted and there are no trailing commas.",
    requestId,
  });
};

export const badRequest: ErrorRequestParams = {
  statusCode: 400,
  code: "BAD_REQUEST",
  message: "Bad Request",
  details: "Validation failed for the input data.",
  suggestion: "Please check the input fields and try again.",
};

export const internalServerError: ErrorRequestParams = {
  statusCode: 500,
  code: "INTERNAL_SERVER_ERROR",
  message: "Internal Server Error",
  details: "An unexpected error occurred on the server.",
  suggestion:
    "Please try again later or contact support if the issue persists.",
};

export const notFoundError = (path?: string): ErrorRequestParams => {
  return {
    statusCode: 404,
    code: "NOT_FOUND",
    message: "Resource not found",
    details: `The requested resource ${path} was not found on this server.`,
    suggestion: "Please check the URL or refer to the API documentation.",
  };
};

export const authenticationError = (path?: string) => {
  return {
    statusCode: 401,
    code: "AUTHENTICATION_FAILED",
    message: "Authentication Error",
    details: "Authentication failed due to invalid credentials.",
    suggestion: "Please verify your credentials and try again.",
    path,
  };
};

export const authorizationError = {
  statusCode: 403,
  code: "PERMISSION_DENIED",
  message: "Authorization Error",
  details: "You do not have permission to access this resource.",
  suggestion: "Please check your permissions or contact the administrator.",
};

export const conflictError = (resourceName: string, resourceValue: string) => {
  return {
    statusCode: 409,
    code: "RESOURCE_CONFLICT",
    message: `${resourceValue} already exists.`,
    details: `A resource with the specified ${resourceValue.toLowerCase()} already exists in the system.`,
    suggestion: `Please use a unique ${resourceName.toLowerCase()} or check the resource for correctness.`,
  };
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
