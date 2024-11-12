import { UserSchemaType } from "@/schemas";
import { createUserWithEmployee } from "./utils";

const create = async (data: UserSchemaType) => {
  const { email, password, role, status, username } = data;

  const { employee, user } = await createUserWithEmployee({
    email,
    password,
    role,
    status,
    username,
  });

  const userObject = user.toObject() as Omit<typeof user, "password"> & {
    password?: string;
  };
  delete userObject.password;

  return { user: userObject, employee };
};

export default create;
