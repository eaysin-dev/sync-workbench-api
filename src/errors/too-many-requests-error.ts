import ApplicationError, { ErrorOptions } from "./application-error";

export default class TooManyRequestsError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "TOO_MANY_REQUESTS",
      message: message || "Too Many Requests",
      details: details || "Too many requests were sent in a short period.",
      suggestion: suggestion || "Please wait before sending more requests.",
    };

    super({
      message: message || "Too Many Requests",
      statusCode: 429,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
