import ErrorCodes from "./errorCodes.js";

const ErrorDictionary = {
  [ErrorCodes.USER_NOT_FOUND]: {
    statusCode: 404,
    message: "Usuario no encontrado",
  },

  [ErrorCodes.PRODUCT_NOT_FOUND]: {
    statusCode: 404,
    message: "Producto no encontrado",
  },

  [ErrorCodes.INVALID_MOCK_QUANTITY]: {
    statusCode: 400,
    message: "La cantidad de mocks debe ser un número mayor a cero",
  },

  [ErrorCodes.MOCK_GENERATION_ERROR]: {
    statusCode: 500,
    message: "Ocurrió un error durante la generación de mocks",
  },

  [ErrorCodes.MOCK_DATABASE_ERROR]: {
    statusCode: 500,
    message: "Ocurrió un error durante la carga de mocks en la base de datos",
  },

  [ErrorCodes.INVALID_DATA]: {
    statusCode: 400,
    message: "Los datos enviados son inválidos",
  },

  [ErrorCodes.INTERNAL_SERVER_ERROR]: {
    statusCode: 500,
    message: "Ocurrió un error interno en el servidor",
  },
};

export default ErrorDictionary;
