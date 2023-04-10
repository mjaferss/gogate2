const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    a_name: {
      type: String,
      required: [true, " company name is required"],
      minlength: [4, "too short company name"],
      maxlength: [100, "too long company name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    e_name: {
      type: String,

      minlength: [4, "too short company name"],
      maxlength: [100, "too long company name"],
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "Too short password"],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    idnum: {
      type: Number,

      minlength: [10, "too short company name"],
      maxlength: [15, "too long company name"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: {String},
    w_phone: {String},
    profileimage: 
      {
        imagename: String,
        image: String,
      },
    
    pdate: {
      type: Date,
    },
    location: {
      type: { 
          type: String, 
          enum: ['Point'] 
      },
      coordinates: { 
          type: [Number] 
      }
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
    },

    user_type: {
      type: String,
      required: [true, " Type user  is required"],
      enum: ["user", "app admin", "admin","driver"],
      default: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
    online: { 
      type: Boolean,
      default: false,
    },

    gate: {
      type: mongoose.Schema.ObjectId,
      ref: "Gate",
    },
    carn: {String},
    files: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        filename: String,
        filelink: String,
        edate: Date,
        
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre(/find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  // this.populate({
  this.populate({
    path: "company",
    select: "a_name e_name",
    options: { _recursed: true },
  });
  next();
});
const setImageURL = (doc) => {
  if (doc.profileImg) {
    const imageUrl = `${process.env.BASE_URL}/users/${doc.image}`;
    doc.image = imageUrl;
  }
};
module.exports = mongoose.model("User", userSchema);
