const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const categoryModel = require("./categoryModel");

const productModel = sequelize.define(
  "Products",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productSupplyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
  },
  {
    hooks: {
      beforeCreate: async (product, options) => {
        const lastProduct = await productModel.findOne({
          order: [["productId", "DESC"]],
        });
        if (lastProduct) {
          product.productId = lastProduct.productId + 1;
        } else {
          product.productId = 1;
        }
      },
    },
  }
);

productModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

module.exports = productModel;
