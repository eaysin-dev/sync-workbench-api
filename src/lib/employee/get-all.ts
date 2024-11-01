import Employee from "@/model/Employee";
import { EmployeeQueryType } from "@/schemas/employee/employee-queries";
import {
  preparePagination,
  prepareSearchQuery,
  prepareSortOptions,
} from "@/utils/queries";

const getAll = async (data: EmployeeQueryType) => {
  const { limit, page, sortBy, sortType, expend, search } = data;

  const sortOptions = prepareSortOptions(sortBy, sortType);

  const searchFields = ["first_name", "last_name"];
  const searchQuery = prepareSearchQuery(search, searchFields);

  const total = await Employee.countDocuments(searchQuery);
  const { skip, pagination } = preparePagination({ limit, page, total });

  const expendFields = Array.isArray(expend) ? expend : [];

  const employees = await Employee.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .sort(sortOptions)
    .populate(expendFields);

  return { employees, pagination };
};

export default getAll;
