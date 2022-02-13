import express from 'express'
import exphbs from 'express-handlebars'
import { createServer } from "http"
import { Server } from "socket.io"
import parseArgs from "minimist"

import authRouter from './routes/auth.js'
import infoRouter from './routes/info.js'
import randomRouter from './routes/random.js'
import messagesController from './controllers/messages.js'
import productsController from './controllers/products.js'

// esquivamos los parámetros 0 y 1 porque son el comando node y el archivo fuente
const args = parseArgs(process.argv.slice(2), {default: {port: 8080}})

// express initialization
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// client-side handlebars
app.use('/handlebars', express.static('node_modules/handlebars/dist'))

// server-side handlebars
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', 'src/views')

// Auth Router
app.use(authRouter)

// Info Router
app.use('/info', infoRouter)

// Random Router
app.use('/api/random', randomRouter)

// Server and Web Sockets initialization
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

        productsController.setSocket(socket)
        productsController.setIOServer(io)
        productsController.sendProducts()
        productsController.setProductsHandler()

    }
    catch (err) {throw new Error(`io connection handler: ${err}`)}
})

// http server
const connectedServer = httpServer.listen(args.port, () => {
    console.log('Servidor HTTP con Websockets escuchando en el puerto', args.port)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))

