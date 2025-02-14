
# Project Cicchini

Este proyecto es una API para la gestión de productos y carritos de compras, permitiendo agregar, modificar, eliminar y listar productos almacenados en un archivo JSON. Se utiliza Express.js para el manejo de rutas y fs para la manipulación de archivos.

Dicho proyecto se realiza a modo educativo, para curso de Back end I de CoderHouse.


## API Reference

#### Routes

#### Products


```http
GET /api/products → Obtener todos los productos.

GET /api/products/:pid → Obtener un producto por su ID.

POST /api/products → Agregar un nuevo producto.

PUT /api/products/:pid → Modificar un producto.

DELETE /api/products/:pid → Eliminar un producto.
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Título del producto |
| `description` | `string` | **Optional**. Descripción del producto |
| `code` | `string` / `number` | **Required**. Código del producto |
| `price` | `number` | **Required**. Precio del producto |
| `stock` | `number` | **Required**. Stock del producto |
| `category` | `string` | **Required**. Categoría a la que pertenece el producto |
| `thumbnail` | `link` | **Optional**. Referencia del producto |

#### Carts
```http
POST /api/carts → Crear un nuevo carrito.

GET /api/carts/:cid → Obtener un carrito por ID.

POST /api/carts/:cid/products/:pid → Agregar un producto al carrito.

DELETE /api/carts/:cid/products/:pid → Eliminar un producto del carrito.
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `number` | **Required**. Id del carrito |
| `pid`      | `number` | **Required**. Id del producto a agregar o eliminar |


## Authors

- [@nec91](https://github.com/nec91/ProjectCicchini)


## Tech Stack

**Server:** Node
**Dependences:** Express

