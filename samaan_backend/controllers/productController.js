const productModel = require("../models/productModel");

module.exports = {
  getProduct: async (req, res, next) => {
    try {
      const products = await productModel.findAll();
      console.log(products);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getProductsByCategoryId: async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const products = await productModel.findAll({ where: { categoryId } });

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
      } = req.body;
      const newProduct = await productModel.create({
        productName,
        productPrice,
        productImage,
        categoryId,
        productSupplyNumber,
      });

      res.status(201).json(newProduct);
    } catch (error) {
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
      } = req.body;

      const [updatedRowsCount, updatedRows] = await productModel.update(
        {
          productName,
          productPrice,
          productImage,
          categoryId,
          productSupplyNumber,
        },
        {
          where: { productId: productId },
        }
      );

      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const updatedProduct = await productModel.findOne({
        where: { productId: productId },
      });

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId;

      const deletedRowCount = await productModel.destroy({
        where: { productId: productId },
      });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
