const CategoryModel = require("../models/category");

module.exports = {
  getCategory: async (req, res, next) => {
    try {
      const categories = await CategoryModel.findAll();
      res.json(categories);
    } catch (error) {
      console.error("Error getting categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
 
};
