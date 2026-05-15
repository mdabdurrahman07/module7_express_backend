import type { Request, Response } from "express";
import { pool } from "../../db/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  //   console.log("this is body", req.body);
  const body = req.body;
  try {
    const result = await userServices.createUserIntoDB(body);
    //   console.log(result);
    res.status(201).json({
      message: "User Created Successfully",
      data: result.rows[0],
      error: false,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB()
    res.status(200).json({
      message: "Users retrieved Successfully",
      data: result.rows,
      error: false,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
};
