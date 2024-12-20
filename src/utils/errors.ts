import { ZodIssue } from "zod";
import { formatValidationErrors } from "./formatted-message";
import { getId } from "./short-id";

export interface ErrorDetails {
  code: string;
  message: string;
  details: string | ZodIssue[];
  suggestion: string;
}

export interface ErrorResponse {
  status?: string;
  statusCode: number;
  error: ErrorDetails;
  requestId?: string;
  documentation_url?: string;
  timestamp: string;
}

interface GenerateErrorParams {
  statusCode: number;
  code: string;
  message: string;
  details?: string | ZodIssue[];
  suggestion?: string;
  requestId?: string;
  documentation_url?: string;
}

export const generateErrorResponse = ({
  statusCode,
  requestId = getId(),
  documentation_url = "https://api.example.com/docs/errors",
  code,
  message,
  details = "Please check your request and try again.",
  suggestion = "If the problem persists, please contact support.",
}: GenerateErrorParams): ErrorResponse => {
  const errorDetails: ErrorDetails = {
    code,
    message,
    details,
    suggestion,
  };

  return {
    status: "error",
    statusCode,
    error: errorDetails,
    requestId,
    documentation_url,
    timestamp: new Date().toISOString(),
  };
};

export const defaultError = (err: any): GenerateErrorParams => {
  const details = err.error?.details;

  const formattedMessage = Array.isArray(details)
    ? formatValidationErrors(details)
    : err.error?.message || "An unexpected error occurred.";

  return {
    statusCode: 500,
    code: err.error?.code || "INTERNAL_SERVER_ERROR",
    message: formattedMessage,
    details: err.error?.details || "No additional details available.",
    suggestion: err.error?.suggestion || undefined,
    documentation_url: err.documentation_url,
  };
};

export const syntaxError: GenerateErrorParams = {
  statusCode: 400,
  code: "SYNTAX_ERROR",
  message: "Invalid JSON format in request body.",
  details: "Check for syntax errors like missing quotes or extra commas.",
  suggestion:
    "Ensure JSON keys are double-quoted and there are no trailing commas.",
};

export const badRequest: GenerateErrorParams = {
  statusCode: 400,
  code: "BAD_REQUEST",
  message: "Bad Request",
  details: "Validation failed for the input data.",
  suggestion: "Please check the input fields and try again.",
};

export const internalServerError: GenerateErrorParams = {
  statusCode: 500,
  code: "INTERNAL_SERVER_ERROR",
  message: "Internal Server Error",
  details: "An unexpected error occurred on the server.",
  suggestion:
    "Please try again later or contact support if the issue persists.",
};

export const notFoundError: GenerateErrorParams = {
  statusCode: 404,
  code: "NOT_FOUND",
  message: "Resource not found",
  details: `The requested resource was not found on this server.`,
  suggestion: "Please check the URL or refer to the API documentation.",
};

export const authenticationError: GenerateErrorParams = {
  statusCode: 401,
  code: "AUTHENTICATION_FAILED",
  message: "Authentication Error",
  details: "Authentication failed due to invalid credentials.",
  suggestion: "Please verify your credentials and try again.",
};

export const authorizationError: GenerateErrorParams = {
  statusCode: 403,
  code: "PERMISSION_DENIED",
  message: "Authorization Error",
  details: "You do not have permission to access this resource.",
  suggestion: "Please check your permissions or contact the administrator.",
};

export const conflictError = (
  resourceName: string,
  resourceValue: string
): GenerateErrorParams => {
  return {
    statusCode: 409,
    code: "RESOURCE_CONFLICT",
    message: `${resourceValue} already exists.`,
    details: `A resource with the specified ${resourceValue.toLowerCase()} already exists in the system.`,
    suggestion: `Please use a unique ${resourceName.toLowerCase()} or check the resource for correctness.`,
  };
};

export const unprocessableEntityError: GenerateErrorParams = {
  statusCode: 422,
  code: "UNPROCESSABLE_ENTITY",
  message: "Unprocessable Entity",
  details: "The request could not be processed due to semantic errors.",
  suggestion: "Please verify the input data and try again.",
};

export const methodNotAllowedError: GenerateErrorParams = {
  statusCode: 405,
  code: "METHOD_NOT_ALLOWED",
  message: "Method Not Allowed",
  details: "The HTTP method used is not allowed for this endpoint.",
  suggestion: "Please check the allowed methods for this endpoint.",
};

export const tooManyRequestsError: GenerateErrorParams = {
  statusCode: 429,
  code: "TOO_MANY_REQUESTS",
  message: "Too Many Requests",
  details: "Too many requests were sent in a short period.",
  suggestion: "Please wait before sending more requests.",
};

export const resourceNotFoundError = (
  resourceName: string,
  resourceId: string
): GenerateErrorParams => {
  return {
    statusCode: 404,
    code: "RESOURCE_NOT_FOUND",
    message: `${resourceName} with ID ${resourceId} not found.`,
    details: `The requested ${resourceName.toLowerCase()} with ID ${resourceId} was not found on this server.`,
    suggestion: `Please verify the ${resourceName.toLowerCase()} ID or check the resource status.`,
  };
};

export const duplicateKeyError = (
  resourceName: string,
  keyName: string
): GenerateErrorParams => {
  return {
    statusCode: 409,
    code: "DUPLICATE_KEY_ERROR",
    message: `${resourceName} with the same ${keyName} already exists.`,
    details: `A ${resourceName.toLowerCase()} with the specified ${keyName.toLowerCase()} already exists.`,
    suggestion: `Please ensure the ${keyName.toLowerCase()} is unique before trying again.`,
  };
};
