// utils/employeeUtils.ts

import Employee from "@/models/Employee";
import { IdWithPopulateType } from "@/types/quert";
import { generateErrorResponse, notFoundError } from "@/utils";

const getByUserId = async ({ id, populate }: IdWithPopulateType) => {
  const query = Employee.findOne({ user: id });

  if (populate) query.populate(populate);
  const employee = await query;

  if (!employee) {
    throw generateErrorResponse({
      ...notFoundError,
      message: `Employee not found for user with ID ${id}`,
    });
  }

  return { employee: employee.toObject() };
};

export default getByUserId;
