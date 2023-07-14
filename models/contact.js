const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, match: phoneRegexp, require: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean,
});

const schemas = { contactSchema, addSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
