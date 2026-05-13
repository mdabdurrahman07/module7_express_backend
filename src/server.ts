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
            email VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(30) NOT NULL,
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

initDB();

// console.log(pool);
app.get("/", (req: Request, res: Response) => {
  res.send("This is new server");
});

app.post("/", async (req: Request, res: Response) => {
  //   console.log("this is body", req.body);
  const body = req.body;
  const { name, email, is_active, age, password } = body;
  try {
    const result = await pool.query(
      `
    INSERT INTO users(name,email,password,is_active, age) VALUES($1,$2,$3,$4,$5)
      RETURNING *
    `,
      [name, email, password, is_active, age],
    );
    //   console.log(result);
    res.status(201).json({
      message: "User Created Successfully",
      data: result.rows[0],
      error: false,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
