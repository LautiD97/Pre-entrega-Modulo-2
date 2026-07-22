import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/env.config.js";
import logger from "./config/logger.js";

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);

    logger.info("Conectado correctamente a MongoDB");

    app.listen(config.PORT, () => {
      logger.info(`Servidor corriendo en el puerto ${config.PORT}`);
    });
  } catch (error) {
    logger.fatal(`Error crítico al iniciar la aplicación: ${error.message}`);
    process.exit(1);
  }
};

startServer();