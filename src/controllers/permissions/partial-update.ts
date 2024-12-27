import { permissionsService } from "@/lib";
import { permissionSchema } from "@/schemas/permission";
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
    const data = validateSchemas(req.body, permissionSchema);

    const permission = await permissionsService.partialUpdate(id, data);

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

export default partialUpdate;
