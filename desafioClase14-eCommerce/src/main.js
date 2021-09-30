import express from 'express';
import { productRouter, cartRouter } from './router.js'

const app = express()

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)

app.use((req, res) => {
    res.send({error: -2, descripcion: `ruta ${req.path} método ${req.method} no implementada`})
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))