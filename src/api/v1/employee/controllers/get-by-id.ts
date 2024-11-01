import { employeeService } from "@/lib";
import {
  employeeIdWithExpendSchema,
  EmployeeIdWithExpendSchemaType,
} from "@/schemas/employee/employee-queries";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queries = validateSchemas(
      req.query,
      employeeIdWithExpendSchema
    ) as EmployeeIdWithExpendSchemaType;
    const { id, expend } = queries;
    console.log({ queries });

    const { employee } = await employeeService.getById({ id, expend });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Employee details retrieved successfully.",
      links: { self: req.originalUrl },
      data: employee,
    });
  } catch (error) {
    next();
  }
};

export default getById;
