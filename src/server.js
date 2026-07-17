import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/env.config.js";

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);

    console.log("✅ Conectado a MongoDB");

    app.listen(config.PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();