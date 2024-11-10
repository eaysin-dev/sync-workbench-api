import { Role } from "@/model/Role";
import { RoleSchemaType } from "@/schemas/role";

const create = async (data: RoleSchemaType) => {
  const { name, description } = data;

  const role = new Role({
    name,
    description,
  });

  await role.save();
  return role.toObject();
};

export default create;
