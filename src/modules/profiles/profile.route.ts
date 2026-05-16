import { Router } from "express";
import { profileControllers } from "./profile.controller";

const router = Router()

//* profiles post route 
router.post("/", profileControllers.createProfile)
router.get("/", profileControllers.getProfile)
router.get("/:id", profileControllers.getSingleProfile)
router.put("/:id", profileControllers.updateProfile)
router.delete("/:id", profileControllers.deleteProfile)

export const profileRoute = router