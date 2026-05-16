import type { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const body = req.body
  try {
    const result = await authServices.loginUserIntoDB(body)
        res.status(201).json({
      message: "User Created Successfully",
      data: result,
      error: false,
    });
  } catch (error:any) {
    res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

export const authController = {
  loginUser,
};
