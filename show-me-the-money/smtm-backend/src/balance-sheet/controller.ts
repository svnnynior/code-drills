import type { NextFunction, Request, Response } from "express";
import { getBalanceSheet } from "./service";

export const get = async (
  req: Request<
    {},
    {},
    {},
    { date?: string; periods?: string; timeframe?: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, periods, timeframe } = req.query;
    res.json(await getBalanceSheet({ date, periods, timeframe }));
  } catch (error) {
    console.error("GET /api/balance-sheet error: ", error);
    res.status(500).json({ error: "Error when fetching balance sheet" });
  }
};
