const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, required: true },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required,
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required,
  password: Joi.string().min(6).required(),
});

const schemas = { registerSchema, loginSchema };

const User = model("user", userSchema);

module.exports = { User, schemas };
