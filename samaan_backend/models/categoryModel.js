const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const categoryModel = sequelize.define(
  "Category",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (category, options) => {
        const lastCategory = await categoryModel.findOne({
          order: [["categoryId", "DESC"]],
        });
        if (lastCategory) {
          category.categoryId = lastCategory.categoryId + 1;
        } else {
          lastCategory.categoryId = 1;
        }
      },
    },
  }
);
module.exports = categoryModel;
