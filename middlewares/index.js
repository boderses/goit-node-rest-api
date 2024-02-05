const contactWithoutId = require("./contactWithoutId");
const validateBody = require("./validateBody");
const idValidator = require("./idValidator");
const checkAuthData = require("./authMiddleware");

module.exports = { contactWithoutId, validateBody, idValidator, checkAuthData };
