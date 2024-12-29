import { RolePermission } from "@/models/RolePermission";
import { IdWithPopulateType } from "@/types/quert";
import { generateErrorResponse, notFoundError } from "@/utils";

const getById = async ({ id, populate }: IdWithPopulateType) => {
  const query = RolePermission.findById(id);
  if (populate) query.populate(populate);

  const rolePermission = await query;
  if (!rolePermission) throw generateErrorResponse(notFoundError);

  return { rolePermission: rolePermission.toObject() };
};

export default getById;
