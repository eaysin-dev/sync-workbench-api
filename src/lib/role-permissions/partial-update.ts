import { RolePermission } from "@/models/RolePermission";
import { RolePermissionSchemaType } from "@/schemas/role-permission";
import { IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError } from "@/utils";

const partialUpdate = async (
  id: IdSchemaType,
  data: RolePermissionSchemaType
) => {
  const { permission, role } = data;
  const rolePermission = await RolePermission.findById(id);

  if (!rolePermission) generateErrorResponse(notFoundError);

  rolePermission?.set({ permission, role });
  await rolePermission?.save();

  return rolePermission?.toObject();
};

export default partialUpdate;
