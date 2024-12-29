// lib/partialUpdateEmployee.ts
import Employee from "@/models/Employee";
import { EmployeeSchemaType } from "@/schemas/employee";
import { IdSchemaType } from "@/schemas/shared/id";
import { generateErrorResponse, notFoundError } from "@/utils";

const partialUpdate = async (id: IdSchemaType, data: EmployeeSchemaType) => {
  const {
    address,
    city,
    country,
    date_of_birth,
    date_of_hire,
    employment_status,
    first_name,
    last_name,
    phone_number,
    position,
    salary,
    state,
    user,
    zip_code,
    certifications,
    department,
    job_title,
    manager,
    skills,
  } = data;
  const employee = await Employee.findById(id);

  if (!employee) generateErrorResponse(notFoundError);

  employee?.set({
    address,
    city,
    country,
    date_of_birth,
    date_of_hire,
    employment_status,
    first_name,
    last_name,
    phone_number,
    position,
    salary,
    state,
    user,
    zip_code,
    certifications,
    department,
    job_title,
    manager,
    skills,
  });
  await employee?.save();

  return employee?.toObject();
};

export default partialUpdate;
