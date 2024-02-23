require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { v4 } = require("uuid");

const { User } = require("../schemas/usersSchemas.js");
const { catchAsync, HttpError } = require("../helpers");
const { sendEmail } = require("../services/sendEmail.js");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsPath = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedEmail = crypto.createHash("md5").update(email).digest("hex");

  const avatarURL = gravatar.url(hashedEmail);
  const verificationToken = v4();


  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,

  });

  const verifyEmail = {
    to: newUser.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`
  }

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verify")
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(401, "Not authorized");
  }
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);

  const filename = `${_id}_${originalname}`;
  const uploadNew = path.join(avatarsPath, filename);
  await fs.rename(tempUpload, uploadNew);
  const avatarLink = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarLink });

  res.status(200).json({
    avatarURL: avatarLink,
  });
};

module.exports = {
  register: catchAsync(register),
  login: catchAsync(login),
  currentUser: catchAsync(currentUser),
  logout: catchAsync(logout),
  updateAvatar: catchAsync(updateAvatar),
};
