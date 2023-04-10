const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
  {
    short_name: {
      type: String,
      required: [true, " company name is required"],
      // unique: [true, "company name must be unique"],
      // minlength: [5, "too short company name"],
      // maxlength: [100, "too long company name"],
    },
    a_name: {
      type: String,
      required: [true, " company name is required"],
      // unique: [true, "company name must be unique"],
      // minlength: [5, "too short company name"],
      // maxlength: [100, "too long company name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    e_name: {
      type: String,

      minlength: [3, "too short company name"],
      maxlength: [100, "too long company name"],
    },
    email: {
      type: String,
      unique: true,
      minlength: [3, "too short Email"],
      maxlength: [30, "too long Email"],
    },
    phone: {
      type: String,
      unique: true,
      minlength: [3, "too short Email"],
      maxlength: [30, "too long Email"],
    },

    cr: {
      type: Number,
      unique: [true, "company cr must be unique"],
      min: [1, "too short company cr"],
      maxlength: [12, "too long company cr"],
    },

    companies_type_id: {
      type: String,
      required: [true, " company type name is required"],
      enum: ["Factory", "Transporter", "Custom Clearance","App"],
      default: "Transporter",
    },
    country_id: {
      type: String,
      // required: [true, " company type name is required"],
      enum: ["saudi arabia", "kuwait", "qatar","UAE","Bahrain","Yemen","Jordan","Oman" ,"Iraq","other","sudan"],
      default: "saudi arabia",
    },

    logo: {
      type: String,
    },

    gate: [{
      type: mongoose.Schema.ObjectId,
      ref: "Gate",
    }],
    location: {
      lat: String,
      long: String,
    },
    link_company: [
      {
        type: mongoose.Schema.ObjectId,

        ref: "Company",
      },
    ],
    location: {
      type: { 
          type: String, 
          enum: ['Point'] 
      },
      coordinates: { 
          type: [Number] 
      }
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

companySchema.pre(/find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  // this.populate({
  this.populate({
    path: "user gate link_company",
    select: "a_name e_name location coordinates",
    options: { _recursed: true },
  });
  next();
});
const setImageURL = (doc) => {
  if (doc.logo) {
    const imageUrl = `${process.env.BASE_URL}/company/${doc.logo}`;
    doc.logo = imageUrl;
  }
};

module.exports = mongoose.model("Company", companySchema);
