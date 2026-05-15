import { pool } from "../../db/db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, is_active, age } = payload;
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,is_active, age) VALUES($1,$2,$3,$4,$5)
      RETURNING *
    `,
    [name, email, password, is_active, age],
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
};
