import { rolePermissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import {
  rolePermissionSchema,
  RolePermissionSchemaType,
} from "@/schemas/role-permission";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const upsert = async (
  req: Request<ParamsIdSchemaType, {}, RolePermissionSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { permission, role } = req.body;

    const { rolePermission, statusCode } = await rolePermissionsService.upsert(
      id,
      { permission, role }
    );

    res.status(statusCode).json({
      status: "success",
      statusCode,
      message:
        statusCode === 201
          ? "Role Permission created successfully."
          : "Role Permission updated successfully.",
      data: rolePermission,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(upsert, {
  validation: { params: paramsIdSchema, body: rolePermissionSchema },
});
