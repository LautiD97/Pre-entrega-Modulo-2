import express from "express";
import productRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/users.routes.js";
import mocksRouter from "./routes/mocks.routes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/mocks", mocksRouter);

export default app;