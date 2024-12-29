import defaultConfig from "@/config/default";
import { rolePermissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { RolePermissionPopulateSchemaType } from "@/schemas/role-permission";
import { createPopulateSchema } from "@/schemas/shared/expend";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const getById = async (
  req: Request<ParamsIdSchemaType, {}, {}, RolePermissionPopulateSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const values = { id: req.params.id, populate: req.query.populate };
    const { id, populate } = values;

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

export default requestMiddleware(getById, {
  validation: {
    params: paramsIdSchema,
    query: createPopulateSchema(
      defaultConfig.allowedRolePermissionPopulateFields
    ).optional(),
  },
});
