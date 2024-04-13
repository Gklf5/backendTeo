import Express from "express";
import {
  allEditor,
  assignEditor,
  deleteUser,
  getAssignedBy,
  getEditors,
  getUser,
  subscribe,
  unAssignEditor,
  unsubscribe,
  updateUser,
} from "../controller/User.js";
import { verifyToken } from "../verifyToken.js";

const router = Express.Router();

//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//get all editor
router.get("/find/editors", getEditors);

//get assigned by
router.get("find/assigned", verifyToken, getAssignedBy)

//assign a editor 
router.put("/asssign/:id", verifyToken, assignEditor);

//unAssign a editor
router.put("/unassign/:id", verifyToken, unAssignEditor);

export default router;
