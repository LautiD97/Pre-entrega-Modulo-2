import ErrorDictionary from "./errorDictionary.js";
import ErrorCodes from "./errorCodes.js";

class AppError extends Error {
  constructor(code, customMessage = null) {
    const errorDefinition =
      ErrorDictionary[code] ||
      ErrorDictionary[ErrorCodes.INTERNAL_SERVER_ERROR];

    super(customMessage || errorDefinition.message);

    this.name = "AppError";
    this.code = ErrorDictionary[code]
      ? code
      : ErrorCodes.INTERNAL_SERVER_ERROR;
    this.statusCode = errorDefinition.statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;