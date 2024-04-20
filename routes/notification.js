import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addNotification,
  deleteNotification,
  getNotification,
  updateNotification,
} from "../controller/notification.js";

const router = express.Router();

//add notification
router.post("/add", verifyToken, addNotification);

//get notification
router.get("/:id", getNotification);

//update notification
router.put("/:id", verifyToken, updateNotification);

//delete notification
router.delete("/:id", verifyToken, deleteNotification);
export default router;
