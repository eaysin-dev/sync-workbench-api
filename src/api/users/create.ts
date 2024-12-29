import { userService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { userSchema, UserSchemaType } from "@/schemas";
import { NextFunction, Request, Response } from "express";

const create = async (
  req: Request<{}, {}, UserSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role, status, username } = req.body;

    const user = await userService.createUser({
      email,
      password,
      role,
      status,
      username,
    });

    const response = {
      status: "success",
      statusCode: 201,
      message: "User created successfully.",
      data: user,
      links: req.path,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(create, { validation: { body: userSchema } });
