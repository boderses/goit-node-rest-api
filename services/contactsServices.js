const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");;

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [res] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return res;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex((index) => index.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  allContacts[contactIndex] = { id: contactId, name, email, phone};
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[contactIndex];
}

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
};