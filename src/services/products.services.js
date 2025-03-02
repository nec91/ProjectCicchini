import { ProductRepository } from "../repositories/products.repository.js";


class ProductService {
    constructor() {
        this.ProductRepository = new ProductRepository()
    }

    createProduct = async ({ title, description, code, price, stock, category, thumbnail }) => {
        try {
            return await this.ProductRepository.createProduct({
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
            });
        } catch (error) {
            throw new Error(`Error en el servicio (createProduct): ${error.message}`);
        }
    }
    getAllProducts = async (query, options) => {
        try {
            return await this.ProductRepository.getAllProducts(query, options)
        } catch (error) {
            throw new Error(`Error en el servicio (getAllProducts): ${error.message}`);
        }
    }
    getProductById = async (id) => {
        try {
            return await this.ProductRepository.getProductById(id)
        } catch (error) {
            throw new Error(`Error en el servicio (getProductById): ${error.message}`);
        }
    }

    modifyProductById = async (id, updateData) => {
        try {
            const updatedProduct = await this.ProductRepository.modifyProductById(id, updateData);
            if (!updatedProduct) {
              throw new Error("Producto no encontrado en la base de datos");
            }
            return updatedProduct;
          } catch (error) {
            throw new Error(`Error en el servicio (modifyProductById): ${error.message}`);
          }
    }

    deleteProductById = async (id) => {
        try {
            return await this.ProductRepository.deleteProductById(id)
        } catch (error) {
            throw new Error(`Error en el servicio (deleteProductById): ${error.message}`);
        }
    }
}

export { ProductService }