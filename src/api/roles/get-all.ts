import { rolesService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import {
  getAllQuerySchema,
  GetAllQuerySchemaType,
} from "@/schemas/shared/get-all-queries";
import { NextFunction, Request, Response } from "express";

const getAll = async (
  req: Request<{}, {}, {}, GetAllQuerySchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sort_by, limit, page, search, sort_type } = req.query;

    const { roles, pagination } = await rolesService.getAll({
      sort_by,
      limit,
      page,
      search,
      sort_type,
    });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Successfully retrieved roles.",
      data: roles,
      pagination,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(getAll, {
  validation: { query: getAllQuerySchema },
});
