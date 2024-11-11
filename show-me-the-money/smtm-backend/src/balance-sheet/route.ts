import { Router } from "express";
import * as balanceSheetController from "./controller";

const router = Router();

router.get("/", balanceSheetController.get);

export default router;
