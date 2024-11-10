import { rolePermissionsService } from "@/lib";
import { rolePermissionSchema } from "@/schemas/role-permission";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const partialUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);
    const data = validateSchemas(req.body, rolePermissionSchema);

    const rolePermission = await rolePermissionsService.partialUpdate(id, data);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Role Permission updated successfully.",
      data: rolePermission,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    console.log("error=>>", error);

    next(error);
  }
};

export default partialUpdate;
