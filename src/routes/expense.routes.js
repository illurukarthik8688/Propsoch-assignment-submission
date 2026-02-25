import { Router } from "express";
import { createExpense } from "../controllers/expense.controller";

const expenseRoutes = Router();

expenseRoutes.post("/expenses", createExpense);

export { expenseRoutes };
