const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {

      if (error.message === '"email" is required') {
        error.message = "missing required field email";
      }
      
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
