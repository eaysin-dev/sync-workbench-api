import { rolePermissionsService } from "@/lib";
import { rolePermissionSchema } from "@/schemas/role-permission";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);
    const data = validateSchemas(req.body, rolePermissionSchema);

    const { rolePermission, statusCode } = await rolePermissionsService.upsert(
      id,
      data
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

export default upsert;
