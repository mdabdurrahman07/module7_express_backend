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
const getAllUsersFromDB = async () =>{
  const result = await pool.query(
      `SELECT * FROM users
            `,
    );
    return result
}
const getSingleUserFromDB = async (id:any) =>{
  const result = await pool.query(
      `
        SELECT * FROM users WHERE id = $1
        `,
      [id],
    );
    return result
}

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB
};
