import { Router } from "express";
  import UserController from "../controllers/UserController";
  import { checkJwt } from "../middleware/checkJwt";
  import { checkRole } from "../middleware/checkRole";

  const router = Router();

  //Get all users
  router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

  // Get one user
  router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById
  );

  //Create a new user
  router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
  );
  export default router;
