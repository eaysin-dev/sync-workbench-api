import { employeeService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { employeeSchema, EmployeeSchemaType } from "@/schemas";
import { NextFunction, Request, Response } from "express";

const create = async (
  req: Request<{}, {}, EmployeeSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
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
    } = req.body;

    const employee = await employeeService.create({
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

    const response = {
      status: "success",
      statusCode: 201,
      message: "Employee created successfully.",
      data: employee,
      links: req.path,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(create, {
  validation: { body: employeeSchema },
});
