import express from "express";

import ProductController from "../controllers/ProductController.js";
import Uploads from "../middleware/Upload.js";

let uploadInstance = new Uploads();
let upload = uploadInstance.fileUpload('uploads/products');

let pInstance = new ProductController();

let pRouter = express.Router();


pRouter.get("/", pInstance.index);
pRouter.get("/:id", pInstance.show);
pRouter.post("/", upload.array('images', 100), pInstance.store);
pRouter.get("/paginate/:page", pInstance.paginate);

export default pRouter;