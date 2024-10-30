import { authService } from "@/lib";
import { UserData, UserSchema } from "@/schemas";
import { validateSchema } from "@/utils";
import { NextFunction, Request, Response } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validateSchema(UserSchema, req.body) as UserData;
    const { username, password, email, role, status } = data;

    const { accessToken, refreshToken } = await authService.register({
      email,
      password,
      role,
      status,
      username,
    });

    const response = {
      code: 200,
      message: "Login successful",
      data: { accessToken, refreshToken },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default register;
