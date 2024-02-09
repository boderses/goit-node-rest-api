const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactState,
} = require("../controllers/contactsControllers.js");

const schemas = require("../schemas/contactsSchemas.js");

const {
  validateBody,
  idValidator,
  contactWithoutId,
  checkAuthData,
} = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", checkAuthData, getAllContacts);

contactsRouter.get("/:id", idValidator, contactWithoutId, checkAuthData, getOneContact);

contactsRouter.delete("/:id", idValidator, contactWithoutId, checkAuthData, deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  checkAuthData,
  createContact
);

contactsRouter.put(
  "/:id",
  idValidator,
  contactWithoutId,
  validateBody(schemas.updateContactSchema),
  // checkAuthData,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  idValidator,
  contactWithoutId,
  validateBody(schemas.updateContactStateSchema),
  checkAuthData,
  updateContactState
);

module.exports = contactsRouter;
