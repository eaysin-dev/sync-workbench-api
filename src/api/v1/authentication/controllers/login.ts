import { authenticateService } from "@/lib";
import { loginSchema } from "@/schemas/auth";
import { validateSchemas } from "@/utils";
import { NextFunction, Request, Response } from "express";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = validateSchemas(req.body, loginSchema);
    const { username, password } = data;

    const { accessToken, refreshToken } = await authenticateService.login({
      username,
      password,
    });

    const response = {
      status: "success",
      statusCode: 200,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default login;
