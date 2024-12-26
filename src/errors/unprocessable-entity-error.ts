import ApplicationError, { ErrorOptions } from "./application-error";

export default class UnprocessableEntityError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "UNPROCESSABLE_ENTITY",
      message: message || "Unprocessable Entity",
      details:
        details || "The request could not be processed due to semantic errors.",
      suggestion: suggestion || "Please verify the input data and try again.",
    };

    super({
      message: message || "Unprocessable Entity",
      statusCode: 422,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
