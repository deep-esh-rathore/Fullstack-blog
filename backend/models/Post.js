// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
