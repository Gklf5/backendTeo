import Express from "express";
import { verifyToken } from "../verifyToken.js";
import { addYoutube } from "../controller/youtube.js";

const router = Express.Router();

//create post
router.post("/", verifyToken, addYoutube);
// router.put("/:id", verifyToken, updatePost);
// router.delete("/:id", verifyToken, deletePost);
// router.get("/find/:id", getPost);

export default router;
