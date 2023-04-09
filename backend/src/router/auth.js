import express from "express";
import AuthController from "../controllers/auth/AuthController.js";

let authRouter = express.Router();
let aInstance = new AuthController();

let authController = new AuthController();

authRouter.get("/", authController.getAuthUser);
authRouter.get('/login-user', authController.getLoginUser)
authRouter.post("/", aInstance.login);

export default authRouter;