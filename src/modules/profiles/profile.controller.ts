import type { Request, Response } from "express";

const createProfile = async (req: Request, res: Response) => {};
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
