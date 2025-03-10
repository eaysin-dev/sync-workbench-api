import { permissionsService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { paramsIdSchema, ParamsIdSchemaType } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const remove = async (
  req: Request<ParamsIdSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await permissionsService.remove(id);

    res.status(204).json({
      status: "success",
      statusCode: 204,
      message: "Permission deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(remove, {
  validation: { params: paramsIdSchema },
});
