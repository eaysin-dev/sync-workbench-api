import { permissionsService } from "@/lib";
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

    const { permission } = await permissionsService.getById(id);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Permission details retrieved successfully.",
      links: { self: req.originalUrl },
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(getById, {
  validation: { params: paramsIdSchema },
});
