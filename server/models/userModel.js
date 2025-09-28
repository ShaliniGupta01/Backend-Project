const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Statics signup function (use `this` so model reference is correct)
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exist!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// Statics login function
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
