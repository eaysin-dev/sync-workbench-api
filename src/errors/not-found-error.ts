import ApplicationError, { ErrorOptions } from "./application-error";

export default class NotFoundError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "NOT_FOUND",
      message: message || "Resource not found",
      details:
        details || "The requested resource was not found on this server.",
      suggestion:
        suggestion || "Please check the URL or refer to the API documentation.",
    };

    super({
      message: message || "Resource Not Found",
      statusCode: 404,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
