import express from 'express'
import exphbs from 'express-handlebars'

import { createServer } from "http"
import parseArgs from "minimist"

import authRouter from './authRouter.js'


import ProductsDaoMongoDB from './daos/ProductsDaoMongoDB.js'

// esquivamos los parámetros 0 y 1 porque son el comando node y el archivo fuente
const args = parseArgs(process.argv.slice(2), {default: {port: 8080}})


// express initialization
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// client-side handlebars
app.use('/handlebars', express.static('node_modules/handlebars/dist'))

// server-side handlebars
app.engine('handlebars',exphbs.engine({extname: '.hbs', defaultLayout: "main"}))
app.set('view engine', 'handlebars')
app.set('views', './views')


// Auth Router
app.use(authRouter)

// Containers for Products and Messages
const products = new ProductsDaoMongoDB();

// Server initialization
const httpServer = createServer(app)    // nuevo server http, reemplazando el de express

// http server
const connectedServer = httpServer.listen(args.port, () => {
    console.log('Servidor HTTP escuchando en el puerto', args.port)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))

