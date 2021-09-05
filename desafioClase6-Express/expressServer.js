const express = require('express')
const Contenedor = require('./ContenedorAsync')

const app = express()

const cont = new Contenedor("./productos.txt");

app.get('/products', async (req, res) => {
    try {
        const products = await cont.getAll()
        res.send(JSON.stringify(products, null, 2))
    }
    catch (err) {throw new Error(`/products: ${err}`)}
})

app.get('/productRandom', async (req, res) => {
    try {
        const products = await cont.getAll()
        res.send(products[Math.floor(Math.random()*products.length)])
    }
    catch (err) {throw new Error(`/productRandom: ${err}`)}
})

const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))