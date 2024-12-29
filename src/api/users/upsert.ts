import { userService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { userSchema, UserSchemaType } from "@/schemas";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const upsert = async (
  req: Request<ParamsIdSchemaType, {}, UserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { email, password, role, status, username } = req.body;

    const { user, statusCode } = await userService.upsert(id, {
      email,
      password,
      role,
      status,
      username,
    });

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

export default requestMiddleware(upsert, {
  validation: { params: paramsIdSchema, body: userSchema },
});
