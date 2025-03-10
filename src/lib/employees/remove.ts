import Employee from "@/models/Employee";
import { generateErrorResponse, notFoundError } from "@/utils";
import { ObjectId } from "mongoose";
import { IdSchemaType } from "./../../schemas/shared/id";
import { internalServerError } from "./../../utils/errors";

const remove = async (id: IdSchemaType) => {
  const employee = await Employee.findById(id);
  if (!employee) throw generateErrorResponse(notFoundError);

  return Employee.findByIdAndDelete(id);
};

const removeEmployeeByUserId = async (userId: ObjectId) => {
  try {
    const result = await Employee.deleteOne({ user: userId });
    if (result.deletedCount === 0)
      throw generateErrorResponse({
        ...notFoundError,
        message: `Employee for user ${userId} not found`,
      });
  } catch (error) {
    console.error(`Error deleting employee for user ${userId}:`, error);
    throw generateErrorResponse({
      ...internalServerError,
      message: `Failed to delete employee for user ${userId}`,
    });
  }
};

export { remove, removeEmployeeByUserId };
