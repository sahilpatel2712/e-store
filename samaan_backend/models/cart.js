const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const UserModel = require("./userModel");

const CartModel = sequelize.define("Cart", {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  cartItem: {
    type: DataTypes.JSON,
  },
});

UserModel.hasOne(CartModel, { foreignKey: "userId" });
CartModel.belongsTo(UserModel, { foreignKey: "userId" });

module.exports = CartModel;
