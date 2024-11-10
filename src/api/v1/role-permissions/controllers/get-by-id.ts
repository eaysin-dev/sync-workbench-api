import { rolePermissionsService } from "@/lib";
import { rolePermissionGetByIdSchema } from "@/schemas/role-permission";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const values = { id: req.params.id, expand: req.query.expand };
    const validateData = validateSchemas(values, rolePermissionGetByIdSchema);
    const { id, expand } = validateData;

    const { rolePermission } = await rolePermissionsService.getById({
      id,
      expand,
    });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Role Permission details retrieved successfully.",
      links: { self: req.originalUrl },
      data: rolePermission,
    });
  } catch (error) {
    next(error);
  }
};

export default getById;
