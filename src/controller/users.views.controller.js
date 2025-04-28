import { ProductService } from "../services/products.services.js"; 

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
}

export const usersViewsController = new UsersViewsController();
