import Employee from "@/models/Employee";
import { employeeSchema, EmployeeSchemaType } from "@/schemas";
import { idSchema, IdSchemaType } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";

const upsert = async (identity: IdSchemaType, data: EmployeeSchemaType) => {
  const id = validateSchemas(identity, idSchema);
  const employeeData = validateSchemas(data, employeeSchema);

  let employee = await Employee.findById(id);

  if (!employee) {
    employee = new Employee(employeeData);
    await employee.save();
    return { employee: employee.toObject(), statusCode: 201 };
  }

  employee.overwrite(employeeData);
  await employee.save();

  return { employee: employee.toObject(), statusCode: 200 };
};

export default upsert;
