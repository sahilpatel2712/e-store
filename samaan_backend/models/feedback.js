const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const UserModel = require("./userModel");
const ProductModel = require("./product");

const FeedbackModel = sequelize.define("Feedbacks", {
  feedbackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ratings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reviews: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

FeedbackModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
FeedbackModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

module.exports = FeedbackModel;
