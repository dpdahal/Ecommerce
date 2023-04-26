import express from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import cRoute from "./category.js";
import pRouter from "./product.js";

let webRouter = express.Router();


webRouter.get("/", (req, res) => {
    res.send("Hello World");
});
/*
===================Register All Routes===================
 */

webRouter.use("/auth", authRouter);
webRouter.use("/user", userRouter);
webRouter.use("/category", cRoute);
webRouter.use("/product", pRouter);

export default webRouter;
