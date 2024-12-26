import { Role } from "@/models/Role";
import { GetAllQuerySchemaType } from "@/schemas/shared/get-all-queries";
import {
  preparePagination,
  prepareSearchQuery,
  prepareSortOptions,
} from "@/utils/queries";

const getAll = async (data: GetAllQuerySchemaType) => {
  const { limit, page, sort_by, sort_type, search } = data;

  const sortOptions = prepareSortOptions(sort_by, sort_type);

  const searchFields = ["name", "description"];
  const searchQuery = prepareSearchQuery(search, searchFields);

  const total = await Role.countDocuments(searchQuery);
  const { skip, pagination } = preparePagination({ limit, page, total });

  const roles = await Role.find(searchQuery)
    .skip(skip)
    .limit(limit || 10)
    .sort(sortOptions);

  return { roles, pagination };
};

export default getAll;
