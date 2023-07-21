const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router
  .route("/")
  .get(authenticate, ctrl.listContacts)
  .post(authenticate, validateBody(schemas.addSchema), ctrl.addContact);
router
  .route("/:contactId")
  .get(authenticate, isValidId, ctrl.getContactById)
  .delete(authenticate, isValidId, ctrl.removeContact)
  .put(
    authenticate,
    isValidId,
    validateBody(schemas.addSchema),
    ctrl.updateContact
  );
router
  .route("/:contactId/favorite")
  .patch(
    authenticate,
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateFavorite
  );

module.exports = router;
