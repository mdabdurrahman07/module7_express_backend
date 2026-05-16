import type { Request, Response } from "express";
import { profileServices } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
    const body = req.body
    const result = await profileServices.createProfileIntoDB(body)
    res.status(201).json({
      message: "Profile Created Successfully",
      data: result.rows[0],
      error: false,
    });
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
