import { userService } from "@/lib";
import { userSchema, UserSchemaType } from "@/schemas";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);
    const data = validateSchemas(req.body, userSchema) as UserSchemaType;

    const { user, statusCode } = await userService.upsert(id, data);

    res.status(statusCode).json({
      status: "success",
      statusCode,
      message:
        statusCode === 201
          ? "User created successfully."
          : "User updated successfully.",
      data: user,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default upsert;
