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
  addCategory: async (req, res, next) => {
    try {
      const { categoryName, categoryImage } = req.body;
      const newCategory = await CategoryModel.create({
        categoryName,
        categoryImage,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const { categoryName, categoryImage } = req.body;

      const [updatedRowsCount, updatedRows] = await CategoryModel.update(
        { categoryName, categoryImage },
        { where: { categoryId: categoryId } }
      );

      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      const updatedCategory = await CategoryModel.findOne({
        where: { categoryId: categoryId },
      });
      res.json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;

      const deletedRowCount = await CategoryModel.destroy({
        where: { categoryId: categoryId },
      });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
