import express from 'express'
import exphbs from 'express-handlebars'
import { createServer } from 'http'
import { Server } from "socket.io"

import cfg from './config.js'

import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import ordersRouter from './routes/orders.js'
import cfgRouter from './routes/cfg.js'
import chatRouter from './routes/chat.js'
import webAuthRouter from './routes/webAuth.js'
import messagesController from './controllers/messages.js'


const app = express()

app.use(express.static('public'))

// server-side handlebars
app.engine('hbs',exphbs.engine({extname: '.hbs', defaultLayout: "main"}))
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRouter)
app.use('/productos/', productsRouter)
app.use('/carrito/', cartRouter)
app.use('/ordenes/', ordersRouter)
app.use('/cfg/', cfgRouter)
app.use('/chat', chatRouter)
app.use('/web/', webAuthRouter)

const httpServer = createServer(app)    // nuevo server http, reemplazando el de express

const io = new Server(httpServer)       // IO server sobre el http server

// Web Socket "connection" event handler
io.on('connection', async (socket) => {
    try {
        console.log('Usuario conectado')

        messagesController.setSocket(socket)
        messagesController.setIOServer(io)
        messagesController.sendMessages()
        messagesController.setMessagesHandler()
    }
    catch (err) {throw new Error(`io connection handler: ${err}`)}
})

const connectedServer = httpServer.listen(cfg.server.port, () => {
    console.log('Servidor HTTP escuchando en el puerto', cfg.server.port)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))