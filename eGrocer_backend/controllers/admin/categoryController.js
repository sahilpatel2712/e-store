const CategoryModel = require("../../models/category");
const { uploadFile, deleteFile } = require("../../helper/cloudinary");

module.exports = {
  getCategory: async (req, res, next) => {
    try {
      let categories = await CategoryModel.findAll();
      categories = categories.map((category) => category.toJSON());
      res.render("layout/app", {
        title: "Categories",
        filename: "../category/index",
        items: categories,
        route: "category",
        admin:req.admins.admin,
      });
    } catch (error) {
      console.error("Error getting categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  categoryForm: async (req, res, next) => {
    const { categoryId } = req.params;
    if (categoryId === "0") {
      res.render("layout/app", {
        title: "Add form",
        filename: "../category/form",
        data: null,
        route: "category",
        admin:req.admins.admin,
      });
    } else {
      const categories = await CategoryModel.findByPk(categoryId);
      res.render("layout/app", {
        title: "Edit form",
        filename: "../category/form",
        data: categories.toJSON(),
        route: "category",
        admin:req.admins.admin,
      });
    }
  },
  addOrUpdateCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const { categoryName } = req.body;
  
      let category;
  
      let categoryImage = null;
      let categoryImageId = null;
  
      if (req.files && req.files.categoryImage) {
        let result = await uploadFile(req.files.categoryImage.data);
        categoryImage = result.secure_url;
        categoryImageId = result.public_id;
      }
  
      if (categoryId === "0") {
        category = await CategoryModel.create({
          categoryName,
          categoryImage,
          categoryImageId,
        });
      } else {
        const categoryToUpdate = await CategoryModel.findByPk(categoryId);
  
        if (!categoryToUpdate) {
          return res.status(404).json({ error: "Category not found" });
        }
  
        if (categoryImage && categoryImageId) {
          await CategoryModel.update(
            { categoryName, categoryImage, categoryImageId },
            { where: { categoryId: categoryId } }
          );
        } else {
          await CategoryModel.update(
            { categoryName },
            { where: { categoryId: categoryId } }
          );
        }
  
        category = await CategoryModel.findByPk(categoryId);
      }
  
      res.redirect("/admin/categories");
    } catch (error) {
      console.error("Error adding/updating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  

  deleteCategory: async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;

      const category = await CategoryModel.findByPk(categoryId);
      const result = await deleteFile(category.categoryImageId);
      const deletedRowCount = await CategoryModel.destroy({
        where: { categoryId: categoryId },
      });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.redirect("/admin/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
