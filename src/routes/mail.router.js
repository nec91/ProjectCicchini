import { Router } from "express";
import mailController from "../controller/mail.controller.js";

const mailRouter = Router();

// Ruta de prueba: enviar mail manual
mailRouter.post("/send-test", mailController.sendTestMail);

export { mailRouter };
