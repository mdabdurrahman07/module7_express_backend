import type { NextFunction, Request, Response } from "express";
import fs from "fs";
const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `\n Method -> ${req.method} - Time -> ${Date.now()} -URL -> ${req.url}`;
  fs.appendFile("logger.txt", log, (err) => {
    console.log("logger error", err);
  });
  next()
};
export default logger;
