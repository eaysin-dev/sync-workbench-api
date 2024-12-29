import { rolePermissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import {
  rolePermissionSchema,
  RolePermissionSchemaType,
} from "@/schemas/role-permission";
import { NextFunction, Request, Response } from "express";

const create = async (
  req: Request<{}, {}, RolePermissionSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { permission, role } = req.body;

    const rolePermission = await rolePermissionsService.create({
      permission,
      role,
    });

    const response = {
      status: "success",
      statusCode: 201,
      message: "Role Permission created successfully.",
      data: rolePermission,
      links: req.path,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(create, {
  validation: { body: rolePermissionSchema },
});
