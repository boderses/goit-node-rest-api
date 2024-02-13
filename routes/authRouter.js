const express = require("express");
const { userActionsSchema } = require("../schemas/usersSchemas");
const { validateBody, checkAuthData, uploadAvatar } = require("../middlewares");
const userController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", validateBody(userActionsSchema.registerSchema), userController.register);
authRouter.post("/login",validateBody(userActionsSchema.loginSchema), userController.login);
authRouter.get("/current", checkAuthData, userController.currentUser);
authRouter.post("/logout", checkAuthData, userController.logout);
authRouter.patch("/avatars", checkAuthData, uploadAvatar.single("avatar"), userController.updateAvatar);

module.exports = authRouter;
