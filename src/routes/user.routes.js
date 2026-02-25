import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users/:id", getUser);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);

export { userRoutes };
