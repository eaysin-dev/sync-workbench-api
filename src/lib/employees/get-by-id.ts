import Employee from "@/models/Employee";
import { IdWithPopulateType } from "@/types/quert";
import { generateErrorResponse, notFoundError } from "@/utils";

const getById = async ({ id, populate }: IdWithPopulateType) => {
  const employeeQuery = Employee.findById(id);

  if (populate) employeeQuery.populate(populate);
  const employee = await employeeQuery;

  if (!employee) throw generateErrorResponse(notFoundError);

  return { employee: employee.toObject() };
};

export default getById;
