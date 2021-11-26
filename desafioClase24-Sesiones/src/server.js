import express from 'express';
import session from 'express-session'
import isAuthenticated from './auth.js'

import exphbs from 'express-handlebars';

import { createServer } from "http";
import { Server } from "socket.io";

import DBContainer from './DBContainer.js'
import mariaDBConf from '../options/mariaDB.js'
import sqliteDBConf from '../options/sqlite.js'

const app = express()
app.use(express.urlencoded({ extended: true }))

const httpServer = createServer(app)    // nuevo server http, reemplazando el de express
const io = new Server(httpServer)       // IO server sobre el http server

app.use(express.static('public'))
app.use('/handlebars', express.static('node_modules/handlebars/dist'))

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', './views')

import MongoStore from 'connect-mongo'
import mongoDBConf from '../options/mongoDB.js'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoDBConf.cnxStr,
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true, // para refrescar el ttl cada vez que se interactúa con la sesión
    cookie: {
        maxAge: 10000   // msec. Esto puede obviarse y la cookie toma la duración de la sesión
                        // si este está seteado, hace un override del ttl de la sesión
    }
}))

app.post('/login', (req, res) => {
    req.session.username = req.body.username
    res.redirect('/')
})

app.post('/logout', isAuthenticated, (req, res) => {
    const username = req.session.username
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.render('logout.handlebars', {username})
    })
})

app.get('/', isAuthenticated, (req, res) => {
    res.render('index.handlebars', {username: req.session.username})
})

const products = new DBContainer(mariaDBConf, 'products')
const messages = new DBContainer(sqliteDBConf, 'messages')

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
    /*
    //Aquí no llamo a los close (destroy) porque sino cierro la conexión a las DB ante un connect!!
    finally {
        messages.close()
        products.close()
    }
    */
})

// http server
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log('Servidor HTTP con Websockets escuchando en el puerto', PORT)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))