const ProductModel = require("../models/product");

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProductsByCategoryId: async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const products = await ProductModel.findAll({ where: { categoryId } });
      if (products.length === 0) {
        return res
          .status(404)
          .json({ error: "No products found for this category" });
      }

      res.json(products);
    } catch (error) {
      console.error("Error getting products by category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addProduct: async (req, res, next) => {
    try {
      const {
        productName,
        productPrice,
        productImage,
        categoryId,
        productSupplyNumber,
        productWeight,
        productDescription,
        productFlavour,
      } = req.body;

      const newProduct = await ProductModel.create({
        productName,
        productPrice,
        productImage,
        categoryId,
        productSupplyNumber,
        productWeight,
        productDescription,
        productFlavour,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const {
        productName,
        productPrice,
        productImage,
        categoryId,
        productSupplyNumber,
        productWeight,
        productDescription,
        productFlavour,
      } = req.body;

      const [updatedRowsCount, updatedRows] = await ProductModel.update(
        {
          productName,
          productPrice,
          productImage,
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

      const updatedProduct = await ProductModel.findByPk(productId);

      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId;

      const deletedRowCount = await ProductModel.destroy({
        where: { productId },
      });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
