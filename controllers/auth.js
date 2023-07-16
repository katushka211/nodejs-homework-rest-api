const { User } = require("../models/user.js");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = ctrlWrapper(async (req, res) => {
  const newUser = await User.create(req.body);
  res.json({ email: newUser.email, name: newUser.name });
});

module.exports = { register };
