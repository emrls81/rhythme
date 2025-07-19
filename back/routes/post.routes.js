import express from "express";
import { createPostController, deletePostController, getPostController, getTimelinePostsController, likeAndUnlikePostController, updatePostController } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create-post", createPostController);
router.put("/update-post/:id", updatePostController);
router.delete("/delete-post/:id/:userId", deletePostController);
router.put("/like-post/:id", likeAndUnlikePostController);
router.get("/get-post/:id", getPostController);
router.get("/get-timeline-posts/:userId", getTimelinePostsController);

export default router;