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
const validateBody = require("../helpers/validateBody.js");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(schemas.updateContactStateSchema),
  updateContactState
)

module.exports = contactsRouter;
