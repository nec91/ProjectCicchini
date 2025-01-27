import { Router } from "express";
const cartRouter = Router();

import Container from "../container/container.js";
import Cart from "../models/cart.js";

const fileContent = new Container("carts");
const productFile = new Container("products");

// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
  try {
    const cart = new Cart();
    const newCart = await fileContent.save(cart);
    res.status(201).json({
      message: "Carrito creado con éxito.",
      carrito: newCart,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito." });
  }
});

// Eliminar un carrito por su ID
cartRouter.delete("/:id/", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cart = await fileContent.getById(id);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    await fileContent.deleteById(id);
    res.status(200).json({ message: "Carrito eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el carrito." });
  }
});

// Obtener productos de un carrito
cartRouter.get("/:id/products", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cart = await fileContent.getById(id);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    if (!cart.products || cart.products.length === 0) {
      return res.status(400).json({ error: "El carrito no contiene productos." });
    }

    res.status(200).json({ id: cart.id, productos: cart.products });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos del carrito." });
  }
});

// Agregar un producto al carrito
cartRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cart_id = parseInt(req.params.cid); 
    const product_id = parseInt(req.params.pid); 
    const cart = await fileContent.getById(cart_id); 
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    const product = await productFile.getById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    let productInCart = cart.products.find((item) => item.id === product_id);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      productInCart = { id: product_id, quantity: 1 };
      cart.products.push(productInCart);
    }

    await fileContent.modifyById(cart_id, cart);

    res.status(201).json({
      message: "Producto agregado al carrito correctamente.",
      carrito: cart, 
    });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito." });
  }
});

// Eliminar un producto de un carrito
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart_id = parseInt(req.params.cid); 
    const product_id = parseInt(req.params.pid); 

    const cart = await fileContent.getById(cart_id);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado." });
    }

    let productInCart = cart.products.find((item) => item.id === product_id);
    if (!productInCart) {
      return res.status(404).json({ error: "Producto no encontrado en el carrito." });
    }
    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
    } else {
      cart.products = cart.products.filter((item) => item.id !== product_id);
    }
    await fileContent.modifyById(cart_id, cart);
    res.status(200).json({
      message: "Unidad del producto eliminada correctamente del carrito.",
      carrito: cart,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la unidad del producto del carrito." });
  }
});


  export {cartRouter}