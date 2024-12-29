import { employeeService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import {
  employeeQuerySchema,
  EmployeeQueryType,
} from "@/schemas/employee/get-all-queries";
import { NextFunction, Request, Response } from "express";

const getAll = async (
  req: Request<{}, {}, {}, EmployeeQueryType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { populate, page, limit, sort_by, sort_type, search } = req.query;

    const { employees, pagination } = await employeeService.getAll({
      populate,
      page,
      limit,
      sort_by,
      sort_type,
      search,
    });

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

export default requestMiddleware(getAll, {
  validation: { query: employeeQuerySchema },
});
