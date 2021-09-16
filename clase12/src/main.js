const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)  // nuevo server http, reemplazando el de express
const io = new IOServer(httpServer)     // IO server sobre el http server

app.use(express.static('public'))

const mensajes = []

// manejador del evento "connection" del web socket
io.on('connection', (socket) => {
    console.log('Usuario conectado')

    // muestra los mensajes preexistentes cuando se conecta el usuario
    socket.emit('messages', mensajes)

    // handler receptor de mensajes "message"
    socket.on('message', (data) => {
        mensajes.push({ socketid: socket.id, mensaje: data })
        // broadcast de los mensajes (incluyendo el nuevo)
        io.sockets.emit('messages', mensajes)
    })
})

// http server
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log('Servidor HTTP con Websockets escuchando en el puerto', PORT)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))