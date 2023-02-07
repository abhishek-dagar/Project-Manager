import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import tasksController from "../controllers/tasks.controller.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const router = express.Router();

router.post(
  "/createTask",
  tokenMiddleware.auth,
  body("teamId").exists().withMessage("Team is required"),
  body("taskName").exists().withMessage("Task name is required"),
  requestHandler.validate,
  tasksController.createTask
);

router.get(
    "/getTasks/:groupBy",
    tokenMiddleware.auth,
    tasksController.getTasks,
)

router.get(
    "/getTasks/:groupBy/:teamId",
    tokenMiddleware.auth,
    tasksController.getTasks,
)

export default router;
