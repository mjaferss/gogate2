// const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

const Company = require("../models/companyModel");

exports.uploadlogoImage = uploadSingleImage("logo");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `company-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/company/${filename}`);
    // Save image into our db
    req.body.logo = filename;
  }

  next();
});
// احضار جميع الشركات
exports.getCompanies = factory.getAll(Company);

exports.setUserIdToBody = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
//اضافة شركة
exports.creatCompany = factory.createOne(Company);
//شركة واحدة
exports.getCompany = factory.getOne(Company);
//شركة واحدةتعديل
exports.updateCompany = factory.updateOne(Company);

//شركة حذف
exports.deleteCompany = factory.deleteOne(Company);
