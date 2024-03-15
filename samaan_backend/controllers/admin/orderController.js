const OrderModel = require("../../models/order");
const UserModel = require("../../models/userModel");

module.exports = {
  getOrderDetails: async (req, res, next) => {
    try {
      let orders = await OrderModel.findAll({
        include: {
          model: UserModel,
          attributes: ["name"],
          required: true,
        },
      });
      orders = orders.map((order) => order.toJSON());
      res.render("layout/app", {
        title: "Orders",
        filename: "../orders/index",
        items: orders,
        admin:req.admins.admin,
        route: "order",
      });
    } catch (error) {
      console.error("Error getting order details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  orderUpdateView: async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const order = await OrderModel.findByPk(orderId);
      res.render("layout/app", {
        title: "Order Update  :",
        filename: "../orders/orderUpdate",
        items: order.toJSON().orderInfo,
        status:order.toJSON().status,
        orderId:order.toJSON().orderId,
        admin:req.admins.admin,
        route: "order",
      });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  orderInfo: async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const order = await OrderModel.findByPk(orderId, {
        include: [
          {
            model: UserModel,
            attributes: ["name", "email"],
            required:true
          },
        ],
      });
      res.render("layout/app", {
        title: "Order Details  :",
        filename: "../orders/orderInfo",
        items: order.toJSON().orderInfo,
        data: order.toJSON(),
        admin:req.admins.admin,
        route: "order",
      });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
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

      res.json({ message: "Order updated successfully", order });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const order = await OrderModel.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      await order.destroy();

      res.redirect("/admin/orders");
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
