import { z } from "zod";

export const zodIdObject = z
  .string()
  .min(1, "ID is required")
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid id string");

export const idSchema = z.object({
  id: zodIdObject,
});
