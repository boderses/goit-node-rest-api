const { HttpError } = require("../helpers");
const { User } = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "94BB5uiDS3000tt21ai12PbsYwCat";

const checkAuthData = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = checkAuthData;
