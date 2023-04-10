const slugify = require("slugify");
const { check, body } = require("express-validator");
const Review = require("../../models/reviewModel");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
exports.createReviewValidator = [
  check("msg").optional(),

  check("user").isMongoId().withMessage("Invalid Review id format"),
  check("order").isMongoId().withMessage("Invalid Review id format"),
  // .custom((val, { req }) =>
  //   // Check if logged user create review before
  //   Review.findOne({ user: req.user._id, product: req.body.product }).then(
  //     (review) => {
  //       console.log(review);
  //       if (review) {
  //         return Promise.reject(
  //           new Error("You already created a review before")
  //         );
  //       }
  //     }
  //   )
  // ),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format"),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format"),
  // .custom((val, { req }) =>
  //   // Check review ownership before update
  //   Review.findById(val).then((review) => {
  //     if (!review) {
  //       return Promise.reject(new Error(`There is no review with id ${val}`));
  //     }

  //     if (review.user._id.toString() !== req.user._id.toString()) {
  //       return Promise.reject(
  //         new Error(`Your are not allowed to perform this action`)
  //       );
  //     }
  //   })
  // ),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) => {
      // Check review ownership before update
      if (req.user.role === "user") {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`)
            );
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error(`Your are not allowed to perform this action`)
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];
