// utils/employeeUtils.ts

import Employee from "@/model/Employee";
import {
  employeeGetByIdSchema,
  EmployeeGetByIdSchemaType,
} from "@/schemas/employee/get-by-id-queries";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";
import { log } from "console";

const getByUserId = async (data: EmployeeGetByIdSchemaType) => {
  const { id, populate } = validateSchemas(data, employeeGetByIdSchema);

  try {
    const employee = await Employee.findOne({ user: id });
    log(employee);
    if (!employee)
      throw generateErrorResponse({
        ...notFoundError,
        message: `Employee not found for user with ID ${id}`,
      });

    return { employee };
  } catch (error) {
    console.error(`Error fetching employee for user ${id}:`, error);
    throw generateErrorResponse({
      ...notFoundError,
      message: `Failed to fetch employee for user ${id}`,
    });
  }
};

export default getByUserId;
