import { ProductService } from "../services/products.services.js"; 
import { TicketService } from "../services/ticket.services.js";
import { CartService } from "../services/carts.services.js";

const cartService = new CartService();
const ticketService = new TicketService();
const productsService = new ProductService(); 

class UsersViewsController {
  constructor() {}

  renderLogin = async (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      console.error("Error renderizando login:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar login" });
    }
  };

  renderRegister = async (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      console.error("Error renderizando register:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar register" });
    }
  };

  renderProfile = async (req, res) => {
    try {
      res.render("profile", {
        user: req.user,
      });
    } catch (error) {
      console.error("Error renderizando profile:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar perfil" });
    }
  };

  renderAdminDashboard = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { products, pagination } = await productsService.getAllProducts({}, { page, limit });

      res.render("admin", {
        user: req.user,
        products,
        pagination,
      });
    } catch (error) {
      console.error("Error renderizando dashboard admin:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar dashboard admin" });
    }
  };

  renderProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
  
      const { products, pagination } = await productsService.getAllProducts({}, { page, limit });
  
      res.render("products", {
        user: req.user,
        products,
        pagination,
      });
    } catch (error) {
      console.error("Error renderizando productos:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar productos" });
    }
  };

  renderTickets = async (req, res) => {
    try {
      const tickets = await ticketService.getTicketsByPurchaser(req.user.email);
  
      res.render("tickets", {
        user: req.user,
        tickets,
      });
    } catch (error) {
      console.error("Error renderizando historial de tickets:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar historial de tickets" });
    }
  };

  renderCart = async (req, res) => {
    try {
      const cartId = req.user.cart;
        if (!cartId) {
        return res.status(400).send({ status: "error", message: "El usuario no tiene un carrito asignado." });
      }
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
        return res.status(404).send({ status: "error", message: "Carrito no encontrado." });
      }
        const cartTotal = Array.isArray(cart.products)
        ? cart.products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
        : 0;
        res.render("cart", {
        user: req.user,
        cart,
        cartTotal,
      });
    } catch (error) {
      console.error("Error renderizando carrito:", error);
      res.status(500).send({ status: "error", message: "Error al renderizar carrito." });
    }
  };
}

export const usersViewsController = new UsersViewsController();
