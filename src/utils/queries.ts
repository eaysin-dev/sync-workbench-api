import { PaginationSchemaType } from "@/schemas/shared/pagination";
import { FilterQuery } from "mongoose";

const preparePagination = ({
  page,
  limit,
  total,
}: {
  page: number;
  limit: number;
  total: number;
}): { skip: number; pagination: PaginationSchemaType } => {
  const totalPage = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const pagination: PaginationSchemaType = {
    page,
    limit,
    total,
    totalPage,
  };

  if (page < totalPage) pagination.next = page + 1;
  if (page > 1) pagination.prev = page - 1;

  return { skip, pagination };
};

const prepareSearchQuery = (
  search: string | undefined,
  fields: string[]
): FilterQuery<any> => {
  if (!search) return {};

  const searchConditions = fields.map((field) => ({
    [field]: { $regex: search, $options: "i" },
  }));

  return { $or: searchConditions };
};

export const prepareSortOptions = (sortBy: string, sortType: string) => {
  const sortOrder = sortType === "asc" ? 1 : -1;
  return { [sortBy]: sortOrder } as { [key: string]: 1 | -1 };
};

export { preparePagination, prepareSearchQuery };
