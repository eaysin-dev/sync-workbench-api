import { rolesService } from "@/lib";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);

    const { role } = await rolesService.getById(id);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Role details retrieved successfully.",
      data: role,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default getById;
