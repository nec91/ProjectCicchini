import { CartService } from "../services/carts.services.js"

class CartController {
    #CartService
    constructor() {
        this.#CartService = new CartService()
    }

    createCart = async (req, res, next) => {
        try {
            const newCart = await this.#CartService.createCart();
            res.status(201).json({
                message: "Carrito creado con éxito.",
                carrito: newCart,
            })
        } catch (error) {
            next(res.status(400).json({ error: "Error al crear el carrito." }))
        }
    }

    getCartById = async (req, res, next) => {
        try {
            const cart = await this.#CartService.getCartById(req.params.cid);
            res.status(200).json({ cart_id: cart.id, productos: cart.products });
        } catch (error) {
            next(res.status(400).json({ error: "Error al obtener productos del carrito." }));
        }
    }
    addProductToCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await this.#CartService.addProductToCart(cid, pid, quantity);
            res.status(201).json({
                message: "Producto agregado al carrito correctamente.",
                carrito: updatedCart,
            });
        } catch (error) {
            next(res.status(400).json({ error: "Error al agregar el producto al carrito." }))
        }
    }

    removeProductFromCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await this.#CartService.removeProductFromCart(cid, pid);
            res.status(200).json({
                message: "Unidad del producto eliminada correctamente del carrito.",
                carrito: updatedCart,
            });
        } catch (error) {
            next(res.status(400).json({ error: "Error al eliminar la unidad del producto del carrito." }))
        }
    }

    deleteCartById = async (req, res, next) => {
        try {
            const id = req.params.cid
            const deletedCart = await this.#CartService.deleteCartById(id)
            if (!deletedCart) {
                res.status(404).json({ error: "Carrito no encontrado" });
            } else {
                res.status(200).json({
                    message: "Carrito eliminado correctamente",
                    carrito: deletedCart,
                });
            }
        } catch (error) {
            next(res.status(500).json({ error: "Error al buscar el carrito." }));
        }
    }

    updateCartProducts = async (req, res) => {
        try {
            const updatedCart = await this.#CartService.updateCartProducts(req.params.cid, req.body.products);

            res.status(200).json({
                message: "Productos del carrito actualizados correctamente",
                cart: updatedCart
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateProductQuantity = async (req, res) => {
        try {
            const { quantity } = req.body;

            if (!quantity || quantity < 1) {
                return res.status(400).json({ error: "La cantidad debe ser mayor a 0" });
            }

            const updatedCart = await this.#CartService.updateProductQuantity(req.params.cid, req.params.pid, quantity);

            res.status(200).json({
                message: "Cantidad del producto actualizada correctamente",
                cart: updatedCart
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

}

export default new CartController










