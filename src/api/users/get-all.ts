import { userService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import {
  usersGetAllQuerySchema,
  UsersGetAllQuerySchemaType,
} from "@/schemas/user";
import { NextFunction, Request, Response } from "express";

const getAll = async (
  req: Request<{}, {}, {}, UsersGetAllQuerySchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sort_by, sort_type, search, role, populate } =
      req.query;

    const { users, pagination } = await userService.getAll({
      page,
      limit,
      sort_by,
      sort_type,
      search,
      role,
      populate,
    });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Successfully retrieved users.",
      data: users,
      pagination,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(getAll, {
  validation: { query: usersGetAllQuerySchema },
});
