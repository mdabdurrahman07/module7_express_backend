import type { Request, Response } from "express";
import { profileServices } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await profileServices.createProfileIntoDB(body);
    res.status(201).json({
      message: "Profile Created Successfully",
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
const getProfile = async (req: Request, res: Response) => {};
const getSingleProfile = async (req: Request, res: Response) => {};
const updateProfile = async (req: Request, res: Response) => {};
const deleteProfile = async (req: Request, res: Response) => {};

export const profileControllers = {
  createProfile,
  getProfile,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
