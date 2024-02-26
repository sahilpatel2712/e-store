const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const orderModel = sequelize.define(
  "Orders",
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userId",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "productId",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "categoryId",
      },
    },
    orderInfo: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (order, options) => {
        const lastOrder = await orderModel.findOne({
          order: [["orderId", "DESC"]],
        });
        if (lastOrder) {
          order.orderId = lastOrder.orderId + 1;
        } else {
          order.orderId = 1;
        }
      },
    },
  }
);

module.exports = orderModel;
