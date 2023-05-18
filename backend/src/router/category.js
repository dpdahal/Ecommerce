import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import RouteMiddleware from "../middleware/RouteMiddleware.js";

const catInstance = new CategoryController();
const cRoute = express.Router();

cRoute.get("/", catInstance.index);
cRoute.post("/", RouteMiddleware, catInstance.store);
cRoute.get("/:id", catInstance.show);
cRoute.put("/:id", RouteMiddleware, catInstance.update);
cRoute.delete("/:id", RouteMiddleware, catInstance.destroy);

export default cRoute;