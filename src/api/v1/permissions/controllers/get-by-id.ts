import { permissionsService } from "@/lib";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);

    const { permission } = await permissionsService.getById(id);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Permission details retrieved successfully.",
      links: { self: req.originalUrl },
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};

export default getById;
