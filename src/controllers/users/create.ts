import { userService } from "@/lib";
import { userSchema, UserSchemaType } from "@/schemas";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validateSchemas(req.body, userSchema) as UserSchemaType;

    const user = await userService.createUser(data);

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

export default create;
