import { permissionsService } from "@/lib";
import { permissionSchema } from "@/schemas/permission";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);
    const data = validateSchemas(req.body, permissionSchema);

    const { permission, statusCode } = await permissionsService.upsert(
      id,
      data
    );

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

export default upsert;
