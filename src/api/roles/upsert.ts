import { rolesService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { roleSchema, RoleSchemaType } from "@/schemas/role";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const upsert = async (
  req: Request<ParamsIdSchemaType, {}, RoleSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const { role, statusCode } = await rolesService.upsert(id, {
      name,
      description,
    });

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

export default requestMiddleware(upsert, {
  validation: { params: paramsIdSchema, body: roleSchema },
});
