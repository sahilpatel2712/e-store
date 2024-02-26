const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const UserModel = sequelize.define(
  "Users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        const lastUser = await UserModel.findOne({
          order: [["userId", "DESC"]],
        });
        if (lastUser) {
          user.userId = lastUser.userId + 1;
        } else {
          user.userId = 1;
        }
      },
    },
  }
);

module.exports = UserModel;
