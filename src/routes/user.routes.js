import { Router } from "express";
import { createUser, deleteUsers, getAllUsers, getUsersById, updateUsers } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUsersById);
userRouter.put("/users/:id", updateUsers);
userRouter.delete("/users/:id", deleteUsers);