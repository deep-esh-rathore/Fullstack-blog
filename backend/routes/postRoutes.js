import express from "express";
const router = express.Router();
import {createPost, getAllPosts, getPostById, updatePost, deletePost} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";



router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);



export default router;  
