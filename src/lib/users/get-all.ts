import User from "@/model/User";
import { usersGetAllQuerySchema, UsersGetAllQuerySchemaType } from "@/schemas";
import { validateSchemas } from "@/utils";
import {
  preparePagination,
  prepareSearchQuery,
  prepareSortOptions,
} from "@/utils/queries";

const getAll = async (data: UsersGetAllQuerySchemaType) => {
  const { limit, page, sortBy, sortType, search, populate } = validateSchemas(
    data,
    usersGetAllQuerySchema
  );

  const sortOptions = prepareSortOptions(sortBy, sortType);

  const searchFields = ["username", "email"];
  const searchQuery = prepareSearchQuery(search, searchFields);

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
