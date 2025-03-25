import { Router } from "express";
import { passportCall, authorization } from '../utils/utils.js';


const usersViewRouter = Router();



usersViewRouter.get("/login", (req, res) => {
    res.render("login");
});

usersViewRouter.get("/register", (req, res) => {
    res.render("register");
});


// Perfil de User
usersViewRouter.get("/",
    passportCall('jwt'),
    (req, res) => {
        res.render("profile", {
            user: req.user 
        });
    });


// Perfil del ADMIN
usersViewRouter.get("/dashboard-admin",
    passportCall('jwt'),
    authorization("admin"),
    (req, res) => {
        res.render("admin", {
            user: req.user 
        });
    });


export { usersViewRouter }