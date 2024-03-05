const OrderModel = require("../models/order");

module.exports = {
  getOrderDetails: async (req, res, next) => {
    try {
      const { orderId, userId } = req.params;

      let orders;

      if (orderId) {
        orders = await OrderModel.findAll({ where: { orderId: orderId } });
      } else if (userId) {
        orders = await OrderModel.findAll({ where: { userId: userId } });
      } else {
        orders = await OrderModel.findAll();
      }

      if (orders.length === 0) {
        return res.status(404).json({ error: "No orders found" });
      }

      res.json(orders);
    } catch (error) {
      console.error("Error getting order details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addOrders: async (req, res, next) => {
    try {
      const { userId, productId, categoryId, orderInfo, orderAddress } =
        req.body;

      const newOrder = await OrderModel.create({
        userId,
        productId,
        categoryId,
        orderInfo,
        orderAddress,
      });

      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error adding order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
