const express = require("express");
const postController = express.Router();
const User = require("../models/userSchema");
const Post = require("../models/postSchema");
const Poser = require("../models/poserSchema");
const upload = require("../middleware/uploadMiddleware");

postController.post(
  "/poserHomepage",
  upload.single("poserImage"),
  async (req, res) => {
    const { poserPost } = req.body;
    const poserImage = req.file ? req.file.filename : null;
    const poserId = req.session.poserId;
    try {
      const poser = await Poser.findById(poserId);
      if (!poser) {
        return res.status(404).send("Admin not found");
      }
      const newPost = new Post({
        poserPost,
        poserImage,
        poserName: poser.poserName,
        poserId: poser._id,
      });
      await newPost.save();
      res.redirect("/poserHomepage");
    } catch (err) {
      res.status(500).send("Error saving post");
    }
  }
);

postController.post("/toggleLike/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, poserId } = req.session;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send("Post not found");
    let likedByCurrentUser = false;
    if (userId && !post.likedByUsers.includes(userId)) {
      post.likes += 1;
      post.likedByUsers.push(userId);
      likedByCurrentUser = true;
    } else if (userId && post.likedByUsers.includes(userId)) {
      post.likes -= 1;
      post.likedByUsers = post.likedByUsers.filter(
        (id) => id.toString() !== userId
      );
    } else if (poserId && !post.likedByPosers.includes(poserId)) {
      post.likes += 1;
      post.likedByPosers.push(poserId);
      likedByCurrentUser = true;
    } else if (poserId && post.likedByPosers.includes(poserId)) {
      post.likes -= 1;
      post.likedByPosers = post.likedByPosers.filter(
        (id) => id.toString() !== poserId
      );
    }
    await post.save();
    const updatedPost = await Post.findById(postId)
      .populate("likedByUsers", "username")
      .populate("likedByPosers", "poserName");

    res.json(updatedPost);
  } catch (err) {
    res.status(500).send("Error toggling like");
  }
});

postController.post("/addComment/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.userId;
    const poserId = req.session.poserId;
    const { commentText } = req.body;
    if (!commentText) {
      throw new Error("Comment text is required");
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const commenterId = userId || poserId;
    const commenterType = userId ? "User" : "Poser";
    const commenterName = userId
      ? (await User.findById(userId)).username
      : (await Poser.findById(poserId)).poserName;
    if (!commenterName) {
      throw new Error("Commenter name not found");
    }
    const newComment = {
      commenterId,
      commenterType,
      commentText,
      commenterName,
    };
    post.comments.push(newComment);
    await post.save();
    res.json(newComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Error adding comment" });
  }
});

module.exports = postController;
