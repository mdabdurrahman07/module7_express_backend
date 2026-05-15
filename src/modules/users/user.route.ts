import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();
//* user post route
router.post("/", userController.createUser);
//* get all users
router.get("/", userController.getAllUsers);
//* Single User Get Route
router.get("/:id", userController.getSingleUser);
// * Update a single users
router.put("/api/users/:id", userController.updateUser);

export const userRoute = router;
