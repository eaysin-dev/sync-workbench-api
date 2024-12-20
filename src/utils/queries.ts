import { PaginationSchemaType } from "@/schemas/shared/pagination";
import { FilterQuery } from "mongoose";

const preparePagination = ({
  page = 1,
  limit = 10,
  total,
}: {
  page?: number;
  limit?: number;
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

export const prepareSortOptions = (
  sort_by: string,
  sort_type: string = "asc"
) => {
  const sortOrder = sort_type === "asc" ? 1 : -1;
  return { [sort_by]: sortOrder } as { [key: string]: 1 | -1 };
};

export { preparePagination, prepareSearchQuery };
