import Express from "express";
import { signin, signup } from "../controller/authentication.js";

const router = Express.Router();

//create user
router.post("/signup", signup);

//sigin
router.post("/signin", signin);

export default router;
