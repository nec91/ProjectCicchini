import { Router } from "express";
import { passportAuthenticate } from "../middlewares/passportAuth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import { usersViewsController } from "../controller/users.views.controller.js";

const usersViewRouter = Router();

// Vista login
usersViewRouter.get("/login", usersViewsController.renderLogin);

// Vista register
usersViewRouter.get("/register", usersViewsController.renderRegister);

// Perfil del usuario (requiere autenticación)
usersViewRouter.get(
  "/",
  passportAuthenticate("current"),
  usersViewsController.renderProfile
);

// Dashboard del admin (requiere autenticación + rol admin)
usersViewRouter.get(
  "/dashboard-admin",
  passportAuthenticate("current"),
  authorize("admin"),
  usersViewsController.renderAdminDashboard
);

export { usersViewRouter };