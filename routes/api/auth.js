const express = require("express");

const {
  login,
  register,
  verifyEmail,
  resendVerifyEmail,
  getCurrent,
  logout,
  updateAvatar,
} = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../../schemas/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateBody(emailSchema), resendVerifyEmail);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
