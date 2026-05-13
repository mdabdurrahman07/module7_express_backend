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

// db pool Connection with neon
const pool = new Pool({
  connectionString: process.env.NEON_PG_CONNECTION_STRING,
});

// db Connection

const initDB = async () => {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(30) NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

            )
            `,
    );
    console.log("DB connected");
  } catch (error) {
    console.log("db connection error", error);
  }
};

initDB()

// console.log(pool);
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
