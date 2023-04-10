const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    // parent reference (one to many)
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
      required: [true, "Review must belong to Transport"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "a_name e_name" });
  next();
});

module.exports = mongoose.model("Review", reviewSchema);
