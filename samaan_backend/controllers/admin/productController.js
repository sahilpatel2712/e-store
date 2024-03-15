const CategoryModel = require("../../models/category");
const ProductModel = require("../../models/product");
const { uploadFile, deleteFile } = require("../../helper/cloudinary");

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      let products = await ProductModel.findAll({
        include: {
          model: CategoryModel,
          attributes: ["categoryName"],
          required: true,
        },
      });
      products = products.map((product) => product.toJSON());
      console.log(products);
      res.render("layout/app", {
        title: "Products",
        filename: "../products/index",
        items: products,
        route: "products",
        admin:req.admins.admin,
      });
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  productForm: async (req, res, next) => {
    const { productId } = req.params;
    let categories = await CategoryModel.findAll({
      attributes: ["categoryId", "categoryName"],
    });
    categories = categories.map((category) => category.toJSON());
    if (productId === "0") {
      res.render("layout/app", {
        title: "Add form",
        filename: "../products/form",
        data: null,
        categories: categories,
        route: "products",
        admin:req.admins.admin,
      });
    } else {
      const product = await ProductModel.findByPk(productId);
      res.render("layout/app", {
        title: "Edit form",
        filename: "../products/form",
        data: product.toJSON(),
        categories: categories,
        route: "products",
        admin:req.admins.admin,
      });
    }
  },
  addOrUpdateProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const {
        productName,
        productPrice,
        categoryId,
        productSupplyNumber,
        productWeight,
        productDescription,
        productFlavour,
      } = req.body;

      let product;
      let result = await uploadFile(req.files.productImage.data);
      const productImage = result.secure_url;
      const productImageId = result.public_id;
      if (productId === "0") {
        product = await ProductModel.create({
          productName,
          productPrice,
          productImage,
          productImageId,
          categoryId,
          productSupplyNumber,
          productWeight,
          productDescription,
          productFlavour,
        });
      } else {
        const [updatedRowsCount] = await ProductModel.update(
          {
            productName,
            productPrice,
            productImage,
            productImageId,
            categoryId,
            productSupplyNumber,
            productWeight,
            productDescription,
            productFlavour,
          },
          {
            where: { productId },
          }
        );
        if (updatedRowsCount === 0) {
          return res.status(404).json({ error: "Product not found" });
        }

        product = await ProductModel.findByPk(productId);
      }
      res.redirect("/admin/products");
    } catch (error) {
      console.error("Error adding or updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId;

      const product = await ProductModel.findByPk(productId);
      const result = await deleteFile(product.productImageId);

      const deletedRowCount = await ProductModel.destroy({
        where: { productId },
      });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.redirect("/admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
