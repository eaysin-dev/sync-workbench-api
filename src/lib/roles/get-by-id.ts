import { Role } from "@/models/Role";
import { IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError } from "@/utils";

const getById = async (id: IdSchemaType) => {
  const role = await Role.findById(id);
  if (!role) throw generateErrorResponse(notFoundError);

  return { role: role.toObject() };
};

export default getById;
