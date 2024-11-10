import { Role } from "@/model/Role";
import { roleSchema, RoleSchemaType } from "@/schemas/role";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";

const upsert = async (identity: IdSchemaType, data: RoleSchemaType) => {
  const id = validateSchemas(identity, idSchema);
  const roleData = validateSchemas(data, roleSchema);

  let role = await Role.findById(id);

  if (!role) {
    role = new Role(roleData);
    await role.save();
    return { employee: role.toObject(), statusCode: 201 };
  }

  role.overwrite(roleData);
  await role.save();

  return { role: role.toObject(), statusCode: 200 };
};

export default upsert;
