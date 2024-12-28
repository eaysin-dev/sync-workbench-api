import { userService } from "@/lib";
import { usersGetAllQuerySchema } from "@/schemas";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, sort_by, sort_type, search, role } = validateSchemas(
      req.query,
      usersGetAllQuerySchema
    );

    const { users, pagination } = await userService.getAll({
      page,
      limit,
      sort_by,
      sort_type,
      search,
      role,
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

export default getAll;
