const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto

app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body

    // Validamos los campos obligatorios
    if (
        nombre === undefined || nombre === '' ||
        descripcion === undefined || descripcion === '' ||
        precio === undefined || precio === ''
    ) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        })
    }

    // Convertimos el precio a número
    const precioNumerico = parseFloat(precio)

    // Validar que el precio sea válido y mayor que cero
    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un número mayor que cero'
        })
    }

    // Generamos un ID nuevo
    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1

    // Creamos el nuevo producto
    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    // Agregamos el producto al arreglo
    productos.push(nuevoProducto)

    // Respondemos con código 201
    res.status(201).json(nuevoProducto)
})



// TODO: PUT /productos/:id - Actualizar producto

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { nombre, descripcion, precio } = req.body

    // Buscamos el producto por su ID
    const productoIndex = productos.findIndex(p => p.id === id)

    if (productoIndex === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // Validamos los campos obligatorios
    if (
        nombre === undefined || nombre === '' ||
        descripcion === undefined || descripcion === '' ||
        precio === undefined || precio === ''
    ) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        })
    }

    // Convertimos el precio a número
    const precioNumerico = parseFloat(precio)

    // Validar que el precio sea válido y mayor que cero
    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un número mayor que cero'
        })
    }

    // Actualizamos el producto
    productos[productoIndex] = {
        id,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    // Respondemos con el producto actualizado
    res.status(200).json(productos[productoIndex])
})

// TODO: DELETE /productos/:id - Eliminar producto


app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Buscamos el producto por su ID
    const productoIndex = productos.findIndex(p => p.id === id)

    // Verificar si existe
    if (productoIndex === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    // Eliminamos el producto y guardamos sus datos
    const productoEliminado = productos.splice(productoIndex, 1)[0]

    // Respondemos con el mensaje y el producto eliminado
    res.status(200).json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado
    })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
