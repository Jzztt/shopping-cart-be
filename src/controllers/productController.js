import NotFoundException from "../exceptions/errors/NotFoundException.js";
import Product from "../models/product.js";
class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      if (!products) {
        throw NotFoundException("No products found");
      }
      res.status(200).json({
        data: products,
        success: true,
        message: "Get products  successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  async createProduct(req, res) {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });

    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      await product.remove();
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
export default ProductController;
