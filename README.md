# ShipNow API - Módulo 2: Mocking y carga de datos

## Descripción

Este proyecto corresponde a la pre-entrega del Módulo 2 de ShipNow API.

Se implementó un sistema de mocking respetando la arquitectura por capas (Routes → Controllers → Services → Repositories → Models), permitiendo generar datos simulados y cargar datos de prueba en MongoDB.

---

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- Faker (@faker-js/faker)

---

## Instalación

1. Clonar el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Instalar dependencias.

```bash
npm install
```

3. Configurar el archivo `.env`.

4. Ejecutar el proyecto.

```bash
npm run dev
```

El servidor iniciará en:

```
http://localhost:8080
```

---

## Endpoints de Mocking

### Obtener datos simulados (no se guardan en la base)

**GET**

```
/api/mocks
```

Devuelve:

- Usuarios
- Repartidores
- Pedidos
- Entregas

Todos generados dinámicamente.

---

### Insertar datos de prueba en MongoDB

**POST**

```
/api/mocks/seed
```

Inserta registros de prueba en MongoDB y devuelve la cantidad creada para cada colección.

Ejemplo de respuesta:

```json
{
  "users": 5,
  "drivers": 3,
  "orders": 5,
  "deliveries": 5
}
```

---

## Arquitectura

```
src
│
├── routes
├── controllers
├── services
├── repositories
├── models
├── utils
└── constants
```

La aplicación respeta una arquitectura por capas para mantener una correcta separación de responsabilidades.

---

## Funcionalidades implementadas

- Generación de usuarios simulados.
- Generación de repartidores simulados.
- Generación de pedidos simulados.
- Generación de entregas simuladas.
- Inserción de datos de prueba en MongoDB.
- Uso de constantes para roles, estados y prioridades.
- Relaciones entre usuarios, pedidos, repartidores y entregas.
