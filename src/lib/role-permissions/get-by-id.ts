import { RolePermission } from "@/models/RolePermission";
import {
  rolePermissionGetByIdSchema,
  RolePermissionGetByIdSchemaType,
} from "@/schemas/role-permission";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const getById = async (data: RolePermissionGetByIdSchemaType) => {
  const payload = validateSchemas(data, rolePermissionGetByIdSchema);

  const rolePermission = await RolePermission.findById(payload.id).populate(
    payload.expend
  );

  if (!rolePermission) throw generateErrorResponse(notFoundError);

  return { rolePermission: rolePermission.toObject() };
};

export default getById;
