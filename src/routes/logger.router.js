import { Router } from "express";
import logger from "../config/logger.js";

const router = Router();

router.get("/test", (req, res) => {
  logger.debug("Log de prueba - nivel debug");
  logger.http("Log de prueba - nivel http");
  logger.info("Log de prueba - nivel info");
  logger.warning("Log de prueba - nivel warning");
  logger.error("Log de prueba - nivel error");
  logger.fatal("Log de prueba - nivel fatal");

  res.status(200).json({
    status: "success",
    message: "Logs de prueba generados correctamente",
  });
});

export default router;