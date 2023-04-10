const slugify = require("slugify");
const { check, body } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Company = require("../../models/companyModel");
exports.getCompayValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
exports.creatCompanyValidator = [
  // check("a_name")
  //   .notEmpty()
  //   .withMessage("company name required")
  //   .isLength({ min: 3 })
  //   .withMessage("too short company name")
  //   .isLength({ max: 32 })
  //   .withMessage("too Long company name")
  //   .custom((val, { req }) => {
  //     req.body.slug = slugify(val);
  //     return true;
  //   }),
  // check("email")
  //   .notEmpty()
  //   .withMessage("Email required")
  //   .isEmail()
  //   .withMessage("Invalid email address")
  //   .custom((val) =>
  //     Company.findOne({ email: val }).then((company) => {
  //       if (company) {
  //         return Promise.reject(new Error("E-mail already in company"));
  //       }
  //     })
  //   ),
  // check("phone")
  //   .optional()
  //   .isMobilePhone(["ar-EG", "ar-SA"])
  // //   .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),
  // check("gate")
  //   .isMongoId()
  //   .withMessage("in valalid id")
  //   .notEmpty()
  //   .withMessage("pleae selcet your location from list"),
  // check("user").optional()
  //   .isMongoId()
  //   .withMessage("in valalid id")
  //   .notEmpty()
  //   .withMessage("pleae selcet your user name from list"),
  check("e_name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("too short profile name")
    .isLength({ max: 100 })
    .withMessage("too Long profile name"),

  validatorMiddleware,
];
exports.updateCompanyValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  body("short_name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatorMiddleware,
];
exports.deleteCompanyValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
