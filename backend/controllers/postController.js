import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, content, status, slug, featuredImage } = req.body;

  try {
    const post = new Post({
      title,
      content,
      status,
      slug,
      featuredImage,
      userId: req.user.id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!post) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
