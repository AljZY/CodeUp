const express = require("express");
const userController = express.Router();
const User = require("../models/userSchema");

userController.post("/signupUser", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username.length >= 20) {
      return res.status(400).json({ message: "Username maximum of 20 only" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Email already exists" });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()])[A-Za-z\d~!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password contains Capital and Lower alphabet, Numbers, Symbols, and minimum of 8 character",
      });
    }
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.json({ message: "Signup Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup Failed" });
  }
});

userController.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    req.session.user = user;
    req.session.userId = user._id;
    res.json({ message: "Login Successful", redirect: "/userHomepage" });
  } catch (err) {
    res.status(500).json({ message: "Login Failed" });
  }
});

userController.get("/logoutUser", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/userHomepage");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = userController;
