import { CartModel } from "../models/cart.model.js";
import mongoose from "mongoose";

class CartRepository {
    constructor() {
        this.CartModel = CartModel; // Usamos this.cartModel de forma consistente
    }

    createCart = async () => {
        try {
            return await this.CartModel.create({ products: [] }); // Usamos this.cartModel
        } catch (error) {
            throw new Error(`Error en el repository (createCart): ${error.message}`);
        }
    }

    getCartById = async (cartId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                throw new Error("ID no válido de MongoDB");
            }
            return await this.CartModel.findById(cartId).populate("products.product")
        } catch (error) {
            throw new Error(`Error en el repository (getCartById): ${error.message}`);
        }
    }

    addProductToCart = async (cartId, productId, quantity = 1) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error("ID no válido de MongoDB");
            }

            const cart = await this.CartModel.findById(cartId);
            if (!cart) {
                return null;
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error en el repository (addProductToCart): ${error.message}`);
        }
    }

    removeProductFromCart = async (cartId, productId) => {
        try {
            const cart = await this.CartModel.findByIdAndUpdate(
                cartId,
                { $pull: { products: { product: productId } } },
                { new: true }
            );
            return cart;
        } catch (error) {
            throw new Error(`Error en el repository (removeProductFromCart): ${error.message}`);
        }
    }

    deleteCartById = async (_id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error("ID no válido de MongoDB");
            }
            const deletedCart = await this.CartModel.findById(_id);
            if (!deletedCart) {
                return null;
            }
            await this.CartModel.findByIdAndDelete(_id);
            return deletedCart;
        } catch (error) {
            throw new Error(`Error en el repository (deleteCartById): ${error.message}`);
        }
    }

    updateCartProducts = async (cartId, products) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                throw new Error("ID no válido de MongoDB");
            }

            const updatedCart = await this.CartModel.findByIdAndUpdate(
                cartId,
                { products },
                { new: true }
            );

            if (!updatedCart) {
                throw new Error("Carrito no encontrado");
            }

            return updatedCart;
        } catch (error) {
            throw new Error(`Error en el repository (updateCartProducts): ${error.message}`);
        }
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error("ID no válido de MongoDB");
            }

            const cart = await this.CartModel.findById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error("Producto no encontrado en el carrito");
            }

            cart.products[productIndex].quantity = quantity;
            await cart.save();

            return cart;
        } catch (error) {
            throw new Error(`Error en el repository (updateProductQuantity): ${error.message}`);
        }
    };
}



export { CartRepository };