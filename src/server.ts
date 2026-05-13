import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import path from "node:path";
import { Pool } from "pg";
const app: Application = express();
const port = process.env.PORT || 8010;
console.log(port);

// middleware
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});
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

//! db Connection
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

// Calling the dataBase
initDB();

// console.log(pool);
app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    message: "Welcome to Express and NeonDB Backend Services",
    author: "MD Abdur Rahman Nur Jamil",
    error: false,
  });
});

// * User Post Route
app.post("/api/users", async (req: Request, res: Response) => {
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
// * User Get RouteParameters
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users
            `,
    );
    res.status(200).json({
      message: "User retrieved Successfully",
      data: result.rows,
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
// * Single User Get Route
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id = $1
        `,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "Single User Not found",
        data: {},
        error: true,
      });
    }
    res.status(200).json({
      message: "Single User retrieved",
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
// * Update a single users
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  const { name, is_active, age, password } = body;
  try {
    const result = await pool.query(
      `
        UPDATE users
        SET
        name=COALESCE($1,name),
        is_active=COALESCE($2,is_active),
        age=COALESCE($3,age),
        password=COALESCE($4,password)
        WHERE id=$5
        RETURNING *
        `,
      [name, is_active, age, password, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "User id not found",
        data: {},
        error: true,
      });
    }
    // console.log(result)
    res.status(200).json({
      message: "User  updated",
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
// * delete users
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE  FROM users WHERE id=$1 
            `,
      [id],
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        message: "User id not found",
        data: {},
        error: true,
      });
    }
    // console.log(result)
    res.status(200).json({
      message: "User  deleted",
      error: false,
    });
    console.log(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      error: true,
    });
  }
});
// port is listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
