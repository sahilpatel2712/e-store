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

 
};
