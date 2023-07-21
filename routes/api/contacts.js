const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  removeContact,
} = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router
  .route("/")
  .get(authenticate, listContacts)
  .post(authenticate, validateBody(schemas.addSchema), addContact);
router
  .route("/:contactId")
  .get(authenticate, isValidId, getContactById)
  .delete(authenticate, isValidId, removeContact)
  .put(authenticate, isValidId, validateBody(schemas.addSchema), updateContact);
router
  .route("/:contactId/favorite")
  .patch(
    authenticate,
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    updateFavorite
  );

module.exports = router;
