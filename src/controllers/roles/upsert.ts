import { rolesService } from "@/lib";
import { roleSchema } from "@/schemas/role";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);
    const data = validateSchemas(req.body, roleSchema);

    const { role, statusCode } = await rolesService.upsert(id, data);

    res.status(statusCode).json({
      status: "success",
      statusCode,
      message:
        statusCode === 201
          ? "role created successfully."
          : "role updated successfully.",
      data: role,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default upsert;
