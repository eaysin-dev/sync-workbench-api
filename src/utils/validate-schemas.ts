import { ZodSchema } from "zod";
import { badRequest, generateErrorResponse } from "./errors";

export const validateSchemas = <T>(data: unknown, schema: ZodSchema<T>): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw generateErrorResponse({
      ...badRequest,
      details: result.error.issues,
      message: result.error.message,
    });
  }

  return result.data;
};
