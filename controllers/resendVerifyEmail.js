require("dotenv").config();
const { catchAsync, HttpError } = require("../helpers");
const { User } = require("../schemas/usersSchemas.js");
const { sendEmail } = require("../services/sendEmail.js");


const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: user.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}" >Click to verify</a>`,
  };

  sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  resendVerifyEmail: catchAsync(resendVerifyEmail),
};