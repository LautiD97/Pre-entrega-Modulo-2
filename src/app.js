import express from "express";
import productRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/users.routes.js";
import mocksRouter from "./routes/mocks.routes.js";
import loggerRouter from "./routes/logger.router.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mocks", mocksRouter);
app.use("/api/logger", loggerRouter);

// Manejo de rutas inexistentes
app.use(notFound);

// Middleware global de manejo de errores
app.use(errorHandler);

export default app;