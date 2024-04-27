import Express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addSociaMedia,
  removeSocialMedia,
  updateSocialMedia,
} from "../controller/socialmedia.js";

const router = Express.Router();

//add social media
router.post("/add", verifyToken, addSociaMedia);

//delete social media
router.delete("/:id", verifyToken, removeSocialMedia);

//update socila media
router.put("/:id", verifyToken, updateSocialMedia);

export default router;
