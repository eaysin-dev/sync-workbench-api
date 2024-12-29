import { rolePermissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import {
  rolePermissionQuerySchema,
  RolePermissionQuerySchemaType,
} from "@/schemas/role-permission";
import { NextFunction, Request, Response } from "express";

const getAll = async (
  req: Request<{}, {}, {}, RolePermissionQuerySchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sort_by, limit, page, search, sort_type, populate } = req.query;

    const { rolePermissions, pagination } = await rolePermissionsService.getAll(
      { sort_by, limit, page, search, sort_type, populate }
    );

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Successfully retrieved Role Permissions.",
      data: rolePermissions,
      pagination,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(getAll, {
  validation: { query: rolePermissionQuerySchema },
});
