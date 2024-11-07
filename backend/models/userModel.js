const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please enter Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    maxlength: [6, "Password cannot exist 6 characters"],
    select: false, //only accessible when using select() function
  },
  avatar: {
    type: String, //img file name
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//tasks to be performed before saving the user details
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//creating a token for a user and returning it
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//comparing the user-entered password and saved password.
userSchema.methods.isValidPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//create token for resetting a password.
userSchema.methods.getResetToken = function () {
  //generate token specifically to reset the password [not jwt ??]
  const token = crypto.randomBytes(20).toString("hex");

  //generate hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //set resetPasswordTokenExpire
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
