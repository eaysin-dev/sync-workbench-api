import { badRequest } from "@/utils/errors";
import { ZodError, ZodSchema } from "zod";

export const validateSchema = <T>(schema: ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw badRequest(message);
    }
    throw error;
  }
};

export default validateSchema;
