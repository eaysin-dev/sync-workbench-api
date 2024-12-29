import defaultConfig from "@/config/default";
import { employeeService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { createPopulateSchema } from "@/schemas/shared/expend";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { parsePopulate } from "@/utils/parse-populate";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const employeePopulateSchema = createPopulateSchema(
  defaultConfig.employeeExpendEnum
).optional();

export type EmployeePopulateSchemaType = z.infer<typeof employeePopulateSchema>;

const getById = async (
  req: Request<ParamsIdSchemaType, {}, {}, { populate: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const populateInput = req.query.populate as string | undefined;
    const populate = parsePopulate(populateInput);

    const { employee } = await employeeService.getById({ id, populate });

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

export default requestMiddleware(getById, {
  validation: {
    body: paramsIdSchema,
    query: employeePopulateSchema,
  },
});
