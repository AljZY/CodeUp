const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  commenterType: {
    type: String,
    enum: ["User", "Poser"],
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  commenterName: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema(
  {
    poserPost: {
      type: String,
      required: true,
    },
    poserImage: {
      type: String,
      required: true,
    },
    poserName: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedByUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likedByPosers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poser",
      },
    ],
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
