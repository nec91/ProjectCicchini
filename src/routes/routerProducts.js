import { Router } from "express";
const productsRouter = Router();

import Container from "../container/container.js";
import Product from "../models/products.js";

const fileContent = new Container("products");

// Ruta para mostrar todos los productos
productsRouter.get("/", async (req, res) => {
  try {
    const products = await fileContent.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos." });
  }
});

// Ruta para mostrar producto filtrado por ID
productsRouter.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await fileContent.getById(id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto." });
  }
});

// Ruta para ingresar un producto
productsRouter.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnail } =
      req.body;
    const newProduct = new Product(
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      category
    );
    const newProductId = await fileContent.save(newProduct);

    res.status(201).json({
      message: "Producto ingresado correctamente.",
      product: { id: newProductId },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al ingresar el producto." });
  }
});

// Ruta para modificar un producto
productsRouter.put("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const existingProduct = await fileContent.getById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const updatedProductData = req.body;
    await fileContent.modifyById(id, updatedProductData);

    res.status(200).json({ message: "Producto modificado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al modificar el producto." });
  }
});

// Ruta para eliminar un producto por ID
productsRouter.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const existingProduct = await fileContent.getById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await fileContent.deleteById(id);
    res.status(200).json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
});

export { productsRouter };
