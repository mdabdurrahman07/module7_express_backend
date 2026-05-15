import { Router, type Request, type Response } from "express";
import { pool } from "../../db/db";

const router = Router()

router.post("/", async (req: Request, res: Response) => {
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

export const userRoute = router