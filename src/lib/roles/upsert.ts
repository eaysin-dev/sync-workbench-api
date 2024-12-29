import { Role } from "@/models/Role";
import { RoleSchemaType } from "@/schemas/role";
import { IdSchemaType } from "@/schemas/shared/id";

const upsert = async (id: IdSchemaType, data: RoleSchemaType) => {
  const { name, description } = data;

  let role = await Role.findById(id);

  if (!role) {
    role = new Role({ name, description });
    await role.save();
    return { employee: role.toObject(), statusCode: 201 };
  }

  role.overwrite({ name, description });
  await role.save();

  return { role: role.toObject(), statusCode: 200 };
};

export default upsert;
