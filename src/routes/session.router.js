import { Router } from 'express';
import passport from 'passport';
import { userModel } from '../models/users.model.js'
import { isValidPassword, generateJWToken } from '../utils/utils.js';

const sessionRouter = Router();


sessionRouter.post("/register",
    passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });

sessionRouter.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});


sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
        if (!isValidPassword(user, password)) {
            console.warn("Credenciales usuarias para el usuario: " + email);
            return res.status(401).send({ status: "error", error: "Credenciales invalidas!!!" });
        }
        // Generar un Obj para el JWT - DTO (no agregamos data sencible)
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
            isAdmin: user.role === "admin"
        }
        // genramos el JWT
        const access_token = generateJWToken(tokenUser)
        console.log("access_token", access_token);

        //2do con Cookie
        res.cookie("jwtCookieToken", access_token, {
            maxAge: 60000,
            httpOnly: true,
        })
        res.send({ message: "Usuario loggeado correctamente" })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }
})


sessionRouter.get("/logout", (req, res) => {
    res.clearCookie("jwtCookieToken");
    res.redirect("/users/login");
});



export { sessionRouter }