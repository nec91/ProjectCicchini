import express from "express";
import handlebars from 'express-handlebars'
import { __dirname } from "../config/config.js";
import initializePassport from "../config/passport.config.js";

import cookieParser from "cookie-parser";
import passport from "passport";

import { cartRouter } from "../routes/carts.router.js";
import { productsRouter } from "../routes/products.router.js";
import { usersViewRouter } from "../routes/users.view.router.js";
import { sessionRouter } from "../routes/session.router.js";



const initApp = () => {
  const app = express();

  //Parse config
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Config HBS
  app.engine('handlebars', handlebars.engine());
  app.set('views', __dirname + '/views')
  app.set('view engine', 'handlebars');
  app.use(express.static(__dirname + '/public'));

  //Cookies
  app.use(cookieParser("CoderS3cr3tC0d3"))

  //Config Passport
  initializePassport()
  app.use(passport.initialize())

  //Routes
  app.use("/api/carts", cartRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/users", usersViewRouter);
  app.use("/api/sessions", sessionRouter);

  app.all("*", (req, res) => {
    res.status(404).send({
      Error: "Path no encontrado",
    });
  });

  return app;
};

export default initApp;
