import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import jwt from "jsonwebtoken";
import config from "../../config/env.config";

type Payload = {
  email: string;
  password: string;
};
const loginUserIntoDB = async (payload: Payload) => {
  const { email, password } = payload;

  // ! 1. find the user if the user exists
  const userData = await pool.query(
    `SELECT * FROM users WHERE email=$1
        
        `,
    [email],
  );
  const user = userData.rows[0];
  if (user.length === 0) {
    throw new Error("Invalid Credentials");
  }
  // ! 2. compare password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid Credentials");
  }
  // ! 3. generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "1d" });
  return { accessToken };
};

export const authServices = {
  loginUserIntoDB,
};
