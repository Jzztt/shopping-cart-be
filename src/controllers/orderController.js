import mongoose from "mongoose";
import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/User.js";
class OrderController {
  async createOrder(req, res) {
    try {
      const { userId, productId } = req.body;

      const userObjectId = new mongoose.Types.ObjectId(userId);

      let user = await User.findById(userObjectId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let order = await Order.findOne({ user: userObjectId }).populate(
        "products.product"
      );
      const products = await Product.find({ _id: { $in: productId } });

      if (!order) {
        order = new Order({
          user: userObjectId,
          products: [],
          total: 0,
        });

        await order.save();
        user.orders.push(order._id);
        await user.save();
      }

      let total = order.total;
      const newProducts = order.products.map((p) => ({
        product: p.product._id.toString(),
        quantity: p.quantity,
      }));

      for (const item of products) {
        const product = await Product.findById(item._id);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with ID ${item._id} not found` });
        }

        if (isNaN(product.price) || product.price <= 0) {
          return res
            .status(400)
            .json({ message: `Invalid price for product with ID ${item._id}` });
        }

        const existingProduct = newProducts.find(
          (p) => p.product.toString() === item._id.toString()
        );

        if (existingProduct) {
          existingProduct.quantity += item.quantity || 1;
          total += product.price * (item.quantity || 1);
        } else {
          newProducts.push({
            product: item._id,
            quantity: item.quantity || 1,
          });
          total += product.price * (item.quantity || 1);
        }
      }

      order.products = newProducts;
      order.total = total;

      const updatedOrder = await order.save();
      const orders = await Order.find().populate("products.product");

      res.status(200).json({
        data: orders,
        success: true,
        message: "Order created successfully",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await Order.find().populate("products.product");
      res.status(200).json({
        data: orders,
        success: true,
        message: "Get orders successfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user")
        .populate("products.product");
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.status = req.body.status || order.status;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async decreaseOrderQuantity(req, res) {
    try {
      const order = await Order.findById(req.params.id).populate("products.product");
      if (!order) return res.status(404).json({ message: "Order not found" });

      const productIndex = order.products.findIndex(
        (p) => p.product._id.toString() === req.params.productId
      );

      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: "Product not found in order", success: false });
      }


      if (order.products[productIndex].quantity > 1) {
        order.products[productIndex].quantity -= 1;
      } else {
        order.products.splice(productIndex, 1);
      }

      order.total = order.products.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      const updatedOrder = await order.save();
      const orders = await Order.find().populate("products.product");


      res.json({
        data: orders,
        success: true,
        message: "Product quantity updated successfully",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteProductFromOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id).populate("products.product");
      if (!order) return res.status(404).json({ message: "Order not found" });

      const productIndex = order.products.findIndex(
        (p) => p.product._id.toString() === req.params.productId
      );

      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: "Product not found in order", success: false });
      }

      order.products.splice(productIndex, 1);

      order.total = order.products.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      const updatedOrder = await order.save();
      const orders = await Order.find().populate("products.product");

      res.json({
        data: orders,
        success: true,
        message: "Product deleted from order successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default OrderController;
