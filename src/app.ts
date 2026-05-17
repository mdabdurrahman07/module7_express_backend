import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db/db";
import { userRoute } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { profileRoute } from "./modules/profiles/profile.route";
import logger from "./middleware/logger";

const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(logger)

// root
app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    message: "Welcome to Express and NeonDB Backend Services",
    author: "MD Abdur Rahman Nur Jamil",
    error: false,
  });
});

// endPoints of USERS (POST,GET,PUT,DELETE)
app.use("/api/users", userRoute);
// endPoints of AUTH (POST)
app.use("/api/auth", authRoute);
// endPoints of Profiles (POST,GET,PUT,DELETE)
app.use("/api/profiles", profileRoute)

export default app;
