import Employee from "@/model/Employee";
import {
  employeeIdWithExpendSchema,
  EmployeeIdWithExpendSchemaType,
} from "@/schemas/employee/employee-queries";

import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const getById = async (data: EmployeeIdWithExpendSchemaType) => {
  const validateData = validateSchemas(data, employeeIdWithExpendSchema);
  const { id, expend } = validateData;

  const expendFields = Array.isArray(expend)
    ? expend.filter((field) => field !== undefined)
    : [];

  const employee = await Employee.findById(id).populate(expendFields);

  if (!employee) throw generateErrorResponse(notFoundError());

  return { employee: employee.toObject() };
};

export default getById;
