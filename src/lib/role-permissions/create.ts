import { RolePermission } from "@/models/RolePermission";
import { RolePermissionSchemaType } from "@/schemas/role-permission";

const create = async (data: RolePermissionSchemaType) => {
  const { permission, role } = data;

  const rolePermission = new RolePermission({
    role,
    permission,
  });

  await rolePermission.save();
  return rolePermission.toObject();
};

export default create;
