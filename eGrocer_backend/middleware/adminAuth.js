const AdminModel = require("../models/admin");

const isAdminAuthenticated =async (req, res, next) => {
  if (req.isAuthenticated()) {
    let admin = await AdminModel.findAll({
        attributes: ["userName", "email"],
      });
      admin = admin.map((obj) => obj.toJSON());
      req.admins = req.admins || {};
      req.admins.admin=admin[0]
    return next();
  }
  res.redirect("/admin/");
};

module.exports={isAdminAuthenticated}