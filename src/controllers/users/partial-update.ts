import { userService } from "@/lib";
import { updateUserSchema, UpdateUserSchemaType } from "@/schemas";
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
    const data = validateSchemas(
      req.body,
      updateUserSchema
    ) as UpdateUserSchemaType;

    const user = await userService.partialUpdate(id, data);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "User updated successfully.",
      data: user,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default partialUpdate;
