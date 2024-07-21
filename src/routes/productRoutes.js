import express from "express";
import ProductController from "../controllers/productController.js";
const productRoutes = express.Router();
const productController = new ProductController();

productRoutes.get('/', productController.getAllProducts);
// productRoutes.post('/', productController.createProduct);
// productRoutes.get('/:id', productController.getProductById);
// productRoutes.put('/:id', productController.updateProduct);
// productRoutes.delete('/:id', productController.deleteProduct);

export default productRoutes;