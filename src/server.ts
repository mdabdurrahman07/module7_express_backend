import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { Pool } from "pg";
const app = express();
const port = 5500;

// middleware
dotenv.config();
app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// db pool Connection
const pool = new Pool({
  connectionString: process.env.NEON_PG_CONNECTION_STRING,
});

console.log(pool);
app.get("/", (req: Request, res: Response) => {
  res.send("This is new server");
});

app.post("/", (req: Request, res: Response) => {
  //   console.log("this is body", req.body);
  const body = req.body;
  const { name, email, role } = body;
  res.status(201).json({
    message: "Created",
    data: {
      name,
      email,
      role,
    },
    error: false,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
