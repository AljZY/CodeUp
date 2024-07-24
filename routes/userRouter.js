const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { authMiddlewareUser } = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");
const Post = require("../models/postSchema");

userRouter.get("/loginUser", (req, res) => {
  res.json({ message: "Login User Endpoint" });
});

userRouter.get("/signupUser", (req, res) => {
  res.json({ message: "Signup User Endpoint" });
});

userRouter.get("/userHomepage", authMiddlewareUser, async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const posts = await Post.find()
      .populate("likedByUsers", "username")
      .populate("likedByPosers", "poserName")
      .sort({ createdAt: -1 });
    res.json({
      message: "UserHomepage User Endpoint",
      posts,
      userId: req.session.userId,
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error Fetch" });
  }
});

userRouter.use(postController);
userRouter.use(userController);

module.exports = userRouter;
