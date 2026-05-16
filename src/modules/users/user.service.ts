import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, is_active, age } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,is_active, age) VALUES($1,$2,$3,$4,$5)
      RETURNING *
    `,
    [name, email, hashedPassword, is_active, age],
  );
  delete result.rows[0].password;
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await pool.query(
    `SELECT * FROM users
            `,
  );
  return result;
};
const getSingleUserFromDB = async (id: any) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE id = $1
        `,
    [id],
  );
  return result;
};
const updateUserFromDB = async (payload: IUser, id: any) => {
  const { name, is_active, age, password } = payload;
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
  return result;
};
const deleteUserFromDB = async (id: any) => {
  const result = await pool.query(
    `DELETE  FROM users WHERE id=$1 
            `,
    [id],
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
