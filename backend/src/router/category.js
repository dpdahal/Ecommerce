import express from "express";
import CategoryController from "../controllers/CategoryController.js";

const catInstance = new CategoryController();
const cRoute = express.Router();

cRoute.get("/", catInstance.index);
cRoute.post("/", catInstance.store);
cRoute.get("/:id", catInstance.show);
cRoute.put("/:id", catInstance.update);
cRoute.delete("/:id", catInstance.destroy);

export default cRoute;