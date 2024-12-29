import { userService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { updateUserSchema, UpdateUserSchemaType } from "@/schemas";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const partialUpdate = async (
  req: Request<ParamsIdSchemaType, {}, UpdateUserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { email, role, status, username } = req.body;

    const user = await userService.partialUpdate(id, {
      email,
      role,
      status,
      username,
    });

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

export default requestMiddleware(partialUpdate, {
  validation: { params: paramsIdSchema, body: updateUserSchema },
});
