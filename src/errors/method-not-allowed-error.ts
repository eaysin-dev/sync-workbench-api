import ApplicationError, { ErrorOptions } from "./application-error";

export default class MethodNotAllowedError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "METHOD_NOT_ALLOWED",
      message: message || "Method Not Allowed",
      details:
        details || "The HTTP method used is not allowed for this endpoint.",
      suggestion:
        suggestion || "Please check the allowed methods for this endpoint.",
    };

    super({
      message: message || "Method Not Allowed",
      statusCode: 405,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
