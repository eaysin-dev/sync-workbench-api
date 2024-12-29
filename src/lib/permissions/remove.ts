import { Permission } from "@/models/Permission";
import { generateErrorResponse, notFoundError } from "@/utils";
import { IdSchemaType } from "./../../schemas/shared/id";

const remove = async (id: IdSchemaType) => {
  const permission = await Permission.findById(id);
  if (!permission) throw generateErrorResponse(notFoundError);

  return Permission.findByIdAndDelete(id);
};

export default remove;
