import Employee from "@/models/Employee";
import { employeePartialSchema, EmployeePartialSchemaType } from "@/schemas";
import { conflictError, generateErrorResponse, validateSchemas } from "@/utils";
import mongoose from "mongoose";

const create = async (data: EmployeePartialSchemaType) => {
  const {
    user,
    first_name,
    last_name,
    address,
    city,
    country,
    date_of_birth,
    date_of_hire,
    employment_status,
    phone_number,
    position,
    salary,
    state,
    zip_code,
    certifications,
    department,
    job_title,
    manager,
    skills,
  } = validateSchemas(data, employeePartialSchema);

  if (!user) {
    throw generateErrorResponse({
      message: "User ID is required",
      statusCode: 400,
      code: "USER_MISSING",
    });
  }

  const existingEmployee = await Employee.findOne({ user: user });
  if (existingEmployee)
    throw generateErrorResponse(conflictError("employee", user));

  const employee = new Employee({
    user: new mongoose.Types.ObjectId(user),
    first_name,
    last_name,
    address,
    city,
    country,
    date_of_birth,
    date_of_hire,
    employment_status,
    phone_number,
    position,
    salary,
    state,
    zip_code,
    certifications,
    department,
    job_title,
    manager,
    skills,
  });

  await employee.save();
  return employee;
};

const createEmptyEmployeeForUser = async (userId: string) => {
  const existingEmployee = await Employee.findOne({ user: userId });
  if (existingEmployee)
    throw generateErrorResponse(conflictError("employee", userId));

  const employeeData: EmployeePartialSchemaType = {
    user: userId,
  };

  const employee = await create(employeeData);
  return { employee };
};

export { create, createEmptyEmployeeForUser };
