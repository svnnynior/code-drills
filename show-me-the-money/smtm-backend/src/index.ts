import express, { Express, Request, Response } from "express";
import balanceSheetRouter from "./balance-sheet/route";
import dotenv from "dotenv";
import { XERO_API_BASE_URL } from "./shared/config";

const app: Express = express();
const port = 3001;

dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express + TypeScript Server");
});

app.use("/api/balance-sheet", balanceSheetRouter);

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port} -- connecting with Xero API at: ${XERO_API_BASE_URL}`
  );
});
