import express from 'express'
import { createServer } from 'http'

import cfg from './config.js'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import ordersRouter from './routes/orders.js'

const app = express()

app.use(express.json())
app.use(authRouter)
app.use('/products/', productsRouter)
app.use('/cart/', cartRouter)
app.use('/orders/', ordersRouter)

const httpServer = createServer(app)    // nuevo server http, reemplazando el de express

const connectedServer = httpServer.listen(cfg.server.port, () => {
    console.log('Servidor HTTP escuchando en el puerto', cfg.server.port)
})
connectedServer.on('error', error=>console.log('Error en servidor', error))