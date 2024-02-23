const express = require("express");
const { userActionsSchema } = require("../schemas/usersSchemas");
const { emailSchema } = require("../schemas/emailSchemas.js");
const { validateBody, checkAuthData, uploadAvatar } = require("../middlewares");
const userController = require("../controllers/authController");
const { verifyEmail } = require("../controllers/verifyEmail.js");
const { resendVerifyEmail } = require("../controllers/resendVerifyEmail.js");

const authRouter = express.Router();

authRouter.post("/register", validateBody(userActionsSchema.registerSchema), userController.register);
authRouter.post("/login",validateBody(userActionsSchema.loginSchema), userController.login);
authRouter.get("/current", checkAuthData, userController.currentUser);
authRouter.post("/logout", checkAuthData, userController.logout);
authRouter.patch("/avatars", checkAuthData, uploadAvatar.single("avatar"), userController.updateAvatar);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

module.exports = authRouter;
