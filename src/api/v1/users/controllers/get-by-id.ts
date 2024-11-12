import { userService } from "@/lib";
import { userGetByIdSchema } from "@/schemas";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const values = { id: req.params.id, populate: req.query.populate };
    const validateData = validateSchemas(values, userGetByIdSchema);
    const { id, populate } = validateData;

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

export default getById;
