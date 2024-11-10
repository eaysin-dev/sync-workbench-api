// lib/partialUpdateEmployee.ts
import Employee from "@/model/Employee";
import { employeeSchema, EmployeeSchemaType } from "@/schemas";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";

const partialUpdate = async (
  identity: IdSchemaType,
  data: EmployeeSchemaType
) => {
  const id = validateSchemas(identity, idSchema);
  const employeeData = validateSchemas(data, employeeSchema);
  const employee = await Employee.findById(id);

  if (!employee) generateErrorResponse(notFoundError);

  employee?.set(employeeData);
  await employee?.save();

  return employee?.toObject();
};

export default partialUpdate;
