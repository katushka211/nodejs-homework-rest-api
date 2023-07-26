const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../../schemas/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
