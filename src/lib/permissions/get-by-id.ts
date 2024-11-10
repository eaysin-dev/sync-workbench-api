import { Permission } from "@/model/Permission";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const getById = async (data: IdSchemaType) => {
  const id = validateSchemas(data, idSchema);

  const permission = await Permission.findById(id);

  if (!permission) throw generateErrorResponse(notFoundError);

  return { permission: permission.toObject() };
};

export default getById;
