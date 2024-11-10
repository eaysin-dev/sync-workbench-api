import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});

export type RoleSchemaType = z.infer<typeof roleSchema>;
