import { z } from "zod";

export const idSchema = z.object({
  id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ID format"),
});

export type IdSchemaType = z.infer<typeof idSchema>;
