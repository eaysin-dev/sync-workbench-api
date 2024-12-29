import { permissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { PermissionSchemaType } from "@/schemas/permission";
import { ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const upsert = async (
  req: Request<ParamsIdSchemaType, {}, PermissionSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { action, resource, description } = req.body;

    const { permission, statusCode } = await permissionsService.upsert(id, {
      action,
      resource,
      description,
    });

    res.status(statusCode).json({
      status: "success",
      statusCode,
      message:
        statusCode === 201
          ? "Permission created successfully."
          : "Permission updated successfully.",
      data: permission,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(upsert, { validation: {} });
