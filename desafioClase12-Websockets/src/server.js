import express from 'express';
import exphbs from 'express-handlebars';
import { createServer } from "http";
import { Server } from "socket.io";

import Contenedor from './ContenedorAsync.js';

const app = express()

const httpServer = createServer(app)    // nuevo server http, reemplazando el de express
const io = new Server(httpServer)       // IO server sobre el http server

app.use(express.static('public'))
app.use('/handlebars', express.static('node_modules/handlebars/dist'))

const products = new Contenedor("./data/productos.txt");

const messages = new Contenedor("./data/mensajes.txt")

// manejador del evento "connection" del web socket
io.on('connection', async (socket) => {
    try {
        console.log('Usuario conectado')
        // muestra los productos preexistentes cuando se conecta el usuario
        socket.emit('products', await products.getAll())

        // muestra los mensajes preexistentes cuando se conecta el usuario
        socket.emit('messages', await messages.getAll())

        // handler receptor de mensajes "product"
        socket.on('product', async (product) => {
            try {
                await products.save(product)
                io.sockets.emit('products', await products.getAll())
            }
            catch (err) {throw new Error(`recepcion product: ${err}`)}
        })

        // handler receptor de mensajes "message"
        socket.on('message', async (message) => {
            try {
                if (!message.mail) return false
                await messages.save(message)
                io.sockets.emit('messages', await messages.getAll())
            }
            catch (err) {throw new Error(`recepcion message: ${err}`)}
        })
    }
    catch (err) {throw new Error(`io connection handler: ${err}`)}
})

// http server
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log('Servidor HTTP con Websockets escuchando en el puerto', PORT)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))