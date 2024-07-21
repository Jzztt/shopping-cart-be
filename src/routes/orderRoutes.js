import express from "express";
import OrderController from "../controllers/orderController.js";
const orderRoutes = express.Router();
const orderController = new OrderController();

orderRoutes.post('/', orderController.createOrder);
orderRoutes.get('/', orderController.getAllOrders);
// orderRoutes.get('/:id', orderController.getOrderById);
orderRoutes.put('/:id/products/:productId', orderController.decreaseOrderQuantity);
orderRoutes.delete('/:id/products/:productId', orderController.deleteProductFromOrder);



export default orderRoutes;