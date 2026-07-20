# ShipNow API — Módulo 3: Manejo profesional de errores

## Descripción

ShipNow API es un proyecto backend desarrollado con Node.js, Express y MongoDB, organizado mediante una arquitectura por capas para mantener una separación clara de responsabilidades.

En esta pre-entrega del Módulo 3 se incorporó un sistema profesional y centralizado de manejo de errores mediante errores personalizados, un diccionario de errores y un middleware global.

También se integró este sistema al módulo de mocking desarrollado anteriormente, incorporando validaciones para cantidades inválidas y manejo controlado de posibles fallas durante la generación o persistencia de datos de prueba.

---

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- Faker (`@faker-js/faker`)
- dotenv

---

## Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
src/
├── config/
├── constants/
├── controllers/
├── errors/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

### Responsabilidades principales

- **Routes:** definen los endpoints de la API.
- **Controllers:** reciben las solicitudes HTTP y delegan la lógica a los services.
- **Services:** contienen la lógica de negocio y detectan errores del dominio.
- **Repositories:** gestionan el acceso y persistencia de datos.
- **Models:** definen los esquemas de MongoDB mediante Mongoose.
- **Errors:** contiene los errores personalizados, códigos y diccionario de errores.
- **Middlewares:** contiene el middleware global encargado de generar las respuestas HTTP de error.
- **Utils:** contiene utilidades como los generadores de datos simulados.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/LautiD97/Pre-entrega-Modulo-2.git
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Ejemplo:

```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow
NODE_ENV=development
```

No se deben almacenar credenciales reales ni información sensible dentro de `.env.example`.

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Por defecto, el servidor estará disponible en:

```text
http://localhost:8080
```

---

# Manejo centralizado de errores

La API utiliza una capa común para gestionar los errores.

Los errores esperados del dominio se detectan principalmente en los services y se representan mediante errores personalizados.

Los controllers no generan respuestas HTTP de error directamente. En su lugar, derivan los errores al middleware global mediante `next(error)`.

El middleware global transforma los errores en una respuesta HTTP uniforme.

## Estructura de respuesta

Todos los errores controlados utilizan la siguiente estructura:

```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "Descripción del error"
}
```

Ejemplo para un usuario inexistente:

```json
{
  "status": "error",
  "code": "USER_NOT_FOUND",
  "message": "Usuario no encontrado"
}
```

Ejemplo para una cantidad inválida de mocks:

```json
{
  "status": "error",
  "code": "INVALID_MOCK_QUANTITY",
  "message": "La cantidad de mocks debe ser un número mayor a cero"
}
```

Entre los errores controlados se encuentran:

- Usuario no encontrado.
- Producto no encontrado.
- Identificador con formato inválido.
- Cantidad inválida de mocks.
- Error durante la generación de mocks.
- Error durante la carga de mocks en MongoDB.
- Errores internos inesperados del servidor.

---

# Endpoints de mocking

## Generar datos simulados

**POST**

```text
/api/mocks
```

Genera usuarios, repartidores, pedidos y entregas simuladas sin almacenarlos en MongoDB.

Ejemplo de body:

```json
{
  "users": 5,
  "drivers": 3
}
```

Si no se especifican cantidades, se utilizan por defecto:

- 5 usuarios.
- 3 repartidores.

Los pedidos se generan a partir de los usuarios y las entregas se relacionan con los pedidos y repartidores generados.

---

## Insertar datos de prueba en MongoDB

**POST**

```text
/api/mocks/seed
```

Genera datos simulados y los almacena en MongoDB.

Ejemplo:

```json
{
  "users": 5,
  "drivers": 3
}
```

Respuesta esperada:

```json
{
  "users": 5,
  "drivers": 3,
  "orders": 5,
  "deliveries": 5
}
```

---

# Pruebas de errores

Los siguientes casos permiten comprobar el funcionamiento del manejo centralizado de errores.

## Cantidad negativa de mocks

**POST**

```text
/api/mocks
```

Body:

```json
{
  "users": -5,
  "drivers": 3
}
```

Respuesta esperada: `400 Bad Request`

```json
{
  "status": "error",
  "code": "INVALID_MOCK_QUANTITY",
  "message": "La cantidad de mocks debe ser un número mayor a cero"
}
```

La misma validación se aplica al endpoint:

```text
POST /api/mocks/seed
```

También se rechazan cantidades iguales a `0`, valores negativos, números no enteros y valores que no sean numéricos.

---

## Usuario inexistente

Ejemplo:

```text
GET /api/users/000000000000000000000000
```

Respuesta esperada: `404 Not Found`

```json
{
  "status": "error",
  "code": "USER_NOT_FOUND",
  "message": "Usuario no encontrado"
}
```

---

## Producto inexistente

Ejemplo:

```text
GET /api/products/000000000000000000000000
```

Respuesta esperada: `404 Not Found`

```json
{
  "status": "error",
  "code": "PRODUCT_NOT_FOUND",
  "message": "Producto no encontrado"
}
```

---

## Identificador inválido

Ejemplo:

```text
GET /api/users/abc
```

Respuesta esperada: `400 Bad Request`

```json
{
  "status": "error",
  "code": "INVALID_DATA",
  "message": "El identificador proporcionado no es válido"
}
```

---

## Fallas durante la persistencia de mocks

Si ocurre una falla durante la carga de datos de prueba en MongoDB, el service deriva el error al sistema centralizado.

La API responde de forma controlada con un error interno asociado a la persistencia de mocks, evitando exponer detalles internos de la base de datos al cliente.

---

## Funcionalidades implementadas

- Arquitectura por capas.
- Generación de usuarios simulados.
- Generación de repartidores simulados.
- Generación de pedidos simulados.
- Generación de entregas simuladas.
- Persistencia de datos de prueba en MongoDB.
- Cantidades configurables para la generación de mocks.
- Validación de cantidades inválidas.
- Uso de constantes para roles, estados y prioridades.
- Relaciones entre usuarios, pedidos, repartidores y entregas.
- Errores personalizados del dominio.
- Diccionario centralizado de errores.
- Middleware global de manejo de errores.
- Formato uniforme de respuestas de error.
- Manejo controlado de errores de MongoDB.