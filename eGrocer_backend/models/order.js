const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const UserModel = require("./userModel");

const OrderModel = sequelize.define(
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
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderInfo: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ORDERED", "SHIPPED", "DELIVERED","CANCELLED"),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (order, options) => {
        const lastOrder = await OrderModel.findOne({
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

OrderModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = OrderModel;
