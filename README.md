# Práctica 6 - API REST de productos

API REST desarrollada con Node.js y Express para gestionar productos mediante operaciones CRUD.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- Postman

## Cómo ejecutar el proyecto

1. Clonar el repositorio.
2. Instalar las dependencias:

   npm install

3. Iniciar el servidor:

   npm run dev

El servidor se ejecuta en http://localhost:3000

## Endpoints implementados

| Método | Ruta | Función |
|---|---|---|
| GET | /productos | Listar todos los productos |
| GET | /productos/:id | Buscar producto por ID |
| POST | /productos | Crear un producto |
| PUT | /productos/:id | Actualizar un producto |
| DELETE | /productos/:id | Eliminar un producto |

## Pruebas

Se realizaron pruebas de los endpoints utilizando Postman, incluyendo respuestas exitosas y errores 400 y 404.

## Autor

José Francisco Ramírez López