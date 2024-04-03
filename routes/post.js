import Express from "express";
import { verifyToken } from "../verifyToken.js";
import { addPost } from "../controller/post.js";

const router = Express.Router();

//create post
router.post("/", verifyToken, addPost);
// router.put("/:id", verifyToken, updatePost);
// router.delete("/:id", verifyToken, deletePost);
// router.get("/find/:id", getPost);

export default router;
