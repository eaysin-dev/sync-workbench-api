import { rolePermissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { rolePermissionExpendEnum } from "@/schemas/role-permission";
import { createPopulateSchema } from "@/schemas/shared/expend";
import { paramsIdSchema } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
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
    query: createPopulateSchema(rolePermissionExpendEnum).optional(),
  },
});
