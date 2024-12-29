import { rolesService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { roleSchema, RoleSchemaType } from "@/schemas/role";
import { NextFunction, Request, Response } from "express";

const create = async (
  req: Request<{}, {}, RoleSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;

    const role = await rolesService.create({ name, description });

    const response = {
      status: "success",
      statusCode: 201,
      message: "Role created successfully.",
      data: role,
      links: req.path,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(create, { validation: { body: roleSchema } });
