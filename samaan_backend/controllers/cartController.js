const CartModel = require("../models/cart");

const cartController = {
  addOrUpdateCartItem: async (req, res, next) => {
    try {
      const { userId,productId, quantity } = req.body;

      let cart = await CartModel.findOne({ where: { userId,productId } });
      if (!cart) {
        cart = await CartModel.create({ userId, productId,quantity });
        return res.status(201).json(cart);
      }

      cart.quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error adding or updating cart item:", error);
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

      const cart = await CartModel.findOne({ where: { userId } });
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
      const { cartId } = req.params;

      const deletedCart = await CartModel.destroy({
        where: { cartId: cartId },
      });
      if (!deletedCart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting user cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = cartController;
