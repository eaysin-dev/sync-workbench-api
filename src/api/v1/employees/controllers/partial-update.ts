import { employeeService } from "@/lib";
import { employeeSchema } from "@/schemas";
import { EmployeeQueryType } from "@/schemas/employee/get-all-queries";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const partialUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);
    const data = validateSchemas(req.body, employeeSchema) as EmployeeQueryType;

    const employee = await employeeService.partialUpdate(id, data);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Employee updated successfully.",
      data: employee,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    console.log("error=>>", error);

    next(error);
  }
};

export default partialUpdate;
