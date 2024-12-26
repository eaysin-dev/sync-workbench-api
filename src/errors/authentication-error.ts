import ApplicationError, { ErrorOptions } from "./application-error";

export default class AuthenticationError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "AUTHENTICATION_FAILED",
      message: message || "Authentication Error",
      details: details || "Authentication failed due to invalid credentials.",
      suggestion: suggestion || "Please verify your credentials and try again.",
    };

    super({
      message: message || "Authentication Error",
      statusCode: 401,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
