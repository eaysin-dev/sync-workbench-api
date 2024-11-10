import { employeeService } from "@/lib";
import { employeeSchema, EmployeeSchemaType } from "@/schemas";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validateSchemas(
      req.body,
      employeeSchema
    ) as EmployeeSchemaType;

    const employee = await employeeService.create(data);

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

export default create;
