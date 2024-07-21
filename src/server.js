import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./config/dbConfig.js";
import routers from "./routes/index.js";
import Product from "./models/product.js";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

connectMongoDB();
routers(app);
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
// //   .catch(err => console.log('Failed to connect to MongoDB', err));
// const products = [
//   {
//     name: "Nike Air Max 2019",
//     description: "Women's Road Running Shoes",
//     cost: 20000,
//     price: 18000,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8a9db44d-ee3b-42ab-88ea-2c48d37bc9ba/pegasus-41-blueprint-road-running-shoes-9ln3lK.png",
//   },
//   {
//     name: "Adidas Stan Smith",
//     description: "Women's Road Running Shoes",
//     cost: 30000,
//     price: 25000,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5fb3198a-cb5d-447e-9c5e-95644cdd88b4/pegasus-41-blueprint-older-road-running-shoes-Dgghd5.png",
//   },
//   {
//     name: "Adidas Stan Smith",
//     description: "Women's Road Running Shoes",
//     cost: 30000,
//     price: 25000,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/902bf0f3-9a22-4cd0-8c95-231c0b0fa8de/pegasus-41-road-running-shoes-tVfmVc.png",
//   },
//   {
//     name: "Adidas Stan Smith",
//     description: "Women's Road Running Shoes",
//     cost: 30000,
//     price: 25000,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/64f06a61-99e2-4839-b707-02c37482e1e2/pegasus-41-road-running-shoes-NW3xHb.png",
//   },
// ];

// const seedDB = async () => {
//     await Product.deleteMany({});
//     await Product.insertMany(products);
//     console.log('Database seeded!');
//   };

//   seedDB().then(() => {
//     mongoose.connection.close();
//   });

// const users = [
//   {
//     username: 'user1',
//     email: 'user1@example.com',
//     password: 'password1'
//   },
//   {
//     username: 'user2',
//     email: 'user2@example.com',
//     password: 'password2'
//   },
//   {
//     username: 'user3',
//     email: 'user3@example.com',
//     password: 'password3'
//   }
// ];

// try {
//   await User.deleteMany(); // Xóa tất cả dữ liệu cũ trong collection User
//   await User.insertMany(users); // Thêm dữ liệu mẫu mới
//   console.log('Data Seeded Successfully');
// } catch (error) {
//   console.error('Error seeding data:', error);
// } finally {
//   mongoose.connection.close();
// }

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
