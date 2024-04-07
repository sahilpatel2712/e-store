const CartModel = require("../models/cart");

const cartController = {
  addOrUpdateCartItem: async (req, res, next) => {
    try {
      const { userId, productId, quantity } = req.body.data;

      let cart = await CartModel.findOne({ where: { userId, productId } });
      if (!cart) {
        cart = await CartModel.create({ userId, productId, quantity });
        return res
          .status(201)
          .json({ cart, responseMessage: "Item added in cart" });
      }
      if (cart.quantity + quantity === 0) {
        await CartModel.destroy({ where: { cartId: cart.cartId } });
        return res
          .status(200)
          .json({ responseMessage: "Item deleted from cart successfully" });
      }

      cart.quantity += quantity;
      await cart.save();
      let carts = await CartModel.findAll({ where: { userId } });
      res.status(200).json({ carts, responseMessage: "Cart updated" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllCarts: async (req, res, next) => {
    try {
      const carts = await CartModel.findAll();
      res.status(200).json(carts);
    } catch (error) {
      console.error("Error fetching all carts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUserCart: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const cart = await CartModel.findAll({ where: { userId } });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error("Error fetching user cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteCartByCartId: async (req, res, next) => {
    try {
      req.body.map(async (cart) => {
        await CartModel.destroy({
          where: { cartId: cart.cartId },
        });
      });

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting user cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = cartController;
