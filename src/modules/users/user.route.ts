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
router.put("/:id", userController.updateUser);
// * delete users
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
