import Employee from "@/model/Employee";
import {
  employeeGetByIdSchema,
  EmployeeGetByIdSchemaType,
} from "@/schemas/employee/get-by-id-queries";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const getById = async (data: EmployeeGetByIdSchemaType) => {
  const payload = validateSchemas(data, employeeGetByIdSchema);

  const employee = await Employee.findById(payload.id).populate(payload.expend);

  if (!employee) throw generateErrorResponse(notFoundError);

  return { employee: employee.toObject() };
};

export default getById;
