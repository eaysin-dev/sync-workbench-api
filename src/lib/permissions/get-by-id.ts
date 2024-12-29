import { Permission } from "@/models/Permission";
import { IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError } from "@/utils";

const getById = async (id: IdSchemaType) => {
  const permission = await Permission.findById(id);
  if (!permission) throw generateErrorResponse(notFoundError);

  return { permission: permission.toObject() };
};

export default getById;
