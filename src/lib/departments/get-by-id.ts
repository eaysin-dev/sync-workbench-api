import Employee from "@/models/Employee";
import { IdWithPopulateType } from "@/types/quert";
import { generateErrorResponse, notFoundError } from "@/utils";

const getById = async ({ id, populate }: IdWithPopulateType) => {
  const query = Employee.findById(id);

  if (populate) query.populate(populate);
  const employee = await query;

  if (!employee) throw generateErrorResponse(notFoundError);

  return { employee: employee.toObject() };
};

export default getById;
