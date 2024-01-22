const express = require("express");
const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError.js");
const catchAsync = require("../helpers/catchAsync.js");


const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
    const {id} = req.params;
    const oneContact = await contactsService.getContactById(id);

    if(!oneContact) {
        throw HttpError(404, "Not Found");
    }
    res.status(200).json(oneContact);
};

const deleteContact = async (req, res) => {
    const {id} = req.params;
    const removedContact = await contactsService.removeContact(id);

    if (!removedContact) {
        throw HttpError(404, "Not Found")
    }
    console.log(removedContact);
    res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
    const validContact = Object.keys(req.body).length > 0;
    if (!validContact) {
        throw HttpError(400, "Body must have at least one field");
    }
    const { id } = req.params;
    const updContact = await contactsService.updateContact(id, req.body);
    console.log(req.body);
    if (!updContact) {
        throw HttpError(400, "Bad Request");
    }
    res.status(200).json(updContact);
};

module.exports = {
    getAllContacts: catchAsync(getAllContacts),
    getOneContact: catchAsync(getOneContact),
    deleteContact: catchAsync(deleteContact),
    createContact: catchAsync(createContact),
    updateContact: catchAsync(updateContact),
};