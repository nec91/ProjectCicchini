import { ProductService } from "../services/products.services.js"

class ProductController {
  #productService
  constructor() {
    this.#productService = new ProductService()
  }

  saveProduct = async (req, res, next) => {
    try {
      const { title, description, code, price, stock, category, thumbnail } = req.body
      const productCreated = await this.#productService.saveProduct({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail,
      })
      res.send({
        message: 'Product created',
        product_id: productCreated._id,
      })
    } catch (error) {
      next(res.status(400).json({ error: "Error al ingresar el producto." }))
    }
  }
  getAllProducts = async (req, res, next) => {
    try {
      const { query, options } = res.paginatedResults;
      const result = await this.#productService.getAllProducts(query, options);

      res.status(200).json({
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${options.limit}` : null,
        nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${options.limit}` : null
      });
    } catch (error) {
      next(res.status(400).json({ error: "Error al obtener los productos." }));
    }
  };

  getProductById = async (req, res, next) => {
    try {
      const id = req.params.pid
      const product = await this.#productService.getProductById(id)
      if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      next(res.status(400).json({ error: "Error al buscar el producto." }));
    }
  }

  modifyProductById = async (req, res,netx) => {
    try {
      //const { pid } = req.params
      const id = req.params.pid
      const updateData = req.body

      const updatedProduct = await this.#productService.modifyProductById(id, updateData)
      res.status(200).json({
        message: "Producto actualizado exitosamente",
        product: updatedProduct,
      });
    } catch (error) {
      netx(res.status(400).json({ error: error.message }))
    }
  }

  deleteProductById = async (req, res, next) => {
    try {
      const id = req.params.pid
      const deletedProduct = await this.#productService.deleteProductById(id)
      if (!deletedProduct) {
        res.status(404).json({ error: "Producto no encontrado" });
      } else {
        res.status(200).json({
          message: "Producto eliminado correctamente",
          product: deletedProduct,
        });
      }
    } catch (error) {
      next(res.status(400).json({ error: "Error al buscar el producto." }));
    }
  }
}



export default new ProductController