const User = require("../models/userModel");
const createToken = require("../utils/token");

const loginUser = async (req, res) => {
  // debug request body
  console.log("Login request body:", req.body);

  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  // debug request body
  console.log("Signup request body:", req.body);

  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (err) {
    // log mongoose validation error for debugging
    console.error("Signup error:", err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};


