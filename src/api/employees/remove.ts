import { employeeService } from "@/lib";
import { idSchema } from "@/schemas/shared/id";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateSchemas(req.params.id, idSchema);

    await employeeService.remove(id);

    res.status(204).json({
      status: "success",
      statusCode: 204,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default remove;
