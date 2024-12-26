import ApplicationError, { ErrorOptions } from "./application-error";

export default class AuthorizationError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "PERMISSION_DENIED",
      message: message || "Authorization Error",
      details: details || "You do not have permission to access this resource.",
      suggestion:
        suggestion ||
        "Please check your permissions or contact the administrator.",
    };

    super({
      message: message || "Authorization Error",
      statusCode: 403,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
