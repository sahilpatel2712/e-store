const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OrderModel = require("../../models/order");
const UserModel = require("../../models/userModel");
const ProductModel = require("../../models/product");
const CategoryModel = require("../../models/category");
const AdminModel = require("../../models/admin");

module.exports = {
  adminLoginForm: async (req, res, next) => {
    try {
      res.render("./auth/login", { title: "Login" });
    } catch (error) {
      next(error);
    }
  },
  adminSignupForm: async (req, res, next) => {
    try {
      res.render("./auth/register", { title: "Register" });
    } catch (error) {
      next(error);
    }
  },
  getHome: async (req, res, next) => {
    try {
      const { count: activeOrders } = await OrderModel.findAndCountAll({
        where: {
          status: {
            [Sequelize.Op.notIn]: ["DELIVERED", "CANCEL"],
          },
        },
      });
      const { count: users } = await UserModel.findAndCountAll();
      const { count: products } = await ProductModel.findAndCountAll();
      const { count: categories } = await CategoryModel.findAndCountAll();

      res.render("layout/app", {
        title: "Dashboard",
        filename: "./dashboard",
        data: { activeOrders, users, products, categories },
        route: "dashboard",
        admin:req.admins.admin,
      });
    } catch (error) {
      console.log("error in dashboard", error);
      res.status(500).send(error);
    }
  },
};
