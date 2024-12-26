import Employee from "@/models/Employee";
import { EmployeeSchemaType } from "@/schemas";

const create = async (data: EmployeeSchemaType) => {
  const {
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
  } = data;

  const employee = new Employee({
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
  return employee.toObject();
};

export default create;
