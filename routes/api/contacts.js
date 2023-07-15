const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router
  .route("/")
  .get(ctrl.listContacts)
  .post(validateBody(schemas.addSchema), ctrl.addContact);
router
  .route("/:contactId")
  .get(isValidId, ctrl.getContactById)
  .delete(isValidId, ctrl.removeContact)
  .put(isValidId, validateBody(schemas.addSchema), ctrl.updateContact);
router
  .route("/:contactId/favorite")
  .patch(
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateFavorite
  );

module.exports = router;
