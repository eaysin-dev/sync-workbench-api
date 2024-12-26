import { ErrorDetails } from "@/utils";
import ApplicationError, { ErrorOptions } from "./application-error";

export default class BadRequest extends ApplicationError {
  constructor(options: ErrorOptions = {}) {
    const { message, details, suggestion } = options;

    const defaultDetails: ErrorDetails = {
      code: "BAD_REQUEST",
      message: message || "Bad request",
      details: details || [],
      suggestion:
        suggestion || "Please check the request parameters and try again.",
    };

    super({
      message: message || "Bad Request",
      statusCode: 400,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
