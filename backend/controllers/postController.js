import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js"
import streamifier from 'streamifier';

export const createPost = async (req, res) => {
  try {
    const { title, slug, content, status } = req.body;
    let imageURL = null;
    let imagePublicId = null;

    if (!title || !slug || !content || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized - user not found' });
    }

    // handle file upload to Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "mern_blog",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        // pipe buffer into Cloudinary
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageURL = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const post = new Post({
      title,
      slug,
      content,
      status,
      featuredImage: imageURL,
      publicId: imagePublicId,
      author: req.user.name, // Ensure author is set from authenticated user
      userId: req.user._id, // Ensure userId is set from authenticated user
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Server Error' });
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
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  try {
    let post = await Post.findOne({ _id: req.params.id, userId: req.user._id });

    if (!post) {
      return res.status(404).json({ message: "Not found or unauthorized" });
    }

    const { title, slug, content, status } = req.body;

    // Start with existing values
    let updateData = {
      title: title || post.title,
      slug: slug || post.slug,
      content: content || post.content,
      status: status && status !== "undefined" ? status : post.status,
    };

    // If a new file is uploaded → replace old Cloudinary image
    if (req.file) {
      // delete old image if it exists
      if (post.publicId) {
        await cloudinary.uploader.destroy(post.publicId);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "mern_blog" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      updateData.featuredImage = uploadResult.secure_url;
      updateData.publicId = uploadResult.public_id;
    }

    post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json(post);
  } catch (err) {
    console.error("Update Post Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!post) {
      return res.status(404).json({ message: "Not found or unauthorized" });
    }
    // If post has an image, delete it from Cloudinary
    if (post.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }
    // Delete post from MongoDB
    await Post.deleteOne({ _id: req.params.id });

    res.json({ message: "Post and associated image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
