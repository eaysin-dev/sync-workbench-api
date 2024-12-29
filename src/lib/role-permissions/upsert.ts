import { RolePermission } from "@/models/RolePermission";
import { RolePermissionSchemaType } from "@/schemas/role-permission";
import { IdSchemaType } from "@/schemas/shared/id";

const upsert = async (id: IdSchemaType, data: RolePermissionSchemaType) => {
  const { permission, role } = data;

  let rolePermission = await RolePermission.findById(id);

  if (!rolePermission) {
    rolePermission = new RolePermission({ permission, role });
    await rolePermission.save();
    return { rolePermission: rolePermission.toObject(), statusCode: 201 };
  }

  rolePermission.overwrite({ permission, role });
  await rolePermission.save();

  return { rolePermission: rolePermission.toObject(), statusCode: 200 };
};

export default upsert;
