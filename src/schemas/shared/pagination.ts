import { z } from "zod";

export const paginationSchema = z.object({
  page: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().nonnegative().default(1)
  ),
  limit: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().nonnegative().max(100).default(10)
  ),
  total: z.number().int(),
  totalPage: z.number().int(),
  next: z.number().int().optional(),
  prev: z.number().int().optional(),
});

export type PaginationSchemaType = z.infer<typeof paginationSchema>;
