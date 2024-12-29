import { rolePermissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import {
  rolePermissionSchema,
  RolePermissionSchemaType,
} from "@/schemas/role-permission";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const partialUpdate = async (
  req: Request<ParamsIdSchemaType, {}, RolePermissionSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { permission, role } = req.body;

    const rolePermission = await rolePermissionsService.partialUpdate(id, {
      permission,
      role,
    });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Role Permission updated successfully.",
      data: rolePermission,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(partialUpdate, {
  validation: { params: paramsIdSchema, body: rolePermissionSchema },
});
