import Express from "express";
import {
  allEditor,
  deleteUser,
  getUser,
  subscribe,
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
router.get("/find/edi", allEditor);

//sub a emplyee
router.put("/sub/:id", verifyToken, subscribe);

//unsub a emplyee
router.put("/unsub/:id", verifyToken, unsubscribe);

export default router;
