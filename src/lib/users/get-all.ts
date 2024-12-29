import User from "@/models/User";
import { UsersGetAllQuerySchemaType } from "@/schemas/user";
import {
  preparePagination,
  prepareSearchQuery,
  prepareSortOptions,
} from "@/utils/queries";
import { resolveRoleId } from "../roles/resolve-role-id";

const getAll = async (data: UsersGetAllQuerySchemaType) => {
  const { limit, page, sort_by, sort_type, search, populate, role } = data;

  const sortOptions = prepareSortOptions(sort_by, sort_type);

  const searchFields = ["username", "email"];
  let searchQuery = prepareSearchQuery(search, searchFields);

  if (role) {
    const roleId = await resolveRoleId(role);
    if (roleId) searchQuery = { ...searchQuery, role: roleId };
  }

  const total = await User.countDocuments(searchQuery);
  const { skip, pagination } = preparePagination({ limit, page, total });

  const users = await User.find(searchQuery)
    .select("-password")
    .skip(skip)
    .limit(limit || 10)
    .sort(sortOptions)
    .populate(populate);

  return { users, pagination };
};

export default getAll;
