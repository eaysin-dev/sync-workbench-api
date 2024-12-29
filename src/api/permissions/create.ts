import { permissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { permissionSchema, PermissionSchemaType } from "@/schemas/permission";
import { NextFunction, Request, Response } from "express";

const create = async (
  req: Request<{}, {}, PermissionSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { action, resource, description } = req.body;

    const permission = await permissionsService.create({
      action,
      resource,
      description,
    });

    const response = {
      status: "success",
      statusCode: 201,
      message: "Permission created successfully.",
      data: permission,
      links: req.path,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(create, {
  validation: { body: permissionSchema },
});
