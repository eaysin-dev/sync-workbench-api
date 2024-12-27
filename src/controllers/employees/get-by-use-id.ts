import { employeeService } from "@/lib";
import { employeeGetByIdSchema } from "@/schemas/employee/get-by-id-queries";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const values = { id: req.params.id, populate: req.query.populate };
    console.log(req.params);

    const validateData = validateSchemas(values, employeeGetByIdSchema);
    const { id, populate } = validateData;

    const { employee } = await employeeService.getByUserId({ id, populate });

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

export default getByUserId;
