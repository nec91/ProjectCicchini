import express from "express";
import { cartRouter } from "../routes/routerCart.js";
import { productsRouter } from "../routes/routerProducts.js";

const initApp = () => {
  const app = express();

  //Parse config
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Routes
  app.use("/api/carts", cartRouter);
  app.use("/api/products", productsRouter);

  app.all("*", (req, res) => {
    res.status(404).send({
      Error: "Path no encontrado",
    });
  });

  return app;
};

export default initApp;
