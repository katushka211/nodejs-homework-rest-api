const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");
const { nanoid } = require("nanoid");
const HttpError = require("../helpers/HttpError");

const listContactsService = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactByIdService = async (contactId) => {
  const contacts = await listContactsService();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  return result;
};

const removeContactService = async (contactId) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    throw new HttpError(404, "Contact not found");
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContactService = async (body) => {
  const contacts = await listContactsService();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (contactId, body) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    throw new HttpError(404, "Contact not found");
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
