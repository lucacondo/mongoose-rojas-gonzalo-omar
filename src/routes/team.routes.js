import { Router } from "express";
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller.js";

export const teamRouter = Router();

teamRouter.post("/teams", createTeam);
teamRouter.get("/teams", getAllTeams);
teamRouter.get("/teams/:id", getTeamById);
teamRouter.put("/teams/:id", updateTeam);
teamRouter.delete("/teams/:id", deleteTeam);
