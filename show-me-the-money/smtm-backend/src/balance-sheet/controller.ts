import type { NextFunction, Request, Response } from "express";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello Balance Sheet");
  next();
};
