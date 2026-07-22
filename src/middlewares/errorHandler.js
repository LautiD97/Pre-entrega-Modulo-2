import AppError from "../errors/AppError.js";
import ErrorCodes from "../errors/errorCodes.js";
import ErrorDictionary from "../errors/errorDictionary.js";
import logger from "../config/logger.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    logger.warning(
      `${req.method} ${req.originalUrl} - ${error.code}: ${error.message}`
    );

    return res.status(error.statusCode).json({
      status: "error",
      code: error.code,
      message: error.message,
    });
  }

  // IDs de MongoDB con formato inválido
  if (error.name === "CastError") {
    const invalidDataError =
      ErrorDictionary[ErrorCodes.INVALID_DATA];

    logger.warning(
      `${req.method} ${req.originalUrl} - Identificador inválido: ${error.message}`
    );

    return res.status(invalidDataError.statusCode).json({
      status: "error",
      code: ErrorCodes.INVALID_DATA,
      message: "El identificador proporcionado no es válido",
    });
  }

  const internalError =
    ErrorDictionary[ErrorCodes.INTERNAL_SERVER_ERROR];

  logger.error(
    `${req.method} ${req.originalUrl} - Error inesperado: ${
      error.stack || error.message
    }`
  );

  return res.status(internalError.statusCode).json({
    status: "error",
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
    message: internalError.message,
  });
};

export default errorHandler;