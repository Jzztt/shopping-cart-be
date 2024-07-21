import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";


const routers = (app) => {
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
};

export default routers;
