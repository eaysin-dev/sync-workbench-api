import { rolePermissionsService } from "@/lib";
import { rolePermissionQuerySchema } from "@/schemas/role-permission";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queries = validateSchemas(req.query, rolePermissionQuerySchema);

    const { rolePermissions, pagination } = await rolePermissionsService.getAll(
      queries
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

export default getAll;
