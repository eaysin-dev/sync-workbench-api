import Employee from "@/model/Employee";
import { generateErrorResponse, notFoundError, validateSchemas } from "@/utils";
import { idSchema, IdSchemaType } from "./../../schemas/shared/id";

const remove = async (identity: IdSchemaType) => {
  const id = validateSchemas(identity, idSchema);

  const employee = await Employee.findById(id);
  if (!employee) throw generateErrorResponse(notFoundError);

  // TODO:
  // Asynchronously Delete all associated comments
  // Comment.deleteMany({article: id})

  return Employee.findByIdAndDelete(id);
};

export default remove;
