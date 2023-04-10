const mongoose = require("mongoose");
const gateSchema = new mongoose.Schema(
  {
    a_name: {
      type: String,
      // required: [true, " company name is required"],
      // unique: [true, "company name must be unique"],
      // minlength: [4, "too short company name"],
      // maxlength: [100, "too long company name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    e_name: {
      type: String,

      // minlength: [4, "too short company name"],
      // maxlength: [100, "too long company name"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    // location:[ {
    //   lat: String,
    //   long: String,
    // }],
    location: {
      type: { 
          type: String, 
          enum: ['Point'] 
      },
      coordinates: { 
          type: [Number] 
      }
    }
  },
  {
    timestamps: true,
    // to enable virtual populate
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);
gateSchema.index({ location: "2dsphere" }); 
gateSchema.pre(/find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  // this.populate({
  this.populate({
    path: "user",
    select: "name company -_id",
    options: { _recursed: true },
  });
  next();
});

module.exports = mongoose.model("Gate", gateSchema);
