import { permissionsService } from "@/lib";
import {
  getAllQuerySchema,
  GetAllQuerySchemaType,
} from "@/schemas/shared/get-all-queries";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queries = validateSchemas(
      req.query,
      getAllQuerySchema
    ) as GetAllQuerySchemaType;

    const { permissions, pagination } = await permissionsService.getAll(
      queries
    );

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Successfully retrieved permissions.",
      data: permissions,
      pagination,
      links: { self: req.originalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default getAll;
