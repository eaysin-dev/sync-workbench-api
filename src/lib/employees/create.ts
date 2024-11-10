import Employee from "@/model/Employee";
import { employeeSchema, EmployeeSchemaType } from "@/schemas";
import { validateSchemas } from "@/utils";

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
  } = validateSchemas(data, employeeSchema);

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
