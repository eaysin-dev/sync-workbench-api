import ApplicationError, { ErrorOptions } from "./application-error";

export default class SyntaxError extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails = {
      code: "SYNTAX_ERROR",
      message: message || "Invalid JSON format in request body.",
      details:
        details ||
        "Check for syntax errors like missing quotes or extra commas.",
      suggestion:
        suggestion ||
        "Ensure JSON keys are double-quoted and there are no trailing commas.",
    };

    super({
      message: message || "Syntax Error",
      statusCode: 400,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
