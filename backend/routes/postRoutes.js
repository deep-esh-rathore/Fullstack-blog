import express from "express";
const router = express.Router();
import {createPost, getAllPosts, getPostById, updatePost, deletePost} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;  
