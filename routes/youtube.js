import Express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addYoutube,
  deleteYTPost,
  getYTPost,
  updateYTPost,
  uploadYTPost,
} from "../controller/youtube.js";

const router = Express.Router();

//create post
router.post("/", verifyToken, addYoutube);
router.put("/:id", verifyToken, updateYTPost);
router.delete("/:id", verifyToken, deleteYTPost);
router.get("/find/:id", getYTPost);
router.post("/upload/:id", verifyToken, uploadYTPost);

export default router;
