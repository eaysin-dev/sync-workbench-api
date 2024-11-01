import { employeeService } from "@/lib";
import {
  employeeQuerySchema,
  EmployeeQueryType,
} from "@/schemas/employee/employee-queries";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queries = validateSchemas(
      req.query,
      employeeQuerySchema
    ) as EmployeeQueryType;

    const { employees, pagination } = await employeeService.getAll(queries);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Successfully retrieved employees.",
      data: employees,
      pagination,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default getAll;
