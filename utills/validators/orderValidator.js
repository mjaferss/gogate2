const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
// const Transport = require("../../models/transportModel");
exports.getOrderValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware, 
];
exports.creatOrderValidator = [
  check("invoice")
    .notEmpty()
    .withMessage("no invoice"),
    check("tracknumber")
    .notEmpty()
    .withMessage("no date"),
    check("datein")
    .notEmpty()
    .withMessage("no date"),
  check("images").optional(),
  validatorMiddleware,
];
exports.updateOrderValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
exports.deleteOrderValidator = [
  check("id").isMongoId().withMessage("in valalid id"),
  validatorMiddleware,
];
 