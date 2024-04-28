import Express from "express";
import {
  addSocials,
  assignEditor,
  deleteSocials,
  deleteUser,
  getAllCreators,
  getAllEditors,
  getAllSocials,
  getAssignedBy,
  getEditors,
  getUser,
  requestAccept,
  requestDelete,
  requestPost,
  requestReject,
  unAssignEditor,
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

//get editors for a user
router.get("/find/editors/:id", verifyToken, getEditors);

//get assigned by
router.get("/find/assigned/:id", verifyToken, getAssignedBy);

//assign a editor
router.put("/assign/:id", verifyToken, assignEditor);

//unAssign a editor
router.put("/unassign/:id", verifyToken, unAssignEditor);

//get all user with editor
router.get("/editors", getAllEditors);

//get all user with editor
router.get("/creators", getAllCreators);

router.put("/request", verifyToken, requestPost);
router.put("/request/reject", verifyToken, requestReject);
router.put("/request/accept", verifyToken, requestAccept);
router.put("/request/delete", verifyToken, requestDelete);
router.put("/socials/add", verifyToken, addSocials);
router.delete("/socials/delete/:id", verifyToken, deleteSocials);
router.get("/find/socials/:id", verifyToken, getAllSocials);
export default router;
