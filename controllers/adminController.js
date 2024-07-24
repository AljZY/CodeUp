const fs = require("fs");
const path = require("path");
const User = require("../models/userSchema");
const Poser = require("../models/poserSchema");
const Post = require("../models/postSchema");

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
};

const fetchAllPosers = async (req, res) => {
  try {
    const posers = await Poser.find();
    res.json(posers);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
};

const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
};

const deletePoser = async (req, res) => {
  try {
    await Poser.findByIdAndDelete(req.params.id);
    res.json({ message: "Poser deleted successfully" });
  } catch (error) {
    res.status(500).send("Error deleting poser");
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const imagePath = path.join(
        __dirname,
        "../uploads/posts/",
        post.poserImage
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.poserPost = req.body.poserPost;
    if (req.file) {
      post.poserImage = req.file.filename;
    }
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.send("Error updating post");
  }
};

module.exports = {
  fetchAllUsers,
  deleteUser,
  fetchAllPosers,
  deletePoser,
  fetchAllPosts,
  deletePost,
  editPost,
};
