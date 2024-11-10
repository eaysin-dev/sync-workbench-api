import { rolesService } from "@/lib";
import { roleSchema } from "@/schemas/role";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validateSchemas(req.body, roleSchema);

    const role = await rolesService.create(data);

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

export default create;
