const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

router
  .route("/register")
  .post(validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
