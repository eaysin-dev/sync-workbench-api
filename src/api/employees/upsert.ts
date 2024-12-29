import { employeeService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { employeeSchema, EmployeeSchemaType } from "@/schemas";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const upsert = async (
  req: Request<ParamsIdSchemaType, {}, EmployeeSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
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

    const { employee, statusCode } = await employeeService.upsert(id, {
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

    res.status(statusCode).json({
      status: "success",
      statusCode,
      message:
        statusCode === 201
          ? "Employee created successfully."
          : "Employee updated successfully.",
      data: employee,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(upsert, {
  validation: { params: paramsIdSchema, body: employeeSchema },
});
