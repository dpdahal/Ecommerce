import express from "express";
import UserController from "../controllers/UserController.js";
import Uploads from "../middleware/Upload.js";

let userRouter = express.Router();
let uploadInstance = new Uploads();
let upload = uploadInstance.fileUpload('uploads/users');

let userInstance = new UserController();

userRouter.get("/", userInstance.index);
userRouter.post("/", upload.single('image'), userInstance.store);

export default userRouter;