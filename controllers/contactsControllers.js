const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
} = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");
const { addSchema } = require("../schemas/contactSchema");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await listContactsService();
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactByIdService(contactId);
  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, "missing required name field");
  }
  const result = await addContactService(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContactService(contactId);
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await updateContactService(contactId, req.body);
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
