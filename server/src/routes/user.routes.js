import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/manager.model.js";
import userController from "../controllers/user.controller.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  body("email")
    .exists()
    .withMessage("email is required")
    .custom(async (value) => {
      const user = await userModel.findOne({ email: value });
      if (user) return Promise.reject("email already used");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("confirmPassword not match");
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("displayname is required")
    .isLength({ min: 8 })
    .withMessage("displayName minimum 8 character"),
  body("designation").exists().withMessage("designation is required"),
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  body("email").exists().withMessage("email is required"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  body("designation").exists().withMessage("designation is required"),
  requestHandler.validate,
  userController.signIn
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get("/getMemberDetails/:memberId", tokenMiddleware.auth, userController.getMemberDetail);


export default router;
