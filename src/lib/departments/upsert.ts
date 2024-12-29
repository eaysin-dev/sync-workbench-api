import Employee from "@/models/Employee";
import { EmployeeSchemaType } from "@/schemas/employee";
import { IdSchemaType } from "@/schemas/shared/id";

const upsert = async (id: IdSchemaType, payload: EmployeeSchemaType) => {
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
  } = payload;

  const data = {
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
  };

  let employee = await Employee.findById(id);

  if (!employee) {
    employee = new Employee({ ...data });
    await employee.save();
    return { employee: employee.toObject(), statusCode: 201 };
  }

  employee.overwrite(data);
  await employee.save();

  return { employee: employee.toObject(), statusCode: 200 };
};

export default upsert;
