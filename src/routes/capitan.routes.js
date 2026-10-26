import { Router } from "express";
import {
  createCaptain,
  deleteCaptain,
  getAllCapitans,
  getCapitanById,
  updateCaptain,
} from "../controllers/capitan.controller.js";

export const capitanRouter = Router();

capitanRouter.post("/capitan", createCaptain);
capitanRouter.get("/capitan", getAllCapitans);
capitanRouter.get("/capitan/:id", getCapitanById);
capitanRouter.put("/capitan/:id", updateCaptain);
capitanRouter.delete("/capitan/:id", deleteCaptain);
