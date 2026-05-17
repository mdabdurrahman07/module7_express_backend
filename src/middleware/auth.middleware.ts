import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import config from "../config/env.config";
import { pool } from "../db/db";

// * Process

// ! get the token from headers
// ! check the token existence
// ! decode the token
// ! get the user from BD
// ! set the decode into request req.user = decoded 

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const decoded = jwt.verify(token as string, config.secret) as JwtPayload;
    const userData = await pool.query(
      `SELECT * FROM users WHERE email=$1
        `,
      [decoded.email],
    );
    const user = userData.rows[0];
    if (userData.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    if (!user.is_active) {
      res.status(403).json({
        success: false,
        message: "Forbidden!!",
      });
    }
    req.user = decoded // req: {user:{}}
    next();
    } catch (error) {
        next(error)
    }
  };
};

export default auth;
