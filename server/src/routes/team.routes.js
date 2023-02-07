import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import teamController from "../controllers/team.controller.js";
import tasksController from "../controllers/tasks.controller.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const router = express.Router();

router.post(
  "/createTeam",
  tokenMiddleware.auth,
  body("teamName").exists().withMessage("Team Name is required"),
  requestHandler.validate,
  teamController.createTeam
);

router.get("/getMembers", tokenMiddleware.auth, teamController.getAllMembers);

router.get("/getTeams", tokenMiddleware.auth, teamController.getTeams);

router.get("/getTeam/:teamId", tokenMiddleware.auth, teamController.getTeam);

router.post(
  "/teamMembersDetail",
  tokenMiddleware.auth,
  requestHandler.validate,
  teamController.getTeamMemberDetails
);

router.put(
  "/updateView",
  tokenMiddleware.auth,
  requestHandler.validate,
  teamController.updateView
);

router.post(
  "/createTask",
  tokenMiddleware.auth,
  requestHandler.validate,
  tasksController.createTask
);

export default router;
