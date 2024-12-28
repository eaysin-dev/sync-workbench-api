import { rolePermissionsService } from "@/lib";
import { rolePermissionGetByIdSchema } from "@/schemas/role-permission";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const values = { id: req.params.id, populate: req.query.populate };
    const validateData = validateSchemas(values, rolePermissionGetByIdSchema);
    const { id, populate } = validateData;

    const { rolePermission } = await rolePermissionsService.getById({
      id,
      populate,
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
