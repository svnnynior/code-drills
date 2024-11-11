import express, { Express, Request, Response } from "express";
import balanceSheetRouter from "./balance-sheet/route";
const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express + TypeScript Server");
});

app.use("/api/balance-sheet", balanceSheetRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
