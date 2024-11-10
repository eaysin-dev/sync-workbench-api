import { rolesService } from "@/lib";
import { roleSchema } from "@/schemas/role";
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
    const data = validateSchemas(req.body, roleSchema);

    const role = await rolesService.partialUpdate(id, data);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Role updated successfully.",
      data: role,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default partialUpdate;
