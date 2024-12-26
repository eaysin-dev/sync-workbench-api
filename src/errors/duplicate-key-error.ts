import { ErrorDetails } from "@/utils";
import ApplicationError, { ErrorOptions } from "./application-error";

export default class DuplicateKeyError extends ApplicationError {
  constructor(
    resourceName: string,
    keyName: string,
    options: ErrorOptions = {}
  ) {
    const { message, details, suggestion } = options;

    const defaultDetails: ErrorDetails = {
      code: "DUPLICATE_KEY_ERROR",
      message:
        message || `${resourceName} with the same ${keyName} already exists.`,
      details:
        details ||
        `A ${resourceName.toLowerCase()} with the specified ${keyName.toLowerCase()} already exists.`,
      suggestion:
        suggestion ||
        `Please ensure the ${keyName.toLowerCase()} is unique before trying again.`,
    };

    super({
      message: message || `${resourceName} Duplicate Key Error`,
      statusCode: 409,
      details: defaultDetails.details,
      suggestion: defaultDetails.suggestion,
    });
  }
}
