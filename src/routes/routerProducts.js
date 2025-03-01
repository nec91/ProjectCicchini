import { Router } from "express";
const productsRouter = Router();
import  ProductController  from '../controller/products.controller.js'

// import Container from "../container/container.js";



// // Ruta para mostrar todos los productos
productsRouter.get("/",
  ProductController.getAllProducts
 );

// Ruta para mostrar producto filtrado por ID
productsRouter.get("/:pid", 
  ProductController.getProductById
);

// Ruta para ingresar un producto
productsRouter.post("/", 
  ProductController.saveProduct)

// Ruta para modificar un producto
productsRouter.put("/:pid", 
  ProductController.modifyProductById
);

// Ruta para eliminar un producto por ID
productsRouter.delete("/:pid",
  ProductController.deleteProductById
);

export { productsRouter };
