import Express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addYoutube,
  deleteYTPost,
  getAllYoutubePost,
  getYTPost,
  updateYTPost,
} from "../controller/youtube.js";
import { getToken, uploadYTVideo } from "../youtube/youtubeUploader.js";

const router = Express.Router();

//create post
router.post("/", verifyToken, addYoutube);
router.get("/get/:id", getAllYoutubePost);
router.put("/:id", verifyToken, updateYTPost);
router.delete("/:id", verifyToken, deleteYTPost);
router.get("/find/:id", getYTPost);
// router.post("/upload/:id", verifyToken, uploadYTPost);
router.put("/upload/token/:id", getToken);
router.post("/upload/:id", verifyToken, uploadYTVideo);
// router.get("/upload/:code", getToken);

export default router;
