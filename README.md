# ShipNow API — Módulo 4: Logging y monitoreo básico

## Descripción

ShipNow API es un proyecto backend desarrollado con Node.js, Express y MongoDB, organizado mediante una arquitectura por capas para mantener una separación clara de responsabilidades.

En esta pre-entrega del Módulo 4 se incorporó un sistema profesional y centralizado de logging utilizando Winston.

El sistema permite registrar eventos relevantes de la aplicación mediante distintos niveles de importancia, persistir logs en archivos con rotación automática y diferenciar el comportamiento del logger según el entorno de ejecución.

La implementación se integra con los módulos desarrollados anteriormente:

- Arquitectura por capas.
- Configuración y validación de variables de entorno.
- Generación y persistencia de datos mock.
- Manejo profesional y centralizado de errores.

---

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- Faker (`@faker-js/faker`)
- dotenv
- Winston
- winston-daily-rotate-file

---

## Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
src/
├── config/
│   ├── env.config.js
│   └── logger.js
├── constants/
├── controllers/
├── errors/
├── middlewares/
│   ├── errorHandler.js
│   └── notFound.js
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
- **Middlewares:** centralizan el manejo de errores y rutas inexistentes.
- **Config:** contiene la configuración de variables de entorno y del logger.
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

Las variables requeridas son:

- `PORT`
- `MONGODB_URI`
- `NODE_ENV`

No se deben almacenar credenciales reales ni información sensible dentro del repositorio.

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Por defecto, el servidor estará disponible en:

```text
http://localhost:8080
```

---

# Sistema de logging

La API utiliza Winston como sistema centralizado de logging.

La configuración se encuentra en:

```text
src/config/logger.js
```

Esto permite utilizar una única instancia del logger desde distintos módulos de la aplicación sin repetir configuración.

Los mensajes sueltos mediante `console.log()`, `console.error()` y similares fueron reemplazados por logs clasificados según su importancia.

---

## Niveles de log

El logger utiliza los siguientes niveles personalizados, ordenados desde mayor a menor prioridad:

```text
fatal
error
warning
info
http
debug
```

### Uso de cada nivel

- **fatal:** fallas críticas que pueden impedir el funcionamiento de la aplicación, como un error durante el inicio o la conexión inicial.
- **error:** errores inesperados del servidor.
- **warning:** errores esperados, errores de negocio, datos inválidos o rutas inexistentes.
- **info:** eventos relevantes del funcionamiento normal de la aplicación.
- **http:** eventos relacionados con solicitudes HTTP o pruebas de este nivel.
- **debug:** información detallada utilizada durante desarrollo y depuración.

---

# Comportamiento según el entorno

El logger utiliza la variable:

```env
NODE_ENV
```

para determinar qué nivel de información registrar.

## Desarrollo

Con:

```env
NODE_ENV=development
```

se habilitan todos los niveles:

```text
debug
http
info
warning
error
fatal
```

Esto facilita el debugging y las pruebas durante el desarrollo.

## Producción

Con:

```env
NODE_ENV=production
```

se registran únicamente los niveles más relevantes:

```text
info
warning
error
fatal
```

Los niveles `debug` y `http` no se muestran en producción, reduciendo información innecesaria.

---

# Eventos registrados

El logger se utiliza en puntos relevantes de ShipNow API.

Entre los eventos registrados se encuentran:

- Conexión exitosa a MongoDB.
- Inicio correcto del servidor.
- Fallas críticas durante el inicio de la aplicación.
- Generación correcta de datos mock.
- Persistencia de datos mock en MongoDB.
- Cantidades inválidas enviadas al módulo de mocks.
- Errores esperados o de negocio.
- Identificadores inválidos.
- Rutas inexistentes.
- Errores inesperados del servidor.

La generación y persistencia de mocks también registra las cantidades de usuarios, repartidores, pedidos y entregas procesadas.

---

# Integración con el manejo de errores

El logger está integrado con el middleware global de errores desarrollado en el módulo anterior.

Los errores se clasifican de la siguiente manera:

```text
Errores esperados o de negocio → warning
Identificadores inválidos      → warning
Errores inesperados            → error
Fallas críticas de inicio      → fatal
```

El logger complementa el manejo de errores, pero no modifica la respuesta enviada al cliente.

Los errores controlados mantienen una estructura uniforme:

```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "Descripción del error"
}
```

De esta manera, los detalles útiles para debugging quedan registrados internamente mientras que el cliente recibe una respuesta clara y controlada.

---

# Persistencia de logs

Los logs importantes se almacenan automáticamente dentro de:

```text
logs/
```

Se generan archivos similares a:

```text
logs/
├── combined-YYYY-MM-DD.log
└── errors-YYYY-MM-DD.log
```

