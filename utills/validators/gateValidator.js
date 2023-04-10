const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getGateValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
exports.creatGateValidator = [
  check("a_name")
    .notEmpty()
    .withMessage("gate name required")
    .isLength({ min: 3 })
    .withMessage("too short gate name")
    .isLength({ max: 32 })
    .withMessage("too Long gate name"),
  validatorMiddleware,
];
exports.updateGateValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
exports.deleteGateValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
