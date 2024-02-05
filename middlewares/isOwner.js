const { HttpError } = require("../helpers");
const contactsServices = require("../services/contactsServices");

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await contactsServices.getContactById(id);

  if (!contact.owner.equals(_id)) {
    next(HttpError(404));
  }

  next();
};

module.exports = isOwner;