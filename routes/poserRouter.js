const express = require("express");
const poserRouter = express.Router();
const poserController = require("../controllers/poserController");
const { authMiddlewarePoser } = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");
const Post = require("../models/postSchema");

poserRouter.get("/loginPoser", (req, res) => {
  res.json({ message: "Login Poser Endpoint" });
});

poserRouter.get("/signupPoser", (req, res) => {
  res.json({ message: "Signup Poser Endpoint" });
});

poserRouter.get("/poserHomepage", authMiddlewarePoser, async (req, res) => {
  if (!req.session.poserId)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const posts = await Post.find()
      .populate("likedByUsers", "username")
      .populate("likedByPosers", "poserName")
      .sort({ createdAt: -1 });
    res.json({
      message: "poserHomepage Poser Endpoint",
      posts,
      poserId: req.session.poserId,
      poser: req.poser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error Fetch" });
  }
});

poserRouter.use(postController);
poserRouter.use(poserController);

module.exports = poserRouter;
