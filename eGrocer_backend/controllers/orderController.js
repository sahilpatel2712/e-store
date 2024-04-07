const CartModel = require("../models/cart");
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
      const { userId, orderInfo, orderAddress, total, status } = req.body;

      const newOrder = await OrderModel.create({
        userId,
        orderInfo,
        orderAddress,
        total,
        status,
      });

      res.json({newOrder,responseMessage:"Your order has been successfully placed"});
    } catch (error) {
      console.error("Error adding order:", error);
      res.json({ error: "Internal Server Error" });
    }
  },
  updateOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await OrderModel.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;

      await order.save();

      res.json({ responseMessage: "Order updated successfully", order });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
