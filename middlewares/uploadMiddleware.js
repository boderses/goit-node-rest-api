const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const tmpPath = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpPath,
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const multerFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image/")) {
    cd(null, true);
  } else {
    cd(HttpError(400, "Please upload only images"));
  }
};

const uploadAvatar = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
});

module.exports = uploadAvatar;