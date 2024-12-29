import { rolesService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { roleSchema, RoleSchemaType } from "@/schemas/role";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const partialUpdate = async (
  req: Request<ParamsIdSchemaType, {}, RoleSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const role = await rolesService.partialUpdate(id, { name, description });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Role updated successfully.",
      data: role,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(partialUpdate, {
  validation: { params: paramsIdSchema, body: roleSchema },
});
