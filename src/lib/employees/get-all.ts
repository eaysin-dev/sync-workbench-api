import Employee from "@/models/Employee";
import { EmployeeQueryType } from "@/schemas/employee/get-all-queries";
import {
  preparePagination,
  prepareSearchQuery,
  prepareSortOptions,
} from "@/utils/queries";

const getAll = async (data: EmployeeQueryType) => {
  const { limit, page, sort_by, sort_type, expend, search } = data;

  const sortOptions = prepareSortOptions(sort_by, sort_type);

  const searchFields = ["first_name", "last_name"];
  const searchQuery = prepareSearchQuery(search, searchFields);

  const total = await Employee.countDocuments(searchQuery);
  const { skip, pagination } = preparePagination({ limit, page, total });

  const expendFields = Array.isArray(expend) ? expend : [];

  const employees = await Employee.find(searchQuery)
    .skip(skip)
    .limit(limit || 10)
    .sort(sortOptions)
    .populate(expendFields);

  return { employees, pagination };
};

export default getAll;
