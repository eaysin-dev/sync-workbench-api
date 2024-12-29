import { RolePermission } from "@/models/RolePermission";
import { generateErrorResponse, notFoundError } from "@/utils";
import { IdSchemaType } from "./../../schemas/shared/id";

const remove = async (id: IdSchemaType) => {
  const rolePermission = await RolePermission.findById(id);
  if (!rolePermission) throw generateErrorResponse(notFoundError);

  return RolePermission.findByIdAndDelete(id);
};

export default remove;
