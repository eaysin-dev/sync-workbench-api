import Employee from "@/models/Employee";
import { generateErrorResponse, notFoundError } from "@/utils";
import { IdSchemaType } from "./../../schemas/shared/id";

const remove = async (id: IdSchemaType) => {
  const employee = await Employee.findById(id);
  if (!employee) throw generateErrorResponse(notFoundError);

  // TODO:
  // Asynchronously Delete all associated comments
  // Comment.deleteMany({article: id})

  return Employee.findByIdAndDelete(id);
};

export default remove;
