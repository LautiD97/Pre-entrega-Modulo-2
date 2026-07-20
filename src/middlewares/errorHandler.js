import AppError from "../errors/AppError.js";
import ErrorCodes from "../errors/errorCodes.js";
import ErrorDictionary from "../errors/errorDictionary.js";

const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error instanceof AppError) {
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

    return res.status(invalidDataError.statusCode).json({
      status: "error",
      code: ErrorCodes.INVALID_DATA,
      message: "El identificador proporcionado no es válido",
    });
  }

  const internalError =
    ErrorDictionary[ErrorCodes.INTERNAL_SERVER_ERROR];

  return res.status(internalError.statusCode).json({
    status: "error",
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
    message: internalError.message,
  });
};

export default errorHandler;