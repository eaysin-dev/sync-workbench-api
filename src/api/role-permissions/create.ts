import { rolePermissionsService } from "@/lib";
import { rolePermissionSchema } from "@/schemas/role-permission";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validateSchemas(req.body, rolePermissionSchema);

    const rolePermission = await rolePermissionsService.create(data);

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

export default create;
