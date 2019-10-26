import { Router } from "express";
import ContainerController from "../controllers/ContainerController";
const router = Router();
//Get all Containers
router.get("/", ContainerController.listAll);

// Get one Container
router.get(
  "/:id([0-9]+)",
  ContainerController.getOneById
);

//Create a new Container
router.post("/", ContainerController.newContainer);

//Edit one Container
router.patch(
  "/:id([0-9]+)",
  ContainerController.editContainer
);
export default router;
