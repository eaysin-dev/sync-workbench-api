import { z } from "zod";

export const ErrorResponseSchema = z.object({
  status: z.enum(["error", "success"]),
  statusCode: z.number(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.string().optional(),
    timestamp: z.string(), // ISO date string
    path: z.string(),
    suggestion: z.string().optional(),
  }),
  requestId: z.string(),
  documentation_url: z.string().url(),
});

export type ErrorResponseType = z.infer<typeof ErrorResponseSchema>;
