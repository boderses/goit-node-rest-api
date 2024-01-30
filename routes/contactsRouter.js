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
} = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", idValidator, contactWithoutId, getOneContact);

contactsRouter.delete("/:id", idValidator, contactWithoutId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  idValidator,
  contactWithoutId,
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  idValidator,
  contactWithoutId,
  validateBody(schemas.updateContactStateSchema),
  updateContactState
);

module.exports = contactsRouter;
