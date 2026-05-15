import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();
// user post route
router.post("/", userController.createUser);
// get all users
router.get("/", userController.getAllUsers);
// * Single User Get Route
router.get("/:id", userController.getSingleUser);

export const userRoute = router;
