import { Router } from "express";
import { getBalances } from "../controllers/balance.controller";

const balanceRoutes = Router();

balanceRoutes.get("/balances/:userId", getBalances);

export { balanceRoutes };
