import { employeeService } from "@/lib";
import { employeeGetByIdSchema } from "@/schemas/employee/get-by-id-queries";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const values = { id: req.params.id, expand: req.query.expand };
    const validateData = validateSchemas(values, employeeGetByIdSchema);
    const { id, expand } = validateData;

    const { employee } = await employeeService.getById({ id, expand });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Employee details retrieved successfully.",
      links: { self: req.originalUrl },
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

export default getById;
