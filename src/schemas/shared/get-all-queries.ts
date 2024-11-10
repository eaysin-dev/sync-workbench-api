import { z } from "zod";

export const getAllQuerySchema = z.object({
  page: z
    .preprocess(
      (val) => parseInt(val as string, 10),
      z.number().int().nonnegative().default(1)
    )
    .optional(),
  limit: z
    .preprocess(
      (val) => parseInt(val as string, 10),
      z.number().int().nonnegative().max(100).default(10).optional()
    )
    .optional(),
  sortBy: z.string().optional().default("updatedAt"),
  sortType: z.enum(["asc", "dsc"]).optional().default("asc"),
  search: z.string().optional(),
});

export type GetAllQuerySchemaType = z.infer<typeof getAllQuerySchema>;
