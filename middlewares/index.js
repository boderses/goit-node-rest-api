const contactWithoutId = require("./contactWithoutId");
const validateBody = require("./validateBody");
const idValidator = require("./idValidator");
const checkAuthData = require("./authMiddleware");
const uploadAvatar = require("./uploadMiddleware");

module.exports = {
  contactWithoutId,
  validateBody,
  idValidator,
  checkAuthData,
  uploadAvatar,
};
