const multer = require("multer");
const ApiError = require("../utills/apiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, files, cb) {
    if (files.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Images allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
