const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const categoryModel = sequelize.define("Categories", {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = categoryModel;
