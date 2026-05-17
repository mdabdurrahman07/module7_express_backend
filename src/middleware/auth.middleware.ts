import  jwt  from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import config from '../config/env.config';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const decoded = jwt.verify(token as string, config.secret)
    console.log(decoded)
    next();
  };
};

export default auth;
