import defaultConfig from "@/config/default";
import { userService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { createPopulateSchema } from "@/schemas/shared/expend";
import { paramsIdSchema } from "@/schemas/shared/id";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const values = { id: req.params.id, populate: req.query.populate };
    const { id, populate } = values;

    const { user } = await userService.getById({ id, populate });

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "User details retrieved successfully.",
      links: { self: req.originalUrl },
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default requestMiddleware(getById, {
  validation: {
    params: paramsIdSchema,
    query: createPopulateSchema(
      defaultConfig.allowedUserPopulateFields
    ).optional(),
  },
});
