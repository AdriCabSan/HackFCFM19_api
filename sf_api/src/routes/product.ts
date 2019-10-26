import { Router } from "express";
import ProductController from "../controllers/ProductController";

const router = Router();
//Get all Products
router.get("/", ProductController.listAll);

// Get one Product
router.get(
  "/:id([0-9]+)",
  ProductController.getOneById
);

//Create a new Product
router.post("/", ProductController.newProduct);

//Edit one Product
router.patch(
  "/:id([0-9]+)",
  ProductController.editProduct
);

  export default router;
