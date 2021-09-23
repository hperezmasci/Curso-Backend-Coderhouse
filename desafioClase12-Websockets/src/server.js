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

const cont = new Contenedor("./data/productos.txt");

let products = [];

// manejador del evento "connection" del web socket
io.on('connection', async (socket) => {
    try {
        console.log('Usuario conectado')
        // muestra los mensajes preexistentes cuando se conecta el usuario
        products = await cont.getAll();
        socket.emit('products', await cont.getAll())

        // handler receptor de mensajes "message"
        socket.on('product', async (product) => {
            try {
                await cont.save(product)
                io.sockets.emit('products', await cont.getAll())
            }
            catch (err) {throw new Error(`recepcion product: ${err}`)}
        })
    }
    catch (err) {throw new Error(`io product: ${err}`)}
})

// http server
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log('Servidor HTTP con Websockets escuchando en el puerto', PORT)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))