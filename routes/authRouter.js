import express from "express";

import authController from "../controllers/authController.js";

import { authenticate, isEmptyBody, upload } from "../middlewares/index.js";

import { validateBody } from "../helpers/index.js";

import { userAuthSchema, updateSibscriptionSchema } from "../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userAuthSchema),
  authController.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userAuthSchema),
  authController.login
);

authRouter.patch(
  "/subscription",
  authenticate,
  isEmptyBody,
  validateBody(updateSibscriptionSchema),
  authController.updateSubscription
);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);

authRouter.get("/current", authenticate,  authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
