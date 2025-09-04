import express from "express";
import upload from "../middleware/multer.js";
const router = express.Router();
import {createPost, getAllPosts, getPostById, updatePost, deletePost} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";



router.post("/",authMiddleware, upload.single("featuredImage"), createPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, upload.single("featuredImage"), updatePost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);


export default router;  
