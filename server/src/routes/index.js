import express from "express";
import userRoute from "./user.routes.js";
import teamRoute from "./team.routes.js";
import taskRoute from "./tasks.routes.js";

const routes = express.Router();

routes.use("/user", userRoute);
routes.use("/team", teamRoute);
routes.use("/tasks", taskRoute);

export default routes;
