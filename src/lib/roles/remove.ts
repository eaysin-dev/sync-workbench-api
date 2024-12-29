import { Role } from "@/models/Role";
import { generateErrorResponse, notFoundError } from "@/utils";
import { IdSchemaType } from "../../schemas/shared/id";

const remove = async (id: IdSchemaType) => {
  const role = await Role.findById(id);
  if (!role) throw generateErrorResponse(notFoundError);

  return Role.findByIdAndDelete(id);
};

export default remove;
