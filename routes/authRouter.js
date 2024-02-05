const express = require("express");
const { userActionsSchema } = require("../schemas/userSchema");
const { validateBody, checkAuthData } = require("../middlewares");
const userController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userActionsSchema.registerSchema),
  userController.register
);
authRouter.post(
  "/login",
  validateBody(userActionsSchema.loginSchema),
  userController.login
);
authRouter.post("/current", checkAuthData, userController.currentUser);
authRouter.post("/logout", checkAuthData, userController.logout);

module.exports = authRouter;
