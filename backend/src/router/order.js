import express from "express";
import OrderController from "../controllers/OrderController.js";

let orderRouter = express.Router();
let orderInstance = new OrderController();

orderRouter.get("/", orderInstance.index);
orderRouter.post("/", orderInstance.store);
orderRouter.get("/:id", orderInstance.show);
orderRouter.post("/confirm", orderInstance.confirm_order);
export default orderRouter;