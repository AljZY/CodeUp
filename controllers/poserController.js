const express = require("express");
const poserController = express.Router();
const Poser = require("../models/poserSchema");

poserController.post("/signupPoser", async (req, res) => {
  try {
    const { poserName, poserEmail, poserPassword } = req.body;
    if (poserName.length >= 20) {
      return res.status(400).json({ message: "Username maximum of 20 only" });
    }
    const existingPoser = await Poser.findOne({ poserEmail });
    if (existingPoser) {
      return res.status(400).json({ message: "Poser Email already exists" });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()])[A-Za-z\d~!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(poserPassword)) {
      return res.status(400).json({
        message:
          "Password contains Capital and Lower alphabet, Numbers, Symbols, and minimum of 8 character",
      });
    }
    const newPoser = new Poser({
      poserName,
      poserEmail,
      poserPassword,
    });
    await newPoser.save();
    res.json({ message: "Signup Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup Failed" });
  }
});

poserController.post("/loginPoser", async (req, res) => {
  try {
    const { poserEmail, poserPassword } = req.body;
    const poser = await Poser.findOne({ poserEmail });
    if (!poser) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    if (poserPassword !== poser.poserPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    req.session.poser = poser;
    req.session.poserId = poser._id;
    res.json({ message: "Login Successful", redirect: "/poserHomepage" });
  } catch (err) {
    res.status(500).json({ message: "Login Failed" });
  }
});

poserController.get("/logoutPoser", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/poserHomepage");
    }
    res.clearCookie("connect.sid");
    res.redirect("/loginPoser");
  });
});

module.exports = poserController;
