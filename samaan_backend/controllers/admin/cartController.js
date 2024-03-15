const CartModel = require("../../models/cart");
const ProductModel = require("../../models/product");
const UserModel = require("../../models/userModel");

const cartController = {
  getAllCarts: async (req, res, next) => {
    try {
      let carts = await CartModel.findAll({
        include: [
          {
            model: UserModel,
            attributes: ["name", "email"],
            required: true,
          },
          {
            model: ProductModel,
            attributes: [
              "productName",
              "productPrice",
              "productImage",
              "productWeight",
            ],
            required: true,
          },
        ],
      });
      carts = carts.map((cart) => cart.toJSON());
      res.render("layout/app", {
        title: "Carts",
        filename: "../carts/index",
        items: carts,
        route: "cart",
        admin:req.admins.admin,
      });
    } catch (error) {
      console.error("Error fetching all carts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  cartForm: async (req, res, next) => {
    try {
      const { cartId } = req.params;

      const cart = await CartModel.findOne({
        where: { cartId },
        include: [
          {
            model: UserModel,
            attributes: ["name", "email"],
            required: true,
          },
          {
            model: ProductModel,
            attributes: [
              "productName",
              "productPrice",
              "productImage",
              "productWeight",
            ],
            required: true,
          },
        ],
      });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.render("layout/app", {
        title: "Carts Details  :",
        filename: "../carts/form",
        data: cart.toJSON(),
        route: "cart",
        admin:req.admins.admin,
      });
    } catch (error) {
      console.error("Error fetching user cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateCartItem: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { quantity } = req.body;

      let cart = await CartModel.findOne({ where: { cartId } });

      cart.quantity = quantity;
      await cart.save();
      res.redirect("/admin/carts");

    } catch (error) {
      console.error("Error adding or updating cart item:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteCart: async (req, res, next) => {
    try {
      const { cartId } = req.params;

      const deletedCart = await CartModel.destroy({
        where: { cartId: cartId },
      });
      if (!deletedCart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.redirect("/admin/carts");
    } catch (error) {
      console.error("Error deleting user cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = cartController;
