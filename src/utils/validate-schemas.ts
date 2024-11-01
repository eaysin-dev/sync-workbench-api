import { ZodError, ZodSchema } from "zod";
import { formatErrorResponse } from "./format-error-response";

export const validateSchemas = <T>(data: unknown, schema: ZodSchema<T>): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedDetails = error.errors.reduce((acc, err) => {
        const path = err.path.join(".");
        acc[path] = acc[path] ? `${acc[path]}; ${err.message}` : err.message;
        return acc;
      }, {} as Record<string, string>);

      throw formatErrorResponse({
        status: "error",
        statusCode: 400,
        code: "VALIDATION_ERROR",
        message: "Invalid input.",
        details: formattedDetails,
        path: "",
        suggestion: "Please check the input data and try again.",
        requestId: "unknown",
      });
    }

    throw error;
  }
};
