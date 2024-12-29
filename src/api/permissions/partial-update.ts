import { permissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { permissionSchema, PermissionSchemaType } from "@/schemas/permission";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const partialUpdate = async (
  req: Request<ParamsIdSchemaType, {}, PermissionSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { action, resource, description } = req.body;

    const permission = await permissionsService.partialUpdate(id, {
      action,
      resource,
      description,
    });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Permission updated successfully.",
      data: permission,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(partialUpdate, {
  validation: { params: paramsIdSchema, body: permissionSchema },
});