### Archivo combined

Registra eventos desde nivel `info`, incluyendo:

```text
info
warning
error
fatal
```

### Archivo errors

Registra únicamente los niveles de mayor gravedad:

```text
error
fatal
```

Esto permite consultar errores después de que hayan ocurrido sin depender únicamente de la salida de la consola.

---

# Rotación de archivos

La rotación de logs se implementa mediante:

```text
winston-daily-rotate-file
```

La configuración utiliza:

- Rotación organizada por fecha.
- Tamaño máximo aproximado de `20 MB` por archivo.
- Conservación de archivos durante `14 días`.

Esto evita que los archivos de logs crezcan indefinidamente y permite mantener un historial ordenado.

---

# Archivos ignorados por Git

Los logs generados por la aplicación no deben almacenarse en el repositorio.

El archivo `.gitignore` incluye:

```gitignore
node_modules/
.env
logs
*.log
npm-debug.log*
```

De esta manera se evita subir:

- Dependencias instaladas.
- Variables de entorno y credenciales.
- Archivos de logs generados durante la ejecución.

---

# Endpoint de prueba del logger

Se incorporó un endpoint interno para comprobar rápidamente todos los niveles configurados.

## Endpoint

**GET**

```text
/api/logger/test
```

Ejemplo:

```text
GET http://localhost:8080/api/logger/test
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "Logs de prueba generados correctamente"
}
```

En entorno de desarrollo genera:

```text
debug
http
info
warning
error
fatal
```

En producción genera únicamente los niveles habilitados:

```text
info
warning
error
fatal
```

Este endpoint tiene fines de prueba y validación de la configuración del logger.

---

# Endpoints de mocking

## Generar datos simulados

**POST**

```text
/api/mocks
```

Genera usuarios, repartidores, pedidos y entregas simuladas sin almacenarlos en MongoDB.

Ejemplo:

```json
{
  "users": 5,
  "drivers": 3
}
```

Si no se especifican cantidades, se utilizan por defecto:

- 5 usuarios.
- 3 repartidores.

Una generación exitosa registra un evento de nivel `info`.

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

Una carga exitosa registra un evento `info` indicando la cantidad de entidades insertadas.

---

# Pruebas de errores y logging

## Cantidad inválida de mocks

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

Respuesta esperada:

```text
400 Bad Request
```

```json
{
  "status": "error",
  "code": "INVALID_MOCK_QUANTITY",
  "message": "La cantidad de mocks debe ser un número mayor a cero"
}
```

El evento se registra internamente como:

```text
warning
```

También se rechazan cantidades iguales a `0`, valores negativos, números no enteros y valores que no sean numéricos.

---

## Ruta inexistente

Ejemplo:

```text
GET /api/no-existe
```

Respuesta esperada:

```text
404 Not Found
```

```json
{
  "status": "error",
  "code": "ROUTE_NOT_FOUND",
  "message": "La ruta solicitada no existe"
}
```

La solicitud queda registrada como un evento de nivel:

```text
warning
```

---

## Usuario inexistente

Ejemplo:

```text
GET /api/users/000000000000000000000000
```

Respuesta esperada:

```text
404 Not Found
```

El error controlado se registra internamente como `warning`.

---

## Producto inexistente

Ejemplo:

```text
GET /api/products/000000000000000000000000
```

Respuesta esperada:

```text
404 Not Found
```

El error controlado se registra internamente como `warning`.

---

## Identificador inválido

Ejemplo:

```text
GET /api/users/abc
```

Respuesta esperada:

```text
400 Bad Request
```

El identificador inválido se registra internamente como `warning`.

---

# Funcionalidades implementadas

- Arquitectura profesional por capas.
- Configuración y validación centralizada de variables de entorno.
- Generación de usuarios simulados.
- Generación de repartidores simulados.
- Generación de pedidos simulados.
- Generación de entregas simuladas.
- Persistencia de datos de prueba en MongoDB.
- Validación de cantidades para generación de mocks.
- Errores personalizados del dominio.
- Diccionario centralizado de errores.
- Middleware global de manejo de errores.
- Manejo de rutas inexistentes.
- Formato uniforme de respuestas de error.
- Logger centralizado con Winston.
- Niveles personalizados `debug`, `http`, `info`, `warning`, `error` y `fatal`.
- Configuración diferenciada para desarrollo y producción.
- Integración del logger con el middleware global de errores.
- Registro de eventos relevantes de la aplicación.
- Persistencia de logs importantes en archivos.
- Rotación automática de archivos de logs.
- Endpoint interno para probar todos los niveles del logger.
- Exclusión de archivos de logs y variables sensibles mediante `.gitignore`.