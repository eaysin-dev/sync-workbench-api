import { Role } from "@/models/Role";
import { RoleSchemaType } from "@/schemas/role";
import { IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError } from "@/utils";

const partialUpdate = async (id: IdSchemaType, data: RoleSchemaType) => {
  const { name, description } = data;

  const role = await Role.findById(id);
  if (!role) generateErrorResponse(notFoundError);

  role?.set({ name, description });
  await role?.save();

  return role?.toObject();
};

export default partialUpdate;
