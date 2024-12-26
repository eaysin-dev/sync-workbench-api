import ApplicationError, { ErrorOptions } from "./application-error";

export default class InternalServerError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "INTERNAL_SERVER_ERROR",
      message: message || "Internal Server Error",
      details: details || "An unexpected error occurred on the server.",
      suggestion:
        suggestion ||
        "Please try again later or contact support if the issue persists.",
    };

    super({
      message: message || "Internal Server Error",
      statusCode: 500,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
