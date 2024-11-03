import { ZodIssue } from "zod";

export const formatValidationErrors = (details: ZodIssue[]): string => {
  return details
    .map((detail) => {
      const path = detail.path.join(".");
      return `${path}: ${detail.message}`;
    })
    .join("; ");
};
