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
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
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
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServices.getSingleUserFromDB(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "Single User Not found",
        data: {},
        error: true,
      });
    }
    res.status(200).json({
      message: "Single User retrieved",
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
const updateUser = async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const result = await userServices.updateUserFromDB(body, id);
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "User id not found",
        data: {},
        error: true,
      });
    }
    // console.log(result)
    res.status(200).json({
      message: "User  updated",
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
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServices.deleteUserFromDB(id);
    if (result.rowCount === 0) {
      res.status(404).json({
        message: "User id not found",
        data: {},
        error: true,
      });
    }
    // console.log(result)
    res.status(200).json({
      message: "User  deleted",
      error: false,
    });
    console.log(result);
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
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
