const slugify = require("slugify");
const { check, body } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getProfileValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
exports.creatProfileValidator = [
  check("name").optional()
    //.notEmpty()
    // .withMessage("profile name required")
   // .isLength({ min: 4 })
    // .withMessage("too short profile name")
    // .isLength({ max: 100 })
    // .withMessage("too Long profile name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("gate")
    .isMongoId()
    .withMessage("in valalid id")
    .notEmpty()
    .withMessage("pleae selcet your location from list"),
  check("user")
    .isMongoId()
    .withMessage("in valalid id")
    .notEmpty()
    .withMessage("pleae selcet your user name from list"),
  check("company")
    .isMongoId()
    .withMessage("in valalid id")
    .notEmpty()
    .withMessage("pleae selcet your company from list"),
  check("aname")
    .optional()
    .isLength({ min: 4 })
    .withMessage("too short profile name")
    .isLength({ max: 100 })
    .withMessage("too Long profile name"),

  validatorMiddleware,
];
exports.updateProfileValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("gate")
    .isMongoId()
    .withMessage("in valalid id")
    .notEmpty()
    .withMessage("pleae selcet your location from list"),
  check("user")
    .isMongoId()
    .withMessage("in valalid id")
    .notEmpty()
    .withMessage("pleae selcet your user name from list"),
  check("company")
    .isMongoId()
    .withMessage("in valalid id")
    .notEmpty()
    .withMessage("pleae selcet your company from list"),
  check("aname")
    .optional()
    .isLength({ min: 4 })
    .withMessage("too short profile name")
    .isLength({ max: 100 })
    .withMessage("too Long profile name"),

  validatorMiddleware,
];
exports.deleteProfileValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
