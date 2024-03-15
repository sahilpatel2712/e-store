const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");
const CategoryModel = require("./category");

const ProductModel = sequelize.define(
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
    productImageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productSupplyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productFlavour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (product, options) => {
        const lastProduct = await ProductModel.findOne({
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

ProductModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = ProductModel;
