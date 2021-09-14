const { application } = require('express')
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)  // nuevo server http, reemplazando el de express
const io = new IOServer(httpServer)     // IO server sobre el http server

const PORT = 3030;
const mensajes = [];

app.use(express.static('./public-socket'));

httpServer.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto', PORT);
});

io.on('connection', (socket) => {
    console.log('Usuario conectado')

    socket.emit('mi mensaje', 'este es mi mensaje desde el servidor')

    socket.on('notificacion', data => {
        console.log(data)
    })

    socket.on('mensaje', (data) => {
        mensajes.push({ socketid: socket.id, mensaje: data })
        io.sockets.emit('mensajes', mensajes)
    })
})