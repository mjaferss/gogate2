const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    invoice: {
      type: String,
      required: [true, " company name is required"],
      unique: [true, "company name must be unique"],
      minlength: [4, "too short company name"],
      maxlength: [30, "too long company name"],
    },
  
   
    tracknumber: {
      type: Number,
      default: 1,

    },
    gate: {
      type: mongoose.Schema.ObjectId,
      ref: "Gate",
    },
    company: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Company",
      },
    ],
    // mycompany: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Company",
    // },
    drivers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    files: [String],
    file: {
      type: String
    },
    datein:{type: Date},
   
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
 


orderSchema.pre(/find/, function (next) {
  
  if (this.options._recursed) {
    return next();
  }
  // this.populate({
  this.populate({
    path: "gate drivers user company",
   
    select: "a_name location coordinates e_name" ,
    options: { _recursed: true },
  });
  // console.log(select);
  next();
});




module.exports = mongoose.model("Order", orderSchema);
