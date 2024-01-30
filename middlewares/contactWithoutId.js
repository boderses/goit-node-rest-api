const { HttpError } = require("../helpers");
const contactsService = require("../services/contactsServices");

const contactWithoutId = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    next(HttpError(404, "Not Found"));
  }
  next();
};

module.exports = contactWithoutId;
