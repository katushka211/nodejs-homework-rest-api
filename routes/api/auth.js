const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router
  .route("/register")
  .post(validateBody(schemas.registerSchema), ctrl.register);

router.route("/login").post(validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
