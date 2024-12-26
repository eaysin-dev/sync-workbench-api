import { permissionsService } from "@/lib";
import { permissionSchema } from "@/schemas/permission";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validateSchemas(req.body, permissionSchema);

    const permission = await permissionsService.create(data);

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

export default create;
