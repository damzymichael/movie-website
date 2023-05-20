const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "5d" });
};

//create user
const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.signup(username, password);
    //create token
    const token = createToken(user._id);
    res
      .status(200)
      .json({
        message: "User Created Succsesfully",
        username,
        token,
      });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
};

//log user in
const signUserIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    //create token
    const token = createToken(user._id);
    res.status(200).json({
      message: "Login successful",
      username,
      token,
    });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
};

module.exports = {createUser, signUserIn}