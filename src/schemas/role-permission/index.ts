import { z, ZodSchema } from "zod";
import { createPopulateSchema } from "../shared/expend";
import { getAllQuerySchema } from "../shared/get-all-queries";
import { idSchema } from "../shared/id";

export const rolePermissionExpendEnum = ["role", "permission"];

export const rolePermissionSchema = z.object({
  role: z.string().min(1, { message: "Role ID is required" }),
  permission: z.string().min(1, { message: "Permission ID is required" }),
});

export type RolePermissionSchemaType = z.infer<typeof rolePermissionSchema>;

export const rolePermissionQuerySchema: ZodSchema = getAllQuerySchema.extend({
  populate: createPopulateSchema(rolePermissionExpendEnum),
});

export type RolePermissionQuerySchemaType = z.infer<
  typeof rolePermissionQuerySchema
>;

export const rolePermissionGetByIdSchema: ZodSchema = z.object({
  id: idSchema,
  populate: createPopulateSchema(rolePermissionExpendEnum).optional(),
});

export type RolePermissionGetByIdSchemaType = z.infer<
  typeof rolePermissionGetByIdSchema
>;
