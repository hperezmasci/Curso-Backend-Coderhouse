import express from 'express'
import exphbs from 'express-handlebars'
import { createServer } from "http"
import { Server } from "socket.io"
import parseArgs from "minimist"

import authRouter from './routes/auth.js'
import infoRouter from './routes/info.js'
import randomRouter from './routes/random.js'

import ProductsDao from './daos/ProductsMongoDB.js'
import MessagesDao from './daos/MessagesMongoDB.js'

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

// Containers for Products and Messages
const products = ProductsDao.getInstance();
const messages = MessagesDao.getInstance();

// Server and Web Sockets initialization
const httpServer = createServer(app)    // nuevo server http, reemplazando el de express
const io = new Server(httpServer)       // IO server sobre el http server

// Web Socket "connection" event handler
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
            catch (err) {
                throw new Error(`recepcion product: ${err}`)}
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
    /*
    //Aquí no llamo a los close (destroy) porque sino cierro la conexión a las DB ante un connect!!
    finally {
        messages.close()
        products.close()
    }
    */
})

// http server
const connectedServer = httpServer.listen(args.port, () => {
    console.log('Servidor HTTP con Websockets escuchando en el puerto', args.port)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))

