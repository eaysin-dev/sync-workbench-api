import { Role } from "@/models/Role";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const getById = async (data: IdSchemaType) => {
  const id = validateSchemas(data, idSchema);

  const role = await Role.findById(id);

  if (!role) throw generateErrorResponse(notFoundError);

  return { role: role.toObject() };
};

export default getById;
