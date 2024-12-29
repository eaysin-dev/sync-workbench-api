import { rolesService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const getById = async (
  req: Request<ParamsIdSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const { role } = await rolesService.getById(id);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Role details retrieved successfully.",
      data: role,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(getById, {
  validation: { query: paramsIdSchema },
});
