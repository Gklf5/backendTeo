import Express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addProject,
  getProject,
  updateProject,
} from "../controller/project.js";

const router = Express.Router();

//create post
router.post("/add", verifyToken, addProject);

router.put("/update/:id", verifyToken, updateProject);

router.get("/get/:id", verifyToken, getProject);

export default router;
