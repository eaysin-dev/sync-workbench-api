import { z } from "zod";

export const permissionSchema = z.object({
  resource: z.string().min(1, { message: "Resource is required" }),
  action: z.enum(["read", "create", "update", "delete"], {
    message: "Action must be one of 'read', 'create', 'update', or 'delete'",
  }),
  description: z.string().optional(),
});

export type PermissionSchemaType = z.infer<typeof permissionSchema>;
