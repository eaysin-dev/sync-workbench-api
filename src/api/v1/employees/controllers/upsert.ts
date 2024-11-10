import { employeeService } from "@/lib";
import { employeeSchema } from "@/schemas";
import { EmployeeQueryType } from "@/schemas/employee/get-all-queries";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);
    const data = validateSchemas(req.body, employeeSchema) as EmployeeQueryType;

    const { employee, statusCode } = await employeeService.upsert(id, data);

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

export default upsert;
