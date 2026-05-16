import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db/db";
import { userRoute } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

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
app.use("/api/auth", authRoute);

export default app;
