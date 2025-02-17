import { Router } from "express";
import {
  createUserHandler,
  getUserHandler,
} from "../../../feautres/user/infrastructure/presentation/usersController";

export const registerUserRoutes = (router: Router) => {
  router.get("/users/:email", getUserHandler);
  router.post("/users", createUserHandler);
};
