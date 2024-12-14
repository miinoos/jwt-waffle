const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" }); //signing the token with id and a secret
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password); //passing the details to the static function which is created in model.
    const token = createToken(user._id); //creating a token with the userid
    console.log(token);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message }); //catching an error i.e. like "email not found or incorrect password"
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password); //passing the details to the static function which is created in model.
    const token = createToken(user._id); //creating a token with the userid
    // console.log(token);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message }); //catching an error i.e. like "email already in user"
  }
};

module.exports = { signupUser, loginUser };
