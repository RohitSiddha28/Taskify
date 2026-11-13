const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//SIGNUP
const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }
    const existingName = await User.findOne({ username });
    if (existingName) {
      return res.status(409).json({ message: "Username already taken!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
    });
    await user.save();
    const { password: _, ...others } = user._doc;
    res.status(201).json({ message: "SignUp Successful!", user: others });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Please Sign Up first!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }
    const { password: _, ...others } = user._doc;
    res.status(200).json({ message: "Login Successful!", user: others });
  } catch (err) {
    res.status(500).json({ message: "Something is wrong, try again!" });
  }
};

module.exports = { registerUser, loginUser };
