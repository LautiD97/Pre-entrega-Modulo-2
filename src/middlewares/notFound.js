import logger from "../config/logger.js";

const notFound = (req, res) => {
  logger.warning(
    `${req.method} ${req.originalUrl} - Ruta inexistente`
  );

  return res.status(404).json({
    status: "error",
    code: "ROUTE_NOT_FOUND",
    message: "La ruta solicitada no existe",
  });
};

export default notFound;