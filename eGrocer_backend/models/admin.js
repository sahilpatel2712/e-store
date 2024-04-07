const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const AdminModel = sequelize.define(
  "Admin",
  {
    adminId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false, 
  }
);

module.exports = AdminModel;
