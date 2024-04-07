const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const UserModel = require("./userModel");
const ProductModel = require("./product");

const CartModel = sequelize.define("Carts", {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
CartModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
CartModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

module.exports = CartModel;
