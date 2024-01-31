const express = require("express");
const contactsService = require("../services/contactsServices.js");
const { HttpError, catchAsync } = require("../helpers");

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const oneContact = await contactsService.getContactById(id);
  res.status(200).json(oneContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await contactsService.removeContact(id);
  res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updContact = await contactsService.updateContact(id, req.body);
  res.status(200).json(updContact);
};

const updateContactState = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await contactsService.updateContact(id, req.body);
  console.log(req.body.favorite);
  if (favorite === undefined) {
    throw HttpError(400, "Field favorite is required");
  }
  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: catchAsync(getAllContacts),
  getOneContact: catchAsync(getOneContact),
  deleteContact: catchAsync(deleteContact),
  createContact: catchAsync(createContact),
  updateContact: catchAsync(updateContact),
  updateContactState: catchAsync(updateContactState),
};
