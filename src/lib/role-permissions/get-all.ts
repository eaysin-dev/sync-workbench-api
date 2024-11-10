import { RolePermission } from "@/model/RolePermission";
import { generateErrorResponse, resourceNotFoundError } from "@/utils";
import {
  preparePagination,
  prepareSearchQuery,
  prepareSortOptions,
} from "@/utils/queries";
import { RolePermissionQuerySchemaType } from "./../../schemas/role-permission/index";

const allowedExpendFields = ["role", "permission"];

const getAll = async (data: RolePermissionQuerySchemaType) => {
  const { limit, page, sortBy, sortType, expend, search } = data;

  const invalidExpendFields = expend?.filter(
    (field: string) => !allowedExpendFields.includes(field)
  );

  if (invalidExpendFields?.length > 0)
    throw generateErrorResponse(
      resourceNotFoundError(
        invalidExpendFields.join(", "),
        allowedExpendFields.join(", ")
      )
    );

  const sortOptions = prepareSortOptions(sortBy, sortType);

  const searchFields = ["role", "permission"];
  const searchQuery = prepareSearchQuery(search, searchFields);

  const total = await RolePermission.countDocuments(searchQuery);
  const { skip, pagination } = preparePagination({ limit, page, total });

  const expendFields = Array.isArray(expend) ? expend : [];

  const rolePermissions = await RolePermission.find(searchQuery)
    .skip(skip)
    .limit(limit || 10)
    .sort(sortOptions)
    .populate(expendFields);

  return { rolePermissions, pagination };
};

export default getAll;
